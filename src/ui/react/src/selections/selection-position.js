(function() {
    'use strict';

    /**
     * Default gutter value for toolbar positioning
     * @type {Object}
     */
    var DEFAULT_GUTTER = {
        left: 0,
        top: 0
    };

    /**
     * [centerNode description]
     * @param  {[type]} node [description]
     * @param  {[type]} rect [description]
     * @return {[type]}      [description]
     */
    var centerToolbar = function(toolbar, rect) {
        var toolbarNode = ReactDOM.findDOMNode(toolbar);

        var halfNodeWidth = toolbarNode.offsetWidth / 2;
        var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

        var gutter = toolbar.props.gutter || DEFAULT_GUTTER;

        var widgetXY = toolbar.getWidgetXYPoint(rect.left + rect.width / 2 - scrollPos.x, rect.top + scrollPos.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

        toolbar.moveToPoint([
            widgetXY[0],
            widgetXY[1]
        ], [
            rect.left + rect.width / 2 - halfNodeWidth - scrollPos.x,
            rect.top - toolbarNode.offsetHeight + scrollPos.y - gutter.top
        ]);
    };

    /**
     * [imageSelectionSetPosition description]
     * @param  {[type]} payload [description]
     * @return {[type]}         [description]
     */
    var imageSelectionSetPosition = function(payload) {
        centerToolbar(this, payload.selectionData.element.getClientRect());

        return true;
    };

    /**
     * [tableSelectionSetPosition description]
     * @param  {[type]} payload [description]
     * @return {[type]}         [description]
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