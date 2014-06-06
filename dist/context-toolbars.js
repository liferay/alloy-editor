;(function() {
    CKEDITOR.plugins.add(
        'contexttoolbars',
        {
            init: function(editor) {
                YUI({
                    filter: 'raw'
                }).use(
                    'node', 'overlay', 'event-mouseenter', 'aui-debounce', 'aui-toolbar', 'gesture-simulate', 'toolbar-styles',
                    function(Y) {
                        var editorNode = Y.one(editor.element.$);

                        var addOverlay;

                        var handleUI = Y.debounce(
                            function(event) {
                                var selectionEmpty = editor.isSelectionEmpty();

                                var selectionData = editor.getSelectionData();

                                var editorDOMNode = editorNode.getDOMNode();

                                if (selectionData.region) {
                                    showAdd(editorDOMNode.offsetLeft - 30, selectionData.region.top);
                                }
                                else {
                                    hideAdd();
                                    hideToolbar();

                                    return;
                                }

                                addOverlay.hide();

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

                        function setContentTimeout() {
                            window.leaveTimeout = setTimeout(
                                function() {
                                    addOverlay.hide();
                                },
                                1000
                            );
                        }

                        function showAdd(x, y) {
                            add.set('xy', [x, y]);

                            add.show();
                        }

                        function hideAdd() {
                            add.hide();
                        }

                        function hideToolbar() {
                            overlay.hide();
                        }

                        var overlay = new Y.ToolbarStyles({
                            editor: editor,
                            srcNode: '#overlay',
                            visible: false
                        }).render();

                        var add = new Y.Overlay({
                            srcNode: '#add-wrapper',
                            visible: false,
                            height: '20px',
                            width: '20px'
                        }).render();

                        Y.one('#add-wrapper').on(['mouseenter', 'click'], function(event) {
                            var xy = add.get('xy');

                            window.clearTimeout(window.leaveTimeout);

                            addOverlay.show();

                            addOverlay.set('xy', [xy[0] + 20, xy[1]]);
                        });

                        Y.one('#add-wrapper').on('mouseleave', function(event) {
                            setContentTimeout();
                        });

                        Y.one('#add-content').on('mouseleave', function(event) {
                            setContentTimeout();
                        });

                        Y.one('#add-content').on('mouseenter', function(event) {
                            window.clearTimeout(window.leaveTimeout);
                        });

                        addOverlay = new Y.Overlay({
                            srcNode: '#add-content',
                            visible: false
                        }).render();

                        editorNode = Y.one('#editable');

                        editorNode.on('mouseup', handleUI);
                        editorNode.on('keyup', handleUI);
                    }
                );
            }
        }
    );
})();