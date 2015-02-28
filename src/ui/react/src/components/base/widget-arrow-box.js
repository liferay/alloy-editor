(function() {
    'use strict';

    /**
     * Provides functionality for displaying Widget Arrow box on top or on bottom of the widget
     * depending on the point of user interaction with the editor.
     *
     * @class WidgetArrowBox
     */
    var WidgetArrowBox = {
        mixins: [global.WidgetInteractionPoint],

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         *
         * Adds classes for displaying the arrow box on bottom or on top of the Widget.
         */
        componentDidUpdate: function() {
            var domNode = this.getDOMNode();

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                domElement.addClass('alloy-editor-arrow-box');

                if (this.getInteractionPoint().direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    domElement.removeClass('alloy-editor-arrow-box-bottom');
                    domElement.addClass('alloy-editor-arrow-box-top');
                } else {
                    domElement.removeClass('alloy-editor-arrow-box-top');
                    domElement.addClass('alloy-editor-arrow-box-bottom');
                }
            }
        }
    };

    global.WidgetArrowBox = WidgetArrowBox;
}());