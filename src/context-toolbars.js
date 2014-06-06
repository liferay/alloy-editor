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

                        var elements = ['strong', 'em', 'u', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'img'];

                        Y.Array.each(
                            elements,
                            function(item, index) {
                                var style = new CKEDITOR.style({element: item});
                                elements[index] = {
                                    name: item,
                                    style: style
                                };
                            }
                        );

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

                        function handleLink(event) {
                            function getSelectedLink(editor) {
                                var selection = editor.getSelection();

                                var selectedElement = selection.getSelectedElement();

                                if (selectedElement && selectedElement.is('a')){
                                    return selectedElement;
                                }

                                var range = selection.getRanges()[0];

                                if (range) {
                                    range.shrink( CKEDITOR.SHRINK_TEXT );

                                    return editor.elementPath(range.getCommonAncestor()).contains('a', 1);
                                }

                                return null;
                            }

                            function createLink(URI) {
                                var selection = editor.getSelection();

                                var range = selection.getRanges()[0];

                                if (range.collapsed) {
                                    var text = new CKEDITOR.dom.text(URI, editor.document);
                                    range.insertNode(text);
                                    range.selectNodeContents(text);
                                }

                                var style = new CKEDITOR.style({
                                    element: 'a',
                                    attributes: {
                                        href: URI,
                                        'data-cke-saved-href': URI
                                    }
                                });

                                style.type = CKEDITOR.STYLE_INLINE;
                                style.applyToRange(range, editor);
                                range.select();
                            }

                            function updateLink(URI) {
                                var element = getSelectedLink(editor);

                                element.setAttributes({
                                    href: URI,
                                    'data-cke-saved-href': URI
                                });
                            }

                            function removeLink() {
                                var style = new CKEDITOR.style({
                                    alwaysRemoveElement: 1,
                                    element: 'a',
                                    type: CKEDITOR.STYLE_INLINE
                                });

                                editor.removeStyle(style);
                            }

                            var btnInst = event.target;

                            if (btnInst.get('pressed')) {
                                var selection = editor.getSelection();

                                Y.one('#mainButtons').addClass('hide');
                                Y.one('#inputWrapper').removeClass('hide');

                                var linkInput = Y.one('#linkInput');
                                linkInput.focus();

                                createLink('/');

                                linkInput.once('blur', function(event) {
                                    console.log('blur');
                                    // debugger;
                                    var link = linkInput.get('value');

                                    if (link) {
                                        updateLink(link);
                                    }
                                    else {
                                        removeLink();
                                    }

                                    // debugger;

                                    var range = editor.getSelection().getRanges()[0];

                                    range.collapse();

                                    range.select();
                                });

                                var handler = linkInput.on('keypress', function(event) {
                                    if (event.charCode === 13) {
                                        handler.detach();

                                        overlay.hide();

                                        // handleUI();
                                    }
                                });
                            }
                            else {
                                removeLink();
                            }
                        }

                        function handleCloseLink() {
                            Y.one('#linkInput').set('value');

                            overlay.hide();

                            handleUI();
                        }

                        Y.one('.input-clear-container').on('click', handleCloseLink);

                        var overlay = new Y.ToolbarStyles({
                            editor: editor,
                            srcNode: '#overlay',
                            visible: false,
                            buttons: [
                                'strong',
                                'em',
                                'u',
                                'a'
                            ]
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