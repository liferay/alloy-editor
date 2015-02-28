(function () {
    'use strict';

    /**
     * ButtonStateClasses is a mixin that decorates the domElement of a component
     * with different CSS classes based on the current state of the element.
     *
     * @class ButtonStateClasses
     * To check for state, the component can expose the following methods:
     * - isActive: to check the active state
     * - isDisabled: to check the disabled state
     */
    var ButtonStateClasses = {
        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         */
        componentDidMount: function() {
            this._appendClasses();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are
         * flushed to the DOM.
         */
        componentDidUpdate: function() {
            this._appendClasses();
        },

        /**
         * Adds or removes pressed and disabled classes depending on button state.
         *
         * @protected
         */
        _appendClasses: function() {
           var domNode = this.getDOMNode();

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                // Check for active state
                if (global.Lang.isFunction(this.isActive)) {
                    if (this.isActive()) {
                        domElement.addClass('alloy-editor-button-pressed');
                    } else {
                        domElement.removeClass('alloy-editor-button-pressed');
                    }
                }

                // Check for disabled state
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