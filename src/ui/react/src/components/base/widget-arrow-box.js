(function() {
    'use strict';

    var WidgetArrowBox = {
        mixins: [global.WidgetInteractionPoint],

        componentDidUpdate: function() {
            var domNode = this.getDOMNode();

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                domElement.addClass('alloy-editor-arrow-box');

                if (this.getInteractionPoint().direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    domElement.addClass('alloy-editor-arrow-box-top');
                } else {
                    domElement.addClass('alloy-editor-arrow-box-bottom');
                }
            }
        }
    };

    global.WidgetArrowBox = WidgetArrowBox;
}());