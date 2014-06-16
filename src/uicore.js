;(function() {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    CKEDITOR.plugins.add(
        'uicore',
        {
            init: function(editor) {
                var instance = this,
                    modules;

                modules = ['node', 'aui-debounce'].concat(this._getModules());

                YUI().use(
                    modules,
                    function(Y) {
                        var editorNode,
                            handleUI;

                        editorNode = Y.one(editor.element.$);

                        instance._createToolbars(Y, editor);

                        handleUI = Y.debounce(
                            function(event) {
                                Y.fire('editorInteraction', {
                                    editor: editor,
                                    yuiEvent: event,
                                    selectionData: editor.getSelectionData()
                                });
                            },
                            editor.config.uicore ? editor.config.uicore.delay : 50
                        );

                        editorNode = Y.one(editor.element.$);

                        editorNode.on('mouseup', handleUI);
                        editorNode.on('keyup', handleUI);
                    }
                );
            },

            _createToolbars: function(Y, editor) {
                var defaultConfig,
                    i;

                editor.config.toolbars = {};

                defaultConfig = {
                    editor: editor,
                    render: true,
                    visible: false
                };

                for (i in ToolbarsConfig) {
                    if (hasOwnProperty.call(ToolbarsConfig, i)) {
                        if (CKEDITOR.tools.isArray(ToolbarsConfig[i])) {
                            editor.config.toolbars[i] = new Y[this._getToolbarName(i)](
                                this._merge(defaultConfig, {
                                    buttons: ToolbarsConfig[i]
                                })
                            );
                        }
                        else if(ToolbarsConfig[i]) {
                            editor.config.toolbars[i] = new Y[this._getToolbarName(i)](
                                this._merge(defaultConfig, ToolbarsConfig[i])
                            );
                        }
                    }
                }
            },

            _getModules: function() {
                var i,
                    j,
                    modules;

                modules = [];

                for (i in ToolbarsConfig) {
                    if (hasOwnProperty.call(ToolbarsConfig, i)) {
                        modules.push('toolbar-' + i); // put toolbar module

                        if (CKEDITOR.tools.isArray(ToolbarsConfig[i])) {
                            for (j = ToolbarsConfig[i].length - 1; j >= 0; j--) { // put button modules
                                modules.push('button-' + ToolbarsConfig[i][j]);
                            }
                        }
                        else if (ToolbarsConfig[i]) {
                            for (j = ToolbarsConfig[i].buttons.length - 1; j >= 0; j--) { // put button modules
                                modules.push('button-' + ToolbarsConfig[i].buttons[j]);
                            }
                        }
                    }
                }

                return modules;
            },

            _getToolbarName: function(name) {
                return 'Toolbar' + name.substring(0, 1).toUpperCase() + name.substring(1);
            },

            _merge: function () {
                var i = 0,
                    key,
                    len = arguments.length,
                    obj,
                    result = {};

                for (; i < len; ++i) {
                    obj = arguments[i];

                    for (key in obj) {
                        if (hasOwnProperty.call(obj, key)) {
                            result[key] = obj[key];
                        }
                    }
               }

                return result;
            }
        }
    );
}());