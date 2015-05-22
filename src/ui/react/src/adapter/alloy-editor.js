(function() {
    'use strict';

    /**
     * AlloyEditor main class. Creates instance of the editor and provides the user configuration
     * to the UI.
     *
     * @class Core
     * @constructor
     */
    function Core(config) {
        Core.superclass.constructor.call(this, config);
    }

    AlloyEditor.OOP.extend(Core, AlloyEditor.Base, {
        /**
         * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
         * instace, passing it the provided configuration attributes.
         *
         * @protected
         * @method initializer
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function(config) {
            var node = this.get('srcNode');

            var editor = CKEDITOR.inline(node);

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            AlloyEditor.Lang.mix(editor.config, config);

            this._editor = editor;

            CKEDITOR.once('resourcesLoaded', this._renderUI.bind(this));

            this._loadLanguageFile();
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @protected
         * @method destructor
         */
        destructor: function() {
            React.unmountComponentAtNode(this._editorUIElement);

            this._editorUIElement.parentNode.removeChild(this._editorUIElement);

            var editorInstance = CKEDITOR.instances[this.get('srcNode')];

            if (editorInstance) {
                editorInstance.destroy();
            }
        },

        /**
         * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
         *
         * @protected
         * @method _getNativeEditor
         * @return {Object} The current instance of CKEditor.
         */
        _getNativeEditor: function() {
            return this._editor;
        },

        _loadLanguageFile: function() {
            var onLanguageFileLoad = function() {
                CKEDITOR.fire('resourcesLoaded');
            };

            if (!window.AlloyEditor.Strings) {
                var languages = ['af', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-au', 'en-ca', 'en-gb', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr-ca', 'fr', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'km', 'ko', 'ku', 'lt', 'lv', 'mk', 'mn', 'ms', 'nb', 'nl', 'no', 'pl', 'pt-br', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr-latn', 'sr', 'sv', 'th', 'tr', 'tt', 'ug', 'uk', 'vi', 'zh-cn', 'zh'];

                var userLanguage = navigator.language || navigator.userLanguage || 'en';

                var parts = userLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/);
                var lang = parts[1];
                var locale = parts[2];

                if (languages[lang + '-' + locale]) {
                    lang = lang + '-' + locale;
                } else if (!languages.indexOf(lang)) {
                    lang = 'en';
                }

                CKEDITOR.scriptLoader.load(CKEDITOR.getUrl('lang/alloy-editor/' + lang + '.js'), onLanguageFileLoad, this);
            } else {
                setTimeout(onLanguageFileLoad.bind(this), 0);
            }
        },

        /**
         * Renders the specified from the user toolbars
         *
         * @protected
         * @method _renderUI
         */
        _renderUI: function() {
            var editorUIElement = document.createElement('div');
            editorUIElement.className = 'alloy-editor-ui';

            var uiNode = this.get('uiNode') || document.body;

            if (AlloyEditor.Lang.isString(uiNode)) {
                uiNode = document.getElementById(uiNode);
            }

            uiNode.appendChild(editorUIElement);

            this._mainUI = React.render(React.createElement(AlloyEditor.UI, {
                editor: this,
                eventsDelay: this.get('eventsDelay'),
                toolbars: this.get('toolbars')
            }), editorUIElement);

            this._editorUIElement = editorUIElement;

            this.get('nativeEditor').fire('uiReady');
        },

        /**
         * Validates the allowed content attribute. Look
         * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
         * supported values.
         *
         * @protected
         * @method _validateAllowedContent
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid configuration, false otherwise
         */
        _validateAllowedContent: function(value) {
            return AlloyEditor.Lang.isString(value) || AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isBoolean(value);
        },

        /**
         * Validates the value of toolbars attribute
         *
         * @protected
         * @method _validateToolbars
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid toolbars configuration, false otherwise
         */
        _validateToolbars: function(value) {
            return AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isNull(value);
        }
    }, {
        ATTRS: {
            /**
             * Configures the allowed content for the current instance of AlloyEditor.
             * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
             * for more information about the valid values.
             *
             * @property allowedContent
             * @default true
             * @writeOnce
             * @type {Boolean, String, Object}
             */
            allowedContent: {
                validator: '_validateAllowedContent',
                value: true,
                writeOnce: true
            },

            /**
             * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
             *
             * @property eventsDelay
             * @type {Number}
             */
            eventsDelay: {
                validator: AlloyEditor.Lang.isNumber,
                value: 100
            },

            /**
             * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
             * make AlloyEditor to work properly.
             *
             * @property extraPlugins
             * @default 'uicore,selectionregion,dragresize,dropimages,placeholder,tabletools,tableresize,autolink'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'uicore,selectionregion,dragresize,dropimages,placeholder,tabletools,tableresize,autolink',
                writeOnce: true
            },

            /**
             * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
             *
             * @property nativeEditor
             * @readOnly
             * @type {Object}
             */
            nativeEditor: {
                getter: '_getNativeEditor',
                readOnly: true
            },

            /**
             * Specifies the class, which should be added by Placeholder plugin
             * {{#crossLink "CKEDITOR.plugins.placeholder}}{{/crossLink}}
             * when editor is not focused.
             *
             * @property placeholderClass
             * @default 'alloy-editor-placeholder'
             * @writeOnce
             * @type {String}
             */
            placeholderClass: {
                validator: AlloyEditor.Lang.isString,
                value: 'alloy-editor-placeholder',
                writeOnce: true
            },

            /**
             * Specifies the plugins, which come by default with CKEditor, but which are not needed by AlloyEditor.
             * These plugins add the default UI for CKeditor, which is no more needed. Please note that AlloyEdtor
             * comes with its own highly optimized copy of CKEditor (just customized via their official download page).
             * This version does not come with the unneeded plugins, so the value of this property won't be needed.
             * However, if you decide to go with the OOTB version of CKEditor, you will have to remove some of the
             * plugins if you decide to use AlloyEditor. Keep in mind that removing these plugins doesn't remove them
             * entirely from CKEditor. It just removes them from its current instance, in which you will use different
             * UI - those of AlloyEditor. You will be fully able to use both OOTB CKEditor and AlloyEditor on the same
             * page!
             *
             * @property removePlugins
             * @default 'contextmenu,toolbar,elementspath,resize,liststyle,link'
             * @writeOnce
             * @type {String}
             */
            removePlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'contextmenu,toolbar,elementspath,resize,liststyle,link',
                writeOnce: true
            },

            /**
             * The Node ID or HTMl node, which should be turned to an instance of AlloyEditor.
             *
             * @property srcNode
             * @type String | Node
             * @writeOnce
             */
            srcNode: {
                writeOnce: true
            },

            /**
             * The toolbars configuration for this editor instance
             *
             * @property {Object} toolbars
             */
            toolbars: {
                validator: '_validateToolbars',
                value: {
                    add: {
                        buttons: ['image', 'camera', 'hline', 'table'],
                        tabIndex: 2
                    },
                    styles: {
                        selections: AlloyEditor.Selections,
                        tabIndex: 1
                    }
                }
            },

            /**
             * The Node ID or HTMl node, where AlloyEditor's UI should be rendered.
             *
             * @property uiNode
             * @type String | Node
             * @writeOnce
             */
            uiNode: {
                writeOnce: true
            }
        }
    });

    AlloyEditor.Core = Core;
}());