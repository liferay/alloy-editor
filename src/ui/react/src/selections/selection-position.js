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

        var halfNodeWidth = toolbarNode.offsetWidth / 2;
        var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();

        var gutter = toolbar.props.gutter || DEFAULT_GUTTER;

        var widgetXY = toolbar.getWidgetXYPoint(rect.left + rect.width / 2 - scrollPosition.x, rect.top + scrollPosition.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

        toolbar.moveToPoint([
            widgetXY[0],
            widgetXY[1]
        ], [
            rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x,
            rect.top - toolbarNode.offsetHeight + scrollPosition.y - gutter.top
        ]);
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
        centerToolbar(this, payload.selectionData.element.getClientRect());

        return true;
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

        var table = new CKEDITOR.Table(nativeEditor).getFromSelection();

        centerToolbar(this, table.getClientRect());

        return true;
    };

    AlloyEditor.SelectionSetPosition = {
        image: imageSelectionSetPosition,
        table: tableSelectionSetPosition
    };
}());