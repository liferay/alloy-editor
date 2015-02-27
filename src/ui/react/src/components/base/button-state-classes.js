(function () {
    'use strict';

    /**
     * ButtonStateClasses is a mixin that decorates the domElement of a component
     * with different css classes based on the current state of the element.
     *
     * To check for state, the component can expose the following methods:
     * - isActive: to check the active state
     * - isDisabled: to check the disabled state
     */
    var ButtonStateClasses = {
        componentDidMount: function() {
            this._appendClasses();
        },

        componentDidUpdate: function() {
            this._appendClasses();
        },

        _appendClasses: function() {
           var domNode = this.getDOMNode();

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                // Check active state if present
                if (global.Lang.isFunction(this.isActive)) {
                    if (this.isActive()) {
                        domElement.addClass('alloy-editor-button-pressed');
                    } else {
                        domElement.removeClass('alloy-editor-button-pressed');
                    }
                }

                // Check disabled state if present
                if (global.Lang.isFunction(this.isDisabled)) {
                    if (this.isDisabled()) {
                        domElement.addClass('alloy-editor-button-disabled');
                    } else {
                        domElement.removeClass('alloy-editor-button-disabled');
                    }
                }
            }
        }
    };

    global.ButtonStateClasses = ButtonStateClasses;
}());