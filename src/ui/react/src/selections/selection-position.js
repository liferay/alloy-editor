(function() {
    'use strict';

    // Default gutter value for toolbar positioning
    var DEFAULT_GUTTER = {
        left: 0,
        top: 0
    };

    /**
     * Centers a Toolbar according to given rectangle
     *
     * @method centerToolbar
     * @param {Object} toolbar The toolbar to be centered
     * @param {Object} rect The rectangle according to which the Toolbar will be centered
     */
    var centerToolbar = function(toolbar, rect) {
        var toolbarNode = ReactDOM.findDOMNode(toolbar);

        var nativeEditor = toolbar.props.editor.get('nativeEditor');
        var uiNode = nativeEditor.config.uiNode || document.body;
        var uiNodeStyle = getComputedStyle(uiNode);
        var uiNodeMarginLeft = parseInt(uiNodeStyle.getPropertyValue('margin-left'), 10);
        var uiNodeMarginRight = parseInt(uiNodeStyle.getPropertyValue('margin-right'), 10);
        var totalWidth = uiNodeMarginLeft + uiNode.clientWidth + uiNodeMarginRight;

        var halfNodeWidth = toolbarNode.offsetWidth / 2;
        var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();

        var gutter = toolbar.props.gutter || DEFAULT_GUTTER;

        var widgetXY = toolbar.getWidgetXYPoint(rect.left + rect.width / 2 - scrollPosition.x, rect.top + scrollPosition.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

        var endPosition = [
          rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x,
          rect.top - toolbarNode.offsetHeight + scrollPosition.y - gutter.top
        ];

        if (endPosition[0] < 0) {
            endPosition[0] = 0;
        }
        else if (endPosition[0] > totalWidth - toolbarNode.offsetWidth) {
            endPosition[0] = totalWidth - toolbarNode.offsetWidth;
        }

        toolbar.moveToPoint(widgetXY, endPosition);
    };

    /**
     * Sets the position of a toolbar according to the position of the selected image
     *
     * @method imageSelectionSetPosition
     * @param {Object} payload Payload, should contain the selection data for retrieving the
     * client rectangle of the selected image
     * @return {Boolean} True, in all cases
     */
    var imageSelectionSetPosition = function(payload) {
        var selectionData = payload.selectionData ? payload.selectionData : payload.editorEvent ?
            payload.editorEvent.data.selectionData : null;

        if (selectionData && selectionData.element) {
            var nativeEditor = payload.editor.get('nativeEditor');
            var uiNode = nativeEditor.config.uiNode;

            var scrollTop = uiNode ? uiNode.scrollTop : 0;

            var rect = selectionData.element.getClientRect();
            rect.top += scrollTop;

            centerToolbar(this, rect);
            return true;
        }
    };

    /**
     * Sets the position of a toolbar according to the position of the selected image
     *
     * @method tableSelectionSetPosition
     * @param {Object} payload Object, which contains the selection data for retrieving the
     * client rectangle of the selected table
     * @return {Boolean} True, in all cases
     */
    var tableSelectionSetPosition = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');
        var uiNode = nativeEditor.config.uiNode;

        var scrollTop = uiNode ? uiNode.scrollTop : 0;

        var table = new CKEDITOR.Table(nativeEditor).getFromSelection();
        var rect = table.getClientRect();
        rect.top += scrollTop;

        centerToolbar(this, rect);

        return true;
    };

    AlloyEditor.SelectionSetPosition = {
        image: imageSelectionSetPosition,
        table: tableSelectionSetPosition
    };
}());
