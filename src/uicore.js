;(function() {
    'use strict';

    CKEDITOR.plugins.add(
        'uicore',
        {
            init: function(editor) {
                var modules,
                    inputEvent;

                modules = this._getModules();

                modules.push('node', 'overlay', 'event-mouseenter', 'aui-debounce', 'aui-toolbar', 'gesture-simulate', 'toolbar-styles', 'toolbar-add');

                YUI().use(
                    modules,
                    function(Y) {
                        var editorNode = Y.one(editor.element.$);

                        Y.publish('editorInteraction', {
                            broadcast: true
                        });

                        var handleUI = Y.debounce(
                            function(event) {
                                Y.fire('editorInteraction', {
                                    editor: editor,
                                    yuiEvent: event,
                                    selectionData: editor.getSelectionData()
                                });
                            },
                            50
                        );

                        var overlay = new Y.ToolbarStyles({
                            buttons: ToolbarsConfig.styles,
                            editor: editor,
                            visible: false
                        }).render();

                        var add = new Y.ToolbarAdd({
                            buttons: ToolbarsConfig.add,
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
            },

            _getModules: function() {
                var modules,
                    i;

                modules = [];

                for (i = ToolbarsConfig.styles.length - 1; i >= 0; i--) {
                    modules.push('button-' + ToolbarsConfig.styles[i]);
                }

                for (i = ToolbarsConfig.add.length - 1; i >= 0; i--) {
                    modules.push('button-' + ToolbarsConfig.add[i]);
                }

                return modules;
            }
        }
    );
})();