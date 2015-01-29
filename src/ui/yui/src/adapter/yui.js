CKEDITOR.disableAutoInline = true;

YUI.add('alloy-editor', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array,
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

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            Y.mix(editor.config, config);

            this._initializeWidgets(editor);

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
            editor.on('toolbarKey', this._onWidgetKey, this);
            editor.on('widgetKey', this._onWidgetKey, this);

            editor.on('toolbarActive', this._onWidgetActive, this);
            editor.on('widgetActive', this._onWidgetActive, this);

            editor.on('afterCommandExec', this._returnFocusToWidget, this);
        },

        /**
         * [_initializeWidgets description]
         * @param  {[type]} editor [description]
         * @return {[type]}        [description]
         */
        _initializeWidgets: function(editor) {
            var self = this,
                modules,
                widget,
                widgetConfig,
                widgets;

            modules = [];
            widgets = [];

            YArray.each(
                this.get('widgets'),
                function(item) {
                    if (Lang.isFunction(item.fn)) {
                        widgetConfig = Y.merge(item.cfg, { editor: editor });

                        widget = new item.fn(widgetConfig);
                    }

                    if (Lang.isFunction(widget.getModules)) {
                        modules = modules.concat(widget.getModules());
                    }

                    if (Lang.isFunction(widget.setEditor)) {
                        widget.setEditor(editor);
                    }

                    widgets.push(widget);
                }
            );

            Y.use(modules, function() {
                YArray.each(widgets, function(widget) {
                    widget.render();
                });

                editor.fire('widgetsReady', { widgets: widgets });
            });


            this._widgets = widgets;
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created widgets.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var editorInstance;

            editorInstance = CKEDITOR.instances[this.get('srcNode').get('id')];

            YArray.each(this._widgets, function(widget) {
                widget.destroy();
            });

            if (editorInstance) {
                editorInstance.destroy();
            }

            (new Y.EventHandle(this._eventHandles)).detach();
        },

        /**
         * Searches among widgets to find the next widget that should be focused.
         *
         * @method _focusNextWidget
         * @protected
         */
        _focusNextWidget: function() {
            var activeWidget,
                currentWidgetIndex,
                lastPart,
                widgets;

            activeWidget = this._activeWidget;

            widgets = this._widgets;

            currentWidgetIndex = YArray.indexOf(widgets, activeWidget);

            YArray.some(widgets, function(widget) {
                if (widget !== activeWidget && widget.focus()) {
                    this._activeWidget = widget;

                    this._focusedWidget = widget;

                    return true;
                }
            }, this);
        },

        /**
         * Focuses the first visible widget in editor or if there is not any, focuses the last of the other
         * widgets which accept the request for focusing.
         *
         * @method _focusVisibleWidget
         * @protected
         */
        _focusVisibleWidget: function(currentButton) {
            YArray.some(this._widgets, function(widget) {
                if (widget != this._activeWidget && widget.focus(currentButton)) {
                    this._activeWidget = widget;

                    this._focusedWidget = widget;

                    return widget.get('visible');
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
         * @method _hideWidgets
         * @protected
         */
        _hideWidgets: function() {
            YArray.each(this._widgets, function(widget) {
                widget.hide();
            });
        },

        /**
         * Fires <code>widgetsHide</code> event if none of the toolbars or their child nodes is the element user is
         * currently interacting.
         *
         * @method _onDocInteract
         * @protected
         * @param {EventFacade} event EventFacade object
         */
        _onDocInteract: function(event) {
            var result,
                srcNode;

            srcNode = this.get('srcNode');

            result = (srcNode === event.target) || (srcNode.contains(event.target));

            result = result || Y.some(this._widgets, function(widget) {
                return widget.ownsNode(event.target);
            });

            if (!result) {
                this._editor.fire('widgetsHide');
            }
        },

        /**
         * Handles key events in the editor:
         *  - ALT + F10: focus the widget
         *  - ESC: hide visible widgets
         *
         * @method _onEditorKey
         * @param {EventFacade} event Event that triggered when user pressed a key inside the editor.
         * @protected
         */
        _onEditorKey: function(event) {
            if (event.altKey && event.keyCode === KEY_F10) {
                this._focusVisibleWidget();

            } else if (event.keyCode === KEY_ESC) {
                this._hideWidgets();
            }
        },

        /**
         * Handles activating a widget.
         *
         * @method _onToolbarActive
         * @protected
         */
        _onWidgetActive: function(event) {
            this._activeWidget = event.data;
        },

        /**
         * Handles key events in the widget:
         *  - TAB: focus next widget
         *  - ESC: focus the editor
         *
         * @method _onWidgetKey
         * @param {Event} event keyboard event
         * @protected
         */
        _onWidgetKey: function(event) {
            if (event.data.keyCode === KEY_TAB) {
                event.data.preventDefault();
                this._focusNextWidget();

            } else if (event.data.keyCode === KEY_ESC) {
                this._activeWidget.blur();
                this._activeWidget = null;
                this._focusedWidget = null;

                this._hideWidgets();
            }
        },

        /**
         * Checks if a widget was focused by keyboard,
         * and if so, returns the focus to it.
         *
         * @method _returnFocusToWidget
         * @protected
         */
        _returnFocusToWidget: function() {
            var widget = this._focusedWidget;

            if (widget) {
                widget.focus(widget.getActiveButton());
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
         * Validates widgets attribute. May be empty string or null, which means the current instance of AlloyEdtor
         * shouldn't have any widgets, or Object, which properties are the desired widgets.
         *
         * @method _validateWidgets
         * @protected
         * @param {Any} value The value which should be validated.
         * @return {Boolean} True if the value was accepted, false otherwise.
         */
        _validateWidgets: function(value) {
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
             * @default 'uicore,selectionregion,dropimages,placeholder,linktooltip'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: Lang.isString,
                value: 'uicore,selectionregion,dropimages,placeholder,linktooltip',
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
             * Specifies the Widgets of the current editor instance. The value should be an array
             * with one or more items. Each of these will represent a widget. The value of these items
             * can be an instance of the widget or a configuration Object. If object, it should contain an 'fn'
             * property with the constructor of the Widget and optionally a 'cfg' object to be passed to the
             * class on instantiation. Example:
             *
             * <pre><code>
             *     widgets: [
             *         {
             *             fn: Y.ToolbarStyles,
             *             cfg: {
             *                 visible: false
             *             }
             *         },
             *         {
             *             fn: Y.ToolbarAdd
             *         },
             *         new Y.CustomWidget()
             *     ]
             * </pre></code>
             *
             * Widgets may take part in the focus rotation for accessibility purposes. In general, the should expose
             * the following methods:
             *
             * - focus() To gain focus on the widget
             * - setEditor(editor) To receive the native editor instance on already created Widgets. When passing the
             * wiget constructor, an 'editor' attribute with the nativeEditor will be passed down in the config object.
             *
             * @default
             *     widgets: [
             *         {
             *             fn: Y.ToolbarStyles,
             *             cfg: {
             *                 visible: false
             *             }
             *         },
             *         {
             *             fn: Y.ToolbarAdd,
             *             cfg: {
             *                 visible: false
             *             }
             *         }
             *     ]
             * @type Array
             */
            widgets: {
                validator: '_validateWidgets',
                value: [
                    {
                        fn: Y.ToolbarStyles,
                        cfg: {
                            visible: false
                        }
                    },
                    {
                        fn: Y.ToolbarAdd,
                        cfg: {
                            visible: false
                        }
                    }
                ]
            }
        }
    });

    Y.AlloyEditor = AlloyEditor;
}, '', {
    requires: ['base-build', 'node-base', 'toolbar-add', 'toolbar-styles']
});