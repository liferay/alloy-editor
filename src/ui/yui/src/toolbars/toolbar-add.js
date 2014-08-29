YUI.add('toolbar-add', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        ToolbarAddItems,

        /**
         * The ToolbarAdd class provides functionality for adding content to the editor.
         *
         * @class ToolbarAdd
         */
        ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.ToolbarBase, Y.WidgetPosition, Y.WidgetPositionConstrain, Y.WidgetAutohide], {
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

                this._hideButtonsContainerFn = CKEDITOR.tools.debounce(this._hideButtonsContainer, this.get('hideTimeout'));

                this._editorDOMNode = editorNode.getDOMNode();
            },

            /**
             * Attaches events to the boundingBox which will help to handle the appearance of the
             * menu with the buttons.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                var boundingBox,
                    buttonsBoundingBox;

                this._addButton.on(['click', 'mouseenter'], this._showButtonsContainer, this);

                boundingBox = this.get('boundingBox');
                buttonsBoundingBox = this._buttonsOverlay.get('boundingBox');

                boundingBox.on('mouseleave', this._handleMouseLeave, this);
                buttonsBoundingBox.on('mouseleave', this._handleMouseLeave, this);

                boundingBox.on('mouseenter', this._handleMouseEnter, this);
                buttonsBoundingBox.on('mouseenter', this._handleMouseEnter, this);
            },

            /**
             * Destroys the buttons container and its hide handler.
             *
             * @method destructor
             * @protected
             */
            destructor: function() {
                this._addButton.destroy();

                this._buttonsOverlay.destroy();

                this._hideButtonsContainerFn.cancel();
            },

            /**
             * Renders the two containers - for button add and the overlay which hosts the buttons.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                this._renderAddNode();

                this._renderButtonsOverlay();
            },

            /**
             * Calculates and sets the position of the toolbar.
             *
             * @method showAtPoint
             * @param {Number} x Point X in page coordinates.
             * @param {Number} y Point Y in page coordinates.
             */
            showAtPoint: function(x, y) {
                var addContentBtnNode,
                    gutter;

                this._hideButtonsContainer();

                if (!this.get('visible')) {
                    this.show();
                }

                addContentBtnNode = this._addContentBtnContainer.getDOMNode();

                gutter = this.get('gutter');

                this.set('xy', this.getConstrainedXY([x - addContentBtnNode.offsetWidth - gutter.left, y - gutter.top - addContentBtnNode.offsetHeight / 2]));
            },

            /**
             * Aligns the position of buttons overlay, so it shows next to the button container.
             *
             * @method _alignButtonsOverlay
             * @protected
             */
            _alignButtonsOverlay: function() {
                this._buttonsOverlay.align(this._addContentBtnContainer, [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR]);
            },

            /**
             * On mouseenter event, cancels the hide listener for hiding the buttons overlay.
             *
             * @method _handleMouseEnter
             * @protected
             */
            _handleMouseEnter: function() {
                this._hideButtonsContainerFn.cancel();
            },

            /**
             * On mouseleave event, cancels and then starts again the hide listener for hiding the buttons overlay.
             *
             * @method _handleMouseEnter
             * @protected
             */
            _handleMouseLeave: function() {
                this._hideButtonsContainerFn.cancel();

                this._hideButtonsContainerFn();
            },

            /**
             * Hides the buttons overlay.
             *
             * @method _hideButtonsContainer
             * @protected
             */
            _hideButtonsContainer: function() {
                this._buttonsOverlay.hide();
            },

            /**
             * Displays or hides the toolbar when user interacts with the editor
             * (via mouse, keyboard or touch device).
             * ToolbarAdd displays itself always - regardless of the fact the selection
             * is empty or not. It might be hidden only if there is no any selection region.
             *
             * @method _hideButtonsContainer
             * @protected
             * @param {EventFacade} event Event that triggered when user interacted with the editor.
             */
            _onEditorInteraction: function(event) {
                var editorX,
                    selectionData,
                    startRect;

                selectionData = event.data.selectionData;

                if (selectionData.region) {
                    startRect = selectionData.region.startRect || selectionData.region;

                    editorX = this._editorNode.getX();

                    this.showAtPoint(editorX, selectionData.region.top + startRect.height / 2);
                } else {
                    this.hide();
                }
            },

            /**
             * Renders the button add container.
             *
             * @method _renderAddNode
             * @protected
             */
            _renderAddNode: function() {
                var addButton,
                    addNode,
                    contentBox;

                addNode = YNode.create(Lang.sub(
                    this.TPL_ADD, {
                        content: this.TPL_ADD_CONTENT
                    }));

                addButton = new Y.Button({
                    srcNode: addNode.one('.btn-add')
                }).render(addNode);

                contentBox = this.get('contentBox');

                contentBox.appendChild(addNode);

                this._addButton = addButton;

                this._addContentBtnContainer = this.get('boundingBox').one('.alloy-editor-toolbar-buttons');
            },

            /**
             * Renders the overlay which contains the buttons for adding content.
             *
             * @method _renderButtonsOverlay
             * @protected
             */
            _renderButtonsOverlay: function() {
                var buttonsContainer;

                buttonsContainer = YNode.create(this.TPL_BUTTONS_CONTAINER);

                this._buttonsOverlay = new ToolbarAddItems({
                    render: true,
                    visible: false,
                    zIndex: 1
                });

                this._buttonsOverlay.get('contentBox').appendChild(buttonsContainer);

                this._buttonsContainer = buttonsContainer;
            },

            /**
             * Displays both containers - for add button and those which hosts the buttons
             * for adding content.
             *
             * @method _showButtonsContainer
             * @protected
             */
            _showButtonsContainer: function() {
                this._buttonsOverlay.show();

                this._alignButtonsOverlay();
            },

            BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-add"></div>',

            CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>',

            TPL_ADD: '<div class="alloy-editor-toolbar-buttons btn-group">' +
                '<button type="button" class="alloy-editor-button btn btn-add">{content}</button>' +
                '</div>',

            TPL_ADD_CONTENT: '<i class="alloy-editor-icon-add"></i>',

            TPL_BUTTONS_CONTAINER: '<div class="alloy-editor-toolbar-buttons btn-group btn-group-vertical"></div>'
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
                 *         'image': {
                 *             zIndex: 1024,
                 *             property2: 1024
                 *         }
                 *     ]
                 * </pre></code>
                 *
                 * @attribute buttons
                 * @default ['image', 'code']
                 * @type Array
                 */
                buttons: {
                    validator: Lang.isArray,
                    value: ['twitterquote', 'hline', 'image', 'media', 'quote', 'code']
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
                 * Specifies the gutter of the toolbar. The gutter object contains the top and left
                 * offsets from the point, where the toolbar is supposed to appear.
                 *
                 * @attribute gutter
                 * @default {
                 *   left: 5,
                 *   top: 0
                 * }
                 * @type Object
                 */
                gutter: {
                    validator: Lang.isObject,
                    value: {
                        left: 5,
                        top: 0
                    }
                },

                /**
                 * Specifies the timeout after which the buttons overlay will be hidden.
                 *
                 * @attribute hideTimeout
                 * @default 1000 (sec)
                 * @type Number
                 */
                hideTimeout: {
                    validator: Lang.isNumber,
                    value: 1000
                }
            }
        });

    Y.ToolbarAdd = ToolbarAdd;


    /**
     * The ToolbarAddItems class hosts buttons for adding content to the current editor instance. This class is intended to be
     * used internally by {{#crossLink "ToolbarAdd"}}{{/crossLink}} class.
     *
     * @class ToolbarAddItems
     */
    ToolbarAddItems = Y.Base.create('toolbaradditems', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionAlign, Y.WidgetAutohide], {
        BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-add-items"></div>',

        CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>'
    }, {

    });
}, '0.1', {
    requires: ['widget-base', 'widget-position', 'widget-position-constrain', 'widget-position-align', 'widget-autohide', 'toolbar-base']
});