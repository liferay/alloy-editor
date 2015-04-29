(function() {
    'use strict';

    var tableSelectionSetPosition = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var table = new CKEDITOR.Table(nativeEditor).getFromSelection();
        var clientRect = table.getClientRect();

        var toolbarNode = this.getDOMNode();
        var halfToolbarWidth = toolbarNode.offsetWidth / 2;
        var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

        var widgetXY = this.getWidgetXYPoint(clientRect.left + clientRect.width / 2 - scrollPos.x, clientRect.top + scrollPos.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

        this.moveToPoint([
            widgetXY[0],
            widgetXY[1]
        ], [
            clientRect.left + clientRect.width / 2 - halfToolbarWidth - scrollPos.x,
            clientRect.top - toolbarNode.offsetHeight + scrollPos.y
        ]);

        return true;
    };

    AlloyEditor.SelectionSetPosition = {
        table: tableSelectionSetPosition
    };
}());