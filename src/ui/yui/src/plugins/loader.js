(function() {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    if (CKEDITOR.plugins.get('uiloader')) {
        return;
    }

    /**
     * The CKEDITOR.plugins.uiloader plugin loads the editor UI on demand, depending on the
     * configuration of the Toolbars and Buttons.
     *
     * @class CKEDITOR.plugins.uiloader
     */
    CKEDITOR.plugins.add(
        'uiloader', {
            /**
             * Initializer lifecycle implementation for the UILoader plugin.
             *
             * @method init
             * @protected
             */
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

            /**
             * Creates instances of toolbars as specified by the editor configuration.
             * A simple editor toolbar configuration may look like this:
             * <pre><code>
             *   toolbars: {
             *       add: ['image', 'code']
             *   }
             * </code></pre>
             * In this case we have very simple configuration - the editor will have
             * only one toolbar, with two buttons - for adding images and code into the
             * editor. These buttons will also not have any specific configuration.
             * In order to pass configuration attributes to the toolbars, the configuration
             * may be specified like this:
             * <pre><code>
             *   toolbars: {
             *      add: {
             *           buttons: ['image', 'code'],
             *           zIndex: 1024
             *       }
             *   }
             * </code></pre>
             * In this case, toolbar "add" receives two attributes - the first one is the
             * list of buttons (each button also can be specified via an configuration object)
             * and another attribute, which specifies its zIndex.
             *
             * @method _createToolbars
             * @protected
             */
            _createToolbars: function(Y, editor) {
                var defaultConfig,
                    i,
                    toolbarsConfig;

                defaultConfig = {
                    editor: editor,
                    render: editor.config.uiNode || true,
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
                        } else if (toolbarsConfig[i]) {
                            editor.config.toolbars[i] = new Y[this._getToolbarName(i)](
                                Y.merge(defaultConfig, toolbarsConfig[i])
                            );
                        }
                    }
                }
            },

            /**
             * Resolves the name of a button module passed through configuration.
             *
             * @method  _getButtonName
             * @protected
             * @param  {String|Object} button A string representing the button or an object
             * with a name attribute.
             * @return {String} The name of the button.
             */
            _getButtonName: function(button) {
                var buttonName = button;

                if (typeof button !== 'string') {
                    buttonName = button.name;
                }

                return buttonName
            },

            /**
             * Retrieves a list of modules for all registered buttons and toolbars in the current
             * editor configuration.
             * The module will be automatically discovered if it follows this specification:
             * - if this is a Toolbar, the module should start with the word "module", followed by "-"
             * and then the name of the toolbar. Example: 'toolbar-add'.
             * - if the module is an button, then the module should start with the word "button",
             * followed by "-" and then the name of the button. Example: "button-image".
             * - In order to be instantiated successfully, the toolbar should expose itself as an object,
             * attached to the current YUI/AlloyUI instance. The name should start with the name Toolbar,
             * followed by the name of the toolbar, as specified in the configuration. Example: Y.ToolbarAdd.
             * - In order to be instantiated successfully, the button should expose itself as an object,
             * attached to the current YUI/AlloyUI instance. The name should start with the name Button,
             * followed by the name of the button, as specified in the configuration. Example: Y.ButtonImage.
             *
             * @method _getModules
             * @protected
             * @return {Array} An array of all discovered modules of toolbars and buttons, as specified by
             * the current editor configuration.
             */
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
                                modules.push('button-' + this._getButtonName(toolbarsConfig[i][j]));
                            }
                        } else if (toolbarsConfig[i]) {
                            for (j = toolbarsConfig[i].buttons.length - 1; j >= 0; j--) { // put button modules
                                modules.push('button-' + this._getButtonName(toolbarsConfig[i].buttons[j]));
                            }
                        }
                    }
                }

                return modules;
            },

            /**
             * Resolves the name of the Toolbar from the current editor configuration.
             * See {{#crossLink "CKEDITOR.plugins.uiloader/_getModules:method"}}{{/crossLink}}
             * for more information about the rules for constructing toolbar names.
             *
             * @method _getToolbarName
             * @protected
             * @return {String} The constructed name of the Toolbar.
             */
            _getToolbarName: function(name) {
                return 'Toolbar' + name.substring(0, 1).toUpperCase() + name.substring(1);
            }
        }
    );
}());