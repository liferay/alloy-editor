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
            var documentKeyHandle,
                editor,
                editorKeyHandle,
                eventsDelay,
                node,
                onDocInteractTask,
                onEditorKeyTask;

            node = this.get('srcNode');

            editor = CKEDITOR.inline(node.getDOMNode());

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            Y.mix(editor.config, config);

            this._editor = editor;

            eventsDelay = this.get('eventsDelay');

            onDocInteractTask = CKEDITOR.tools.debounce(this._onDocInteract, eventsDelay, this);

            onEditorKeyTask = CKEDITOR.tools.debounce(this._onEditorKey, eventsDelay, this);

            editorKeyHandle = Y.one(Y.config.doc).on(['click', 'keydown'], onDocInteractTask);

            documentKeyHandle = node.on('keydown', onEditorKeyTask);

            this._eventHandles = [
                onDocInteractTask,
                onEditorKeyTask,
                editorKeyHandle,
                documentKeyHandle
            ];

            // Custom events will be attached automatically, there is no need to put them in to the list
            // with event handles
            editor.on('toolbarKey', this._onToolbarKey, this);

            editor.on('toolbarActive', this._onToolbarActive, this);

            editor.on('afterCommandExec', this._returnFocusToToolbar, this);
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

            (new Y.EventHandle(this._eventHandles)).detach();
        },

        /**
         * Searches among toolbars to find the next toolbar that should be focused.
         *
         * @method _focusNextToolbar
         * @protected
         */
        _focusNextToolbar: function() {
            var activeToolbar,
                currentToolbarIndex,
                lastPart,
                toolbars;

            activeToolbar = this._activeToolbar;

            toolbars = this._editor.config.toolbars;

            //We need to convert toolbars to an array so we can reorder them.
            toolbars = Y.Object.keys(toolbars).map(function(item) {
                return toolbars[item];
            });

            currentToolbarIndex = Y.Array.indexOf(toolbars, activeToolbar);

            lastPart = toolbars.splice(currentToolbarIndex);

            toolbars = lastPart.concat(toolbars);

            Y.Array.some(toolbars, function(toolbar) {
                if (toolbar !== activeToolbar && toolbar.focus()) {
                    this._activeToolbar = toolbar;

                    this._focusedToolbar = toolbar;

                    return true;
                }
            }, this);
        },

        /**
         * Focuses the first visible toolbar in editor or if there is not any, focuses the last of the other
         * toolbars which accept the request for focusing.
         *
         * @method _focusVisibleToolbar
         * @protected
         */
        _focusVisibleToolbar: function(currentButton) {
            Y.Object.some(this._editor.config.toolbars, function(toolbar) {
                if (toolbar != this._activeToolbar && toolbar.focus(currentButton)) {
                    this._activeToolbar = toolbar;

                    this._focusedToolbar = toolbar;

                    return toolbar.get('visible');
                }
            }, this);
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
            Y.Object.each(this._editor.config.toolbars, function(toolbar) {
                toolbar.hide();
            });
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
         *  - ALT + F10: focus the toolbar
         *  - ESC: hide visible toolbars
         *
         * @method _onEditorKey
         * @param {EventFacade} event Event that triggered when user pressed a key inside the editor.
         * @protected
         */
        _onEditorKey: function(event) {
            if (event.altKey && event.keyCode === KEY_F10) {
                this._focusVisibleToolbar();

            } else if (event.keyCode === KEY_ESC) {
                this._hideToolbars();
            }
        },

        /**
         * Handles activating a toolbar.
         *
         * @method _onToolbarActive
         * @protected
         */
        _onToolbarActive: function(event) {
            this._activeToolbar = event.data;
        },

        /**
         * Handles key events in the toolbar:
         *  - TAB: focus next toolbar
         *  - ESC: focus the editor
         *
         * @method _onToolbarKey
         * @param {Event} event keyboard event
         * @protected
         */
        _onToolbarKey: function(event) {
            if (event.data.keyCode === KEY_TAB) {
                event.data.preventDefault();
                this._focusNextToolbar();

            } else if (event.data.keyCode === KEY_ESC) {
                this._activeToolbar.blur();
                this._activeToolbar = null;
                this._focusedToolbar = null;

                this._hideToolbars();
            }
        },

        /**
         * Checks if a toolbar was focused by keyboard,
         * and if so, returns the focus to it.
         *
         * @method _returnFocusToToolbar
         * @protected
         */
        _returnFocusToToolbar: function() {
            var toolbar = this._focusedToolbar;

            if (toolbar) {
                var currentButton = toolbar.getActiveButton();

                this._focusVisibleToolbar(currentButton);
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
             * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
             *
             * @attribute eventsDelay
             * @type {Number}
             */
            eventsDelay: {
                validator: Lang.isNumber,
                value: 100
            },

            /**
             * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
             * make AlloyEditor to work properly.
             *
             * @attribute extraPlugins
             * @default 'uicore,selectionregion,addimages,placeholder,linktooltip,uiloader'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: Lang.isString,
                value: 'uicore,selectionregion,addimages,placeholder,linktooltip,uiloader',
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
             * The Node ID or HTMl node, where AlloyEditor's UI should be rendered.
             *
             * @attribute uiNode
             * @type String | Node
             * @writeOnce
             */
            uiNode: {
                setter: Y.one
            }
        }
    });

    Y.AlloyEditor = AlloyEditor;
}, '', {
    requires: ['base-build', 'node-base']
});