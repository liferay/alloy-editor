YUI.add('toolbar-add', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        ARROW_BOX_CLASSES = [
            'alloy-editor-arrow-box-top',
            'alloy-editor-arrow-box-bottom',
            'alloy-editor-arrow-box-left',
            'alloy-editor-arrow-box-right'
        ],

        ToolbarAddTrigger,

        /**
         * The ToolbarAdd class provides functionality for adding content to the editor.
         *
         * @class ToolbarAdd
         */
        ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.ToolbarBase, Y.ToolbarPosition, Y.WidgetPosition,
            Y.WidgetPositionConstrain], {
            /**
             * Initializer lifecycle implementation for the ToolbarAdd class.
             *
             * @method initializer
             * @protected
             * @param config {Object} Configuration object literal for the toolbar
             */
            initializer: function() {
                var editorNode;

                editorNode = Y.one(this.get('editor').element.$);

                this._editorDOMNode = editorNode.getDOMNode();

                this._toolbars = {};
            },

            /**
             * Attaches events to the add button which will help to handle the appearance of the
             * menu with the buttons.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                var editor;

                editor = this.get('editor');

                this._triggerButton.on('click', this._showToolbarAddContent, this);

                this.on('visibleChange', this._onVisibleChange, this);
                editor.on('toolbarsReady', this._onToolbarsReady, this);
                editor.on('toolbarsHide', this._onToolbarsHide, this);
            },

            /**
             * Destroys the add trigger and the trigger button.
             *
             * @method destructor
             * @protected
             */
            destructor: function() {
                this._triggerButton.destroy();

                this._trigger.destroy();
            },

            /**
             * Returns the focus to the editor and shows again the trigger.
             *
             * @method blur
             */
            blur: function() {
                this.get('editor').focus();

                this._showTriggerAtPoint(this._triggerButtonPosition.left, this._triggerButtonPosition.top);
            },

            /**
             * Focus the toolbar. If it is visible, focus the first button, otherwise focus the trigger button.
             *
             * @method focus
             * @return {Boolean} True if toolbar has been focused, false otherwise.
             */
            focus: function() {
                var buttonsContainer = this.get('buttonsContainer');

                if (this.get('visible')) {
                    buttonsContainer.focusManager.focus(0);
                } else {
                    this._triggerButton.focus();
                }

                return true;
            },

            /**
             * Returns true if the passed node is a child node of the toolbar, false otherwise.
             *
             * @method ownsNode
             * @param  {Node|HTMLElement} node The node which should be checked if it is child node of the current
             * toolbar.
             * @return {Boolean} True if the passed node is child node of the current toolbar.
             */
            ownsNode: function(node) {
                return this.get('boundingBox').contains(node) || this._trigger.get('boundingBox').contains(node);
            },

            /**
             * Renders the two containers - for button add and the toolbar.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                this._renderToolbarAddContent();

                this._renderTrigger();
            },

            /**
             * Calculates and sets the position of the toolbar.
             *
             * @method showAtPoint
             * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
             * @param {Number} top The top offset in page coordinates where Toolbar should be shown.
             * @param {Number} direction The direction of the selection. May be one of the following:
             * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
             */
            showAtPoint: function(left, top, direction) {
                var boundingBox,
                    visible,
                    xy;

                boundingBox = this.get('boundingBox');

                if (this._isCurrentLineEmpty()) {
                    direction = CKEDITOR.SELECTION_LEFT_TO_RIGHT;
                }

                Y.Array.each(ARROW_BOX_CLASSES, function(item) {
                    boundingBox.removeClass(item);
                });

                boundingBox.addClass(ARROW_BOX_CLASSES[direction || 0]);

                visible = this.get('visible');

                if (!visible) {
                    this.show();
                }

                xy = this._getToolbarXYPoint(left, top, direction);

                this._moveToPoint(this.getConstrainedXY(xy), direction, {
                    visible: visible
                });
            },

            /**
             * Hides all present toolbars other than this one.
             *
             * @method _hideEditorToolbars
             * @protected
             */
            _hideEditorToolbars: function() {
                var editorToolbars;

                editorToolbars = this._toolbars;

                Y.Object.each(editorToolbars, function(item) {
                    if (this !== item) {
                        item.hide();
                    }
                });
            },

            /**
             * Displays or hides the toolbar when user interacts with the editor
             * (via mouse, keyboard or touch device).
             * ToolbarAdd displays itself always - regardless of the fact the selection
             * is empty or not. It might be hidden only if there is no any selection region.
             *
             * @method _onEditorInteraction
             * @protected
             * @param {EventFacade} event Event that triggered when user interacted with the editor.
             */
            _onEditorInteraction: function(event) {
                var nativeEvent,
                    selectionData,
                    startRect;

                selectionData = event.data.selectionData;

                nativeEvent = event.data.nativeEvent;

                this.hide();

                if (selectionData.region) {
                    startRect = selectionData.region.startRect || selectionData.region;

                    this._toolbarPosition = this._calculatePosition(selectionData, {
                        x: nativeEvent.pageX,
                        y: nativeEvent.pageY
                    });

                    this._triggerButtonPosition = {
                        left: this._editorNode.getX(),
                        top: selectionData.region.top + startRect.height / 2
                    };

                    this._showTriggerAtPoint(this._triggerButtonPosition.left, this._triggerButtonPosition.top);
                }
            },

            /**
             * Hides the toolbar and the trigger in case of <code>toolbarsHide</code> event.
             *
             * @method _onToolbarsHide
             */
            _onToolbarsHide: function() {
                this.hide();

                this._trigger.hide();
            },

            /**
             * Stores the editor initialized toolbars.
             *
             * @method _onToolbarsReady
             * @protected
             * @param {EventFacade} event Event that triggered when all editor toolbars are initialized.
             */
            _onToolbarsReady: function(event) {
                this._toolbars = event.data.toolbars;
            },

            /**
             * Adds a marker-class on editorNode to indicate the add toolbar is visible.
             *
             * @method _onVisibleChange
             * @protected
             * @param {EventFacade} event Event that triggered when toolbar visibility changes.
             */
            _onVisibleChange: function(event) {
                this._editorNode.toggleClass('alloyeditor-add-toolbar', event.newVal);
            },

            /**
             * Creates the container where buttons, attached to the instance of Toolbar should render.
             *
             * @method _renderButtons
             * @protected
             */
            _renderToolbarAddContent: function() {
                var instance = this,
                    buttonsContainer,
                    contentBox;

                buttonsContainer = YNode.create(instance.TPL_BUTTONS_CONTAINER);

                contentBox = this.get('contentBox');

                contentBox.appendChild(buttonsContainer);

                instance._buttonsContainer = buttonsContainer;
            },

            /**
             * Renders the toolbar trigger.
             *
             * @method _renderTrigger
             * @protected
             */
            _renderTrigger: function() {
                var triggerButton,
                    triggerButtonContainer;

                triggerButtonContainer = YNode.create(Lang.sub(
                    this.TPL_TRIGGER, {
                        addContent: this.get('strings').addContent,
                        content: this.TPL_TRIGGER_CONTENT
                    }));

                this._trigger = new ToolbarAddTrigger({
                    render: true,
                    visible: false,
                    zIndex: 1
                });

                triggerButton = new Y.Button({
                    srcNode: triggerButtonContainer.one('.btn-add')
                }).render(triggerButtonContainer);

                this._trigger.get('contentBox').appendChild(triggerButtonContainer);

                this._triggerButton = triggerButton;

                this._triggerButtonContainer = triggerButtonContainer;

                this._triggerButtonContainer.on('keydown', this._onKeyDown, this);
            },

            /**
             * Shows the toolbar and hides the toolbar trigger on the margin.
             *
             * @method _showToolbarAddContent
             * @protected
             */
            _showToolbarAddContent: function() {
                this._hideEditorToolbars();

                this.showAtPoint(this._toolbarPosition.x, this._toolbarPosition.y, this._toolbarPosition.direction);

                this._trigger.hide();

                this._editorNode.focus();

                this.focus();

                this.get('editor').fire('toolbarActive', this);
            },

            /**
             * Calculates and sets the position of the add toolbar trigger.
             *
             * @method _showTriggerAtPoint
             * @protected
             * @param {Number} left The left offset in page coordinates where Trigger should be shown.
             * @param {Number} top The top offset in page coordinates where Trigger should be shown.
             */
            _showTriggerAtPoint: function(left, top) {
                var strings,
                    triggerButtonContainer,
                    triggerGutter;

                if (!this._trigger.get('visible')) {
                    this._trigger.show();

                    strings = this.get('strings');

                    this.get('editor').fire('ariaUpdate', {
                        message: Lang.sub(strings.state, {
                            focus: strings.focus,
                            name: this.name,
                            state: strings.visible
                        })
                    });
                }

                triggerButtonContainer = this._triggerButtonContainer.getDOMNode();

                triggerGutter = this.get('triggerGutter');

                this._trigger.set('xy', this.getConstrainedXY([left - triggerButtonContainer.offsetWidth -
                    triggerGutter.left, top - triggerGutter.top - triggerButtonContainer.offsetHeight / 2]));
            },

            BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-add alloy-editor-arrow-box">' +
                '</div>',

            CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>',

            TPL_BUTTONS_CONTAINER: '<div class="alloy-editor-toolbar-buttons btn-group"></div>',

            TPL_TRIGGER: '<div class="alloy-editor-toolbar-buttons btn-group">' +
                '<button aria-label="{addContent}" class="alloy-editor-button btn btn-add" type="button">{content}' +
                '</button>' +
                '</div>',

            TPL_TRIGGER_CONTENT: '<i class="alloy-editor-icon-add"></i>'

        }, {
            ATTRS: {
                /**
                 * Specifies the buttons, which will be attached to the current instance of the toolbar.
                 * A button configuration can be simple string with the name of the button, or an object
                 * with properties, like this:
                 * <pre><code>
                 *     buttons: ['image']
                 * </pre></code>
                 *     or:
                 * <pre><code>
                 *     buttons: [
                 *         {
                 *             name: 'image',
                 *             cfg: {
                 *                 zIndex: 1024,
                 *                 property2: 1024
                 *             }
                 *         }
                 *     ]
                 * </pre></code>
                 *
                 * @attribute buttons
                 * @default ['image']
                 * @type Array
                 */
                buttons: {
                    validator: Lang.isArray,
                    value: ['image']
                },

                /**
                 * Specifies whether the toolbar show be constrained to some node or to the viewport.
                 *
                 * @attribute constrain
                 * @default true (will be constrained to the viewport)
                 * @type Boolean
                 */
                constrain: {
                    validator: Lang.isBoolean,
                    value: true
                },

                /**
                 * Collection of strings used to label elements of the toolbar's UI.
                 * ToolbarBase provides string properties to specify the messages for:
                 *  - How to focus on the toolbar
                 *  - Possible toolbar states (hidden and visible)
                 *  - Current toolbar state. This works as a template. It's possible to
                 *  use the placeholders {name}, {state} and {focus} to inject messages
                 *  into the generated string.
                 *
                 * @attribute strings
                 * @default {addContent: 'Add content', focus: 'Press Alt + F10 to focus on the toolbar.',
                 *     hidden: 'hidden', state: 'Toolbar {name} is now {state}. {focus}', visible: 'visible'}
                 * @type Object
                 */
                strings: {
                    validator: Lang.isObject,
                    value: {
                        addContent: 'Add content',
                        focus: 'Press Alt + F10 to focus on the toolbar.',
                        hidden: 'hidden',
                        state: 'Toolbar {name} is now {state}. {focus}',
                        visible: 'visible'
                    }
                },

                /**
                 * Specifies the gutter of the trigger button. The gutter object contains the top
                 * and left offsets from the point, where the trigger is supposed to appear.
                 *
                 * @attribute gutter
                 * @default {
                 *   left: 15,
                 *   top: 0
                 * }
                 * @type Object
                 */
                triggerGutter: {
                    validator: Lang.isObject,
                    value: {
                        left: 15,
                        top: 0
                    }
                }
            }
        });

    Y.ToolbarAdd = ToolbarAdd;

    /**
     * The ToolbarAddTrigger class hosts controls for showing the toolbar with the add controls. This class is intended
     * to be used internally by {{#crossLink "ToolbarAdd"}}{{/crossLink}} class.
     *
     * @class ToolbarAddTrigger
     */
    ToolbarAddTrigger = Y.Base.create('toolbaraddtrigger', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionAlign], {
        BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-add-trigger"></div>',

        CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>'
    }, {

    });
}, '0.1', {
    requires: ['widget-base', 'widget-position', 'widget-position-constrain', 'widget-position-align', 'toolbar-base',
        'toolbar-position']
});