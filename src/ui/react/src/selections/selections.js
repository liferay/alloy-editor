(function() {
    'use strict';

    var getTableFromSelection = function(editor) {
        var table;
        var nativeEditor = editor.get('nativeEditor');
        var selection = nativeEditor.getSelection();
        var selected = selection.getSelectedElement();

        if (selected && selected.is('table')) {
            table = selected;
        } else {
            var ranges = selection.getRanges();

            if (ranges.length > 0) {
                // Webkit could report the following range on cell selection (#4948):
                // <table><tr><td>[&nbsp;</td></tr></table>]
                if (CKEDITOR.env.webkit) {
                    ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                }

                table = nativeEditor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
            }
        }

        return table;
    };

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
        buttons: ['tablerow', 'tablecolumn', 'tablecell', 'tableremove'],
        getArrowBoxClasses: function() {
            return 'alloy-editor-arrow-box alloy-editor-arrow-box-bottom';
        },
        setPosition: function(payload) {
            // Payload is:
            // editor
            // editorEvent
            // selectionData

            var ckElement = getTableFromSelection(payload.editor);
            var clientRect = ckElement.getClientRect();
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
            return !!getTableFromSelection(payload.editor);
        }
    }];

    global.Selections = Selections;
}());
