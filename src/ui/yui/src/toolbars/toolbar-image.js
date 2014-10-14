YUI.add('toolbar-image', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        /**
         * The ToolbarImage class hosts the buttons for aligning and manipulating an image.
         *
         * @class ToolbarImage
         */
        ToolbarImage = Y.Base.create('toolbarimage', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionConstrain, Y.ToolbarBase, Y.ToolbarPosition], {
            /**
             * Creates the container where buttons, attached to the instance of Toolbar should render.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this,
                    buttonsContainer,
                    contentBox;

                buttonsContainer = YNode.create(instance.TPL_BUTTONS_CONTAINER);

                this.get('boundingBox').addClass('arrow-box arrow-box-bottom');

                contentBox = this.get('contentBox');

                contentBox.addClass('btn-toolbar');

                contentBox.appendChild(buttonsContainer);

                instance._buttonsContainer = buttonsContainer;
            },

            /**
             * Attaches listeners to <code>actionPerformed</code> and <code>toolbarsHide</code> events.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                this.on('actionPerformed', this._onActionPerformed, this);

                this.get('editor').on('toolbarsHide', this._onToolbarsHide, this);
            },

            /**
             * Calculates and sets the position of the toolbar.
             *
             * @method showAtPoint
             * @param {Number} left The left offset in page coordinates.
             * @param {Number} top The top offset in page coordinates.
             * @param {Number} direction The direction of the selection. Can be one of these:
             *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
             *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
             */
            showAtPoint: function(left, top, direction) {
                var xy,
                    visible;

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
             * After changing the attributes of the image, updates the position of the Toolbar.
             *
             * @method _onActionPerformed
             * @protected
             */
            _onActionPerformed: function() {
                var editor,
                    element;

                editor = this.get('editor');

                element = editor.getSelection().getSelectedElement();

                this._updateUI(element);
            },

            /**
             * Once after user interacts with the editor, shows or hides the Toolbar.
             * The Toolbar will be hidden if the currently selected element is not an image.
             *
             * @method _onEditorInteraction
             * @protected
             * @param {EventFacade} event Event that triggered when user interacted with the editor.
             */
            _onEditorInteraction: function(event) {
                var element,
                    name,
                    selectionData;

                selectionData = event.data.selectionData;

                element = selectionData.element;

                name = element ? element.getName() : null;

                if (name === 'img') {
                    this._updateUI(element);
                } else {
                    this.hide();
                }
            },

            /**
             * Hides the toolbar in case of <code>toolbarsHide</code> event.
             *
             * @method _onToolbarsHide
             */
            _onToolbarsHide: function() {
                this.hide();
            },

            /**
             * Moves the Toolbar to specified position.
             *
             * @method _updateUI
             * @protected
             * @param {CKEDITOR.dom.element} element The selected image element from the editor.
             */
            _updateUI: function(element) {
                var region;

                if (element) {
                    region = Y.DOM.region(element.$);

                    this.showAtPoint(region.left + (region.right - region.left) / 2, region.top,
                        CKEDITOR.SELECTION_BOTTOM_TO_TOP);

                    this.fire('positionChange', this);

                    this.get('editor').fire('toolbarActive', this);
                }
            },

            BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-image alloy-editor-arrow-box ' +
                'alloy-editor-arrow-box-bottom"></div>',

            CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>',

            TPL_BUTTONS_CONTAINER: '<div class="alloy-editor-toolbar-buttons btn-group"></div>'
        }, {
            ATTRS: {
                /**
                 * Specifies the buttons, which will be attached to the current instance of the toolbar.
                 * A button configuration can be simple string with the name of the button, or an object
                 * with properties, like this:
                 * <pre><code>
                 *     buttons: ['left']
                 * </pre></code>
                 *     or:
                 * <pre><code>
                 *     buttons: [
                 *         {
                 *             name: 'left',
                 *             cfg: {
                 *                 zIndex: 1024,
                 *                 property2: 1024
                 *             }
                 *         }
                 *     ]
                 * </pre></code>
                 *
                 * @attribute buttons
                 * @default ['left', 'right']
                 * @type Array
                 */
                buttons: {
                    validator: Lang.isArray,
                    value: ['left', 'right']
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
                }
            }
        });

    Y.ToolbarImage = ToolbarImage;
}, '', {
    requires: ['dom-screen', 'widget-base', 'widget-position', 'widget-position-constrain', 'toolbar-base', 'toolbar-position']
});
