(function() {
    'use strict';

    var Selections = [{
        name: 'link',
        buttons: ['linkEdit'],
        test: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            return !nativeEditor.isSelectionEmpty() && (new CKEDITOR.Link(nativeEditor).getFromSelection());
        }
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageRight'],
        test: function(payload) {
            var selectionData = payload.data.selectionData;

            return (selectionData.element && selectionData.element.getName() === 'img');
        }
    }, {
        name: 'text',
        buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
        test: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            var selectionEmpty = nativeEditor.isSelectionEmpty();

            var selectionData = payload.data.selectionData;

            return (!selectionData.element && selectionData.region && !selectionEmpty);
        }
    }, {
        name: 'table',
        buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: function() {
            return 'alloy-editor-arrow-box alloy-editor-arrow-box-bottom';
        },
        setPosition: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            var table = new CKEDITOR.Table(nativeEditor).getFromSelection();
            var clientRect = table.getClientRect();

            var toolbarNode = this.getDOMNode();
            var halfToolbarWidth = toolbarNode.offsetWidth/2;
            var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

            var widgetXY = this.getWidgetXYPoint(clientRect.left + clientRect.width/2 - scrollPos.x, clientRect.top + scrollPos.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

            this.moveToPoint([
                widgetXY[0],
                widgetXY[1]
            ], [
                clientRect.left + clientRect.width/2 - halfToolbarWidth - scrollPos.x,
                clientRect.top - toolbarNode.offsetHeight + scrollPos.y
            ]);

            return true;
        },
        test: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            return !!(new CKEDITOR.Table(nativeEditor).getFromSelection());
        }
    }];

    AlloyEditor.Selections = Selections;
}());
