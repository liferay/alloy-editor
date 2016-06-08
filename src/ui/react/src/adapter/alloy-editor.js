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
         * instance, passing it the provided configuration attributes.
         *
         * @protected
         * @method initializer
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function(config) {

            var node = this.get('srcNode');

            if (this.get('enableContentEditable')) {
                node.setAttribute('contenteditable', 'true');
            }

            var editor = CKEDITOR.inline(node);

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            editor.config.selectionKeystrokes = this.get('selectionKeystrokes');

            AlloyEditor.Lang.mix(editor.config, config);

            editor.once('contentDom', function() {
                if (editor.config.readOnly) {
                    this._addReadOnlyLinkClickListener(editor);
                }

                var editable = editor.editable();

                editable.addClass('ae-editable');

                editable.editor.on('readOnly', this._onReadOnlyChangeFn.bind(this));
            }.bind(this));

            AlloyEditor.loadLanguageResources(this._renderUI.bind(this));

            this._editor = editor;
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @protected
         * @method destructor
         */
        destructor: function() {
            this._destroyed = true;

            if (this._editorUIElement) {
                ReactDOM.unmountComponentAtNode(this._editorUIElement);
                this._editorUIElement.parentNode.removeChild(this._editorUIElement);
            }

            var nativeEditor = this.get('nativeEditor');

            if (nativeEditor) {
                var editable = nativeEditor.editable();

                if (editable) {
                    editable.removeClass('ae-editable');

                    if (this.get('enableContentEditable')) {
                        this.get('srcNode').setAttribute('contenteditable', 'false');
                    }
                }

                this._clearSelections();

                nativeEditor.destroy();
            }
        },


        /**
         * Clear selections from window object
         *
         * @protected
         * @method _clearSelections
         */
        _clearSelections: function() {
            var nativeEditor = this.get('nativeEditor');
            var isMSSelection = typeof window.getSelection != 'function';

            if (isMSSelection) {
                nativeEditor.document.$.selection.empty();
            } else {
               nativeEditor.document.getWindow().$.getSelection().removeAllRanges();
            }
        },

        /**
         * Method to set default link behavior
         *
         * @protected
         * @method _addReadOnlyLinkClickListener
         * @param {Object} editor
         */
        _addReadOnlyLinkClickListener: function(editor) {
            editor.editable().on('click', this._defaultReadOnlyClickFn, this, {
                editor: editor
            });
        },

        /**
         * Called on `click` event when the editor is in read only mode. Navigates to link's URL or opens
         * the link in a new window.
         *
         * @event readOnlyClick
         * @protected
         * @method _defaultReadOnlyClickFn
         * @param {Object} event The fired `click` event payload
         */
        _defaultReadOnlyClickFn: function(event) {
            if (event.listenerData.editor.editable().editor.fire('readOnlyClick', event.data) !== false) {
                var ckElement = new CKEDITOR.dom.elementPath(event.data.getTarget(), this);
                var link = ckElement.lastElement;

                if (link) {
                    var href = link.$.attributes.href ? link.$.attributes.href.value : null;

                    var target = link.$.attributes.target ? link.$.attributes.target.value : null;

                    this._redirectLink(href, target);
                }
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

        /**
         * Fired when readonly value is changed. Adds click event listener to handle links in readonly mode.
         *
         * @protected
         * @method _onReadOnlyChange
         * @param {Object} event The fired event
         */
        _onReadOnlyChangeFn: function(event) {
            if (event.editor.readOnly) {
                this._addReadOnlyLinkClickListener(event.editor);
            }
            else {
                event.editor.editable().removeListener('click', this._defaultReadOnlyClickFn);
            }
        },

        /**
         * Redirects the browser to a given link
         *
         * @protected
         * @method _redirectLink
         * @param {string} href The href to take the browser to
         * @param {string=} target Specifies where to display the link
         */
        _redirectLink: function(href, target) {
            if (target && href) {
                window.open(href, target);
            }
            else if (href) {
                window.location.href = href;
            }
        },

        /**
         * Renders the specified from the user toolbars.
         *
         * @protected
         * @method _renderUI
         */
        _renderUI: function() {
            if (!this._destroyed) {
                var editorUIElement = document.createElement('div');
                editorUIElement.className = 'ae-ui';

                var uiNode = this.get('uiNode') || document.body;

                uiNode.appendChild(editorUIElement);

                this._mainUI = ReactDOM.render(React.createElement(AlloyEditor.UI, {
                    editor: this,
                    eventsDelay: this.get('eventsDelay'),
                    toolbars: this.get('toolbars')
                }), editorUIElement);

                this._editorUIElement = editorUIElement;

                this.get('nativeEditor').fire('uiReady');
            }
        },

        /**
         * The function returns an HTML element from the passed value. If the passed value is a string, it should be
         * the Id of the element which have to be retrieved from the DOM.
         * If an HTML Element is passed, the element itself will be returned.
         *
         * @method _toElement
         * @protected
         * @param {!(String|HTMLElement)} value String, which have to correspond to an HTML element from the DOM,
         * or the HTML element itself. If Id is passed, the HTML element will be retrieved from the DOM.
         * @return {HTMLElement} An HTML element.
         */
        _toElement: function(value) {
            if (AlloyEditor.Lang.isString(value)) {
                value = document.getElementById(value);
            }

            return value;
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
             * Specifies whether AlloyEditor set the contenteditable attribute
             * to "true" on its srcNode.
             *
             * @property enableContentEditable
             * @type Boolean
             * @default true
             * @writeOnce
             */
            enableContentEditable: {
                validator: AlloyEditor.Lang.isBoolean,
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
             * @default 'uicore,selectionregion,dragresize,addimages,placeholder,tabletools,tableresize,autolink'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'ae_uicore,ae_selectionregion,ae_selectionkeystrokes,ae_dragresize,ae_imagealignment,ae_addimages,ae_placeholder,ae_tabletools,ae_tableresize,ae_autolink,ae_embed,ae_autolist',
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
             * {{#crossLink "CKEDITOR.plugins.ae_placeholder}}{{/crossLink}}
             * when editor is not focused.
             *
             * @property placeholderClass
             * @default 'ae-placeholder'
             * @writeOnce
             * @type {String}
             */
            placeholderClass: {
                validator: AlloyEditor.Lang.isString,
                value: 'ae-placeholder',
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
             * Array of manual selection triggers. They can be configured to manually show a specific selection toolbar
             * by forcing the selection type. A selectionKeystroke item consists of a keys property with a [CKEditor keystroke
             * definition](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-keystrokes) and a selection property with
             * the selection name to trigger.
             *
             * @property selectionKeystrokes
             * @type {Array}
             */
            selectionKeystrokes: {
                validator: AlloyEditor.Lang.isArray,
                value: [{
                    keys: CKEDITOR.CTRL + 76 /*L*/,
                    selection: 'link'
                }, {
                    keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/,
                    selection: 'embed'
                }]
            },

            /**
             * The Node ID or HTMl node, which AlloyEditor should use as an editable area.
             *
             * @property srcNode
             * @type String | Node
             * @writeOnce
             */
            srcNode: {
                setter: '_toElement',
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
                        buttons: ['image', 'embed', 'camera', 'hline', 'table'],
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
                setter: '_toElement',
                writeOnce: true
            }
        }
    });

    CKEDITOR.event.implementOn(Core);

    AlloyEditor.Core = Core;
}());