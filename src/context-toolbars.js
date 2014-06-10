;(function() {
    CKEDITOR.plugins.add(
        'contexttoolbars',
        {
            init: function(editor) {
                YUI().use(
                    'node', 'overlay', 'event-mouseenter', 'aui-debounce', 'aui-toolbar', 'gesture-simulate', 'toolbar-styles', 'toolbar-add',
                    function(Y) {
                        var editorNode = Y.one(editor.element.$);

                        var handleUI = Y.debounce(
                            function(event) {
                                var selectionEmpty = editor.isSelectionEmpty();

                                var selectionData = editor.getSelectionData();

                                var editorDOMNode = editorNode.getDOMNode();

                                if (selectionData.region) {
                                    var startRect = selectionData.region.startRect || selectionData.region;

                                    add.showAtPoint(editorDOMNode.offsetLeft, selectionData.region.top + startRect.height/2);
                                }
                                else {
                                    hideAdd();
                                    hideToolbar();

                                    return;
                                }

                                if (selectionEmpty) {
                                    hideToolbar();
                                }
                                else {
                                    var x, y;

                                    var direction = selectionData.region.direction;

                                    if (selectionData.region.startRect.top === selectionData.region.endRect.top) {
                                        direction = 1;
                                    }

                                    if (event.pageX && event.pageY) {
                                        x = event.pageX;

                                        if (direction === 1) {
                                            y = Math.min(event.pageY, selectionData.region.top);
                                        }
                                        else {
                                            y = Math.max(event.pageY, selectionData.region.bottom);
                                        }
                                    }
                                    else {
                                        x = selectionData.region.left + selectionData.region.width/2;

                                        if (direction === 0) {
                                            y = selectionData.region.endRect.top;
                                        }
                                        else {
                                            y = selectionData.region.startRect.top;
                                        }
                                    }

                                    overlay.showAtPoint(x, y, direction);
                                }
                            },
                            50
                        );

                        function hideToolbar() {
                            overlay.hide();
                        }

                        function hideAdd() {
                            add.hide();
                        }

                        var overlay = new Y.ToolbarStyles({
                            editor: editor,
                            visible: false
                        }).render();

                        var add = new Y.ToolbarAdd({
                            editor: editor,
                            height: '20px',
                            visible: false,
                            width: '20px'
                        }).render();

                        editorNode = Y.one(editor.element.$);

                        editorNode.on('mouseup', handleUI);
                        editorNode.on('keyup', handleUI);
                    }
                );
            }
        }
    );
})();