;(function() {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    CKEDITOR.plugins.add(
        'uiloader',
        {
            init: function(editor) {
                var instance = this,
                    modules;

                modules = ['node-base'].concat(this._getModules(editor));

                YUI().use(
                    modules,
                    function(Y) {
                        instance._createToolbars(Y, editor);

                        editor.fire('toolbarsReady', {
                            toolbars: editor.config.toolbars
                        });
                    }
                );
            },

            _createToolbars: function(Y, editor) {
                var defaultConfig,
                    i,
                    toolbarsConfig;

                editor.config.toolbarsInstances = {};

                defaultConfig = {
                    editor: editor,
                    render: true,
                    visible: false
                };

                toolbarsConfig = editor.config.toolbars;

                for (i in toolbarsConfig) {
                    if (hasOwnProperty.call(toolbarsConfig, i)) {
                        if (CKEDITOR.tools.isArray(toolbarsConfig[i])) {
                            editor.config.toolbars[i] = new Y[this._getToolbarName(i)](
                                Y.merge(defaultConfig, {
                                    buttons: toolbarsConfig[i]
                                })
                            );
                        }
                        else if(toolbarsConfig[i]) {
                            editor.config.toolbars[i] = new Y[this._getToolbarName(i)](
                                Y.merge(defaultConfig, toolbarsConfig[i])
                            );
                        }
                    }
                }
            },

            _getModules: function(editor) {
                var i,
                    j,
                    modules,
                    toolbarsConfig;

                modules = [];

                toolbarsConfig = editor.config.toolbars;

                for (i in toolbarsConfig) {
                    if (hasOwnProperty.call(toolbarsConfig, i)) {
                        modules.push('toolbar-' + i); // put toolbar module

                        if (CKEDITOR.tools.isArray(toolbarsConfig[i])) {
                            for (j = toolbarsConfig[i].length - 1; j >= 0; j--) { // put button modules
                                modules.push('button-' + toolbarsConfig[i][j]);
                            }
                        }
                        else if (toolbarsConfig[i]) {
                            for (j = toolbarsConfig[i].buttons.length - 1; j >= 0; j--) { // put button modules
                                modules.push('button-' + toolbarsConfig[i].buttons[j]);
                            }
                        }
                    }
                }

                return modules;
            },

            _getToolbarName: function(name) {
                return 'Toolbar' + name.substring(0, 1).toUpperCase() + name.substring(1);
            }
        }
    );
}());