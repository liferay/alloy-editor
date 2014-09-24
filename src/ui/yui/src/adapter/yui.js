CKEDITOR.disableAutoInline = true;

YUI.add('alloy-editor', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        AlloyEditor,
        KEY_ESC = 27,
        KEY_F10 = 121,
        KEY_TAB = 9;

    /**
     * YUI3 Adapter for CKEditor. This class provides YUI3 like way of creating instances of
     * CKEditor and passing configuration paramters to it.
     *
     * @class AlloyEditor
     * @constructor
     */
    AlloyEditor = Y.Base.create('alloyEditor', Y.Base, [], {

        /**
         * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
         * instace, passing it the provided configuration attributes.
         *
         * @method initializer
         * @protected
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function(config) {
            var editor,
                node;

            node = this.get('srcNode');

            editor = CKEDITOR.inline(node.getDOMNode());

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');
            editor.config.title = false;

            Y.mix(editor.config, config);

            this._editor = editor;

            this._eventHandles = [
                Y.one(Y.config.doc).on(['click', 'keyup'],
                    CKEDITOR.tools.debounce(this._onDocInteract, this.get('toolbarsHideDelay'), this)),
                Y.one(editor.element.$).on('keydown', this._onEditorKeyDown, this),
                editor.on('toolbarKeyDown', this._onToolbarKeyDown, this)
            ];
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var editorInstance;

            editorInstance = CKEDITOR.instances[this.get('srcNode').get('id')];

            if (editorInstance) {
                Y.Object.each(editorInstance.config.toolbars, function(value) {
                    value.destroy();
                });

                editorInstance.destroy();
            }

            A.Array.invoke(instance._eventHandles, 'detach');
        },

        /**
         * It makes a circular search between toolbars to find the next toolbar
         * that has to be focused.
         *
         * @method _focusNextToolbar
         * @protected
         */
        _focusNextToolbar: function() {
            var currentFocusedToolbar,
                found,
                i,
                indexOfCurrentToolbar,
                splice,
                toolbar,
                toolbars;

            currentFocusedToolbar = this._focusedToolbar;

            toolbars = this._editor.config.toolbars;

            //We need to convert toolbars to an array so we can reorder it
            toolbars = Object.keys(toolbars).map(function(item) { return toolbars[item] });

            indexOfCurrentToolbar = toolbars.indexOf(currentFocusedToolbar);

            splice = toolbars.splice(indexOfCurrentToolbar, toolbars.length - indexOfCurrentToolbar);

            toolbars = splice.concat(toolbars);

            for (i = 0; i < toolbars.length; i++) {
                toolbar = toolbars[i];

                if (!found && (toolbar != currentFocusedToolbar) && toolbar._focus()) {
                    this._focusedToolbar = toolbar;

                    found = true;
                }
            }
        },

        /**
         * Searches for the first visible toolbar in editor. If there is none, but
         * there is a toolbar with a trigger button, this one will be selected.
         *
         * @method _focusVisibleToolbar
         * @protected
         */
        _focusVisibleToolbar: function() {
            var currentFocusedToolbar,
                found,
                i,
                toolbars;

            currentFocusedToolbar = this._focusedToolbar;

            toolbars = this._editor.config.toolbars;

            for (i in toolbars) {
                if (hasOwnProperty.call(toolbars, i)) {
                    if (!found && (toolbars[i] != currentFocusedToolbar) && toolbars[i]._focus()) {
                        this._focusedToolbar = toolbars[i];

                        found = toolbars[i].get('visible');
                    }
                }
            }
        },

        /**
         * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
         *
         * @method _getNativeEditor
         * @protected
         * @return {Object} The current instance of CKEditor.
         */
        _getNativeEditor: function() {
            return this._editor;
        },

        /**
         * Hide all visible toolbars in editor
         *
         * @method _hideToolbars
         * @protected
         */
        _hideToolbars: function() {
            var i,
                toolbars;

            toolbars = this._editor.config.toolbars;

            for (i in toolbars) {
                toolbars[i].hide();
            }
        },

        /**
         * Fires <code>toolbarsHide</code> event if none of the toolbars or their child nodes is the element user is
         * currently interacting.
         *
         * @method _onDocInteract
         * @protected
         * @param {EventFacade} event EventFacade object
         */
        _onDocInteract: function(event) {
            var editorInstance,
                result,
                srcNode;

            srcNode = this.get('srcNode');

            result = (srcNode === event.target) || (srcNode.contains(event.target));

            editorInstance = CKEDITOR.instances[srcNode.get('id')];

            result = result || Y.some(editorInstance.config.toolbars, function(toolbar) {
                return toolbar.ownsNode(event.target);
            });

            if (!result) {
                this._editor.fire('toolbarsHide');
            }
        },

        /**
         * Handles key events in the editor:
         *  - ALT + F10: access to toolbar
         *  - ESC: hide visible toolbars
         *
         * @method _onEditorKeyDown
         * @param {Event} event keyboard event
         * @protected
         */
        _onEditorKeyDown: function(event) {
            if (event.altKey && event.keyCode === KEY_F10) {
                this._focusVisibleToolbar();

            } else if (event.keyCode === KEY_ESC) {
                this._hideToolbars();
            }
        },

        /**
         * Handles key events in the toolbar:
         *  - TAB: focus next toolbar
         *  - ESC: return focus to editor
         *
         * @method  _onToolbarKeyDown
         * @param  {Event} eventkeyboard event
         * @protected
         */
        _onToolbarKeyDown: function(event) {
            if (event.data.keyCode === KEY_TAB) {
                event.data.preventDefault();
                this._focusNextToolbar();

            } else if (event.data.keyCode === KEY_ESC) {
                this._focusedToolbar._removeFocus();
                this._focusedToolbar = null;
            }
        },

        /**
         * Validates the allowed content attribute. Look
         * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
         * supported values.
         *
         * @method _validateAllowedContent
         * @protected
         * @return {Boolean} True if the value was accepted, false otherwise.
         */
        _validateAllowedContent: function(value) {
            return Lang.isString(value) || Lang.isObject(value) || Lang.isBoolean(value);
        },

        /**
         * Validates toolbars attribute. May be empty string or null, which means the current instance of AlloyEdtor
         * shouldn't have any toolbars, or Object, which properties are the desired toolbars.
         *
         * @method _validateToolbars
         * @protected
         * @param {Any} value The value which should be validated.
         * @return {Boolean} True if the value was accepted, false otherwise.
         */
        _validateToolbars: function(value) {
            return (value === '' || Lang.isObject(value) || Lang.isNull(value));
        }
    }, {
        ATTRS: {
            /**
             * Configures the allowed content for the current instance of AlloyEditor.
             * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
             * for more information about the valid values.
             *
             * @attribute allowedContent
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
             * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
             * make AlloyEditor to work properly.
             *
             * @attribute extraPlugins
             * @default 'uicore,selectionregion,dropimages,placeholder,linktooltip,uiloader'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: Lang.isString,
                value: 'uicore,selectionregion,dropimages,placeholder,linktooltip,uiloader',
                writeOnce: true
            },

            /**
             * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
             *
             * @attribute nativeEditor
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
             * @attribute placeholderClass
             * @default 'alloy-editor-placeholder'
             * @writeOnce
             * @type {String}
             */
            placeholderClass: {
                validator: Lang.isString,
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
             * @attribute removePlugins
             * @default 'contextmenu,toolbar,elementspath,resize,liststyle,tabletools,link'
             * @writeOnce
             * @type {String}
             */
            removePlugins: {
                validator: Lang.isString,
                value: 'contextmenu,toolbar,elementspath,resize,liststyle,tabletools,link',
                writeOnce: true
            },

            /**
             * The Node ID or HTMl node, which should be turned to an instance of AlloyEditor.
             *
             * @attribute srcNode
             * @type String | Node
             * @writeOnce
             */
            srcNode: {
                setter: Y.one,
                writeOnce: true
            },

            /**
             * Specifies the Toolbars of the current editor instance. The value should be an object
             * with one or more properties. Each of these will represent a toolbar. The value of these properties
             * can be string or Object. If String, the value of the string should represent the buttons. If object,
             * one of these properties should be 'buttons', which will represent the buttons of this Toolbar and
             * all the other properties will be different configuration parameters of the Toolbar. Example:
             * <pre><code>
             *     toolbars: {
             *         table: { // this would be a toolbar configuration, which specifies both Toolbar attributes and its buttons
             *             buttons: ['button1', button2],
             *             width: 25
             *         },
             *         add: ['image', 'code'], // here we specify only the buttons of this toolbar and leave the other options unmodified.
             *         image: ['left', 'right'],
             *         styles: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
             *     }
             * </pre></code>
             *
             * @default
             *     toolbars {
             *         add: ['image'],
             *         image: ['left', 'right'],
             *         styles: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
             *     }
             * @attribute toolbars
             * @type Object
             */
            toolbars: {
                validator: '_validateToolbars',
                value: {
                    add: ['image'],
                    image: ['left', 'right'],
                    styles: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
                }
            },

            /**
             * Specifies the delay, after which the Toolbars will be hidden as soon as user interacts with another
             * element on the page, not part of the UI of editor.
             *
             * @attribute toolbarsHideDelay
             * @type {Number}
             */
            toolbarsHideDelay: {
                validator: Lang.isNumber,
                value: 100
            }
        }
    });

    Y.AlloyEditor = AlloyEditor;
}, '', {
    requires: ['base-build', 'node-base']
});