YUI.add('toolbar-styles', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        /**
         * The ToolbarStyles class hosts the buttons for styling text selection.
         *
         * @class ToolbarStyles
         */

        ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionConstrain, Y.ToolbarBase, Y.ToolbarPosition], {
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

                contentBox = this.get('contentBox');

                contentBox.appendChild(buttonsContainer);

                instance._buttonsContainer = buttonsContainer;
            },

            /**
             * Attaches listener to <code>toolbarsHide</code> event.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                this.get('editor').on('toolbarsHide', this._onToolbarsHide, this);
            },

            /**
             * Calculates and sets the position of the toolbar.
             *
             * @method showAtPoint
             * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
             * @param {Number} top The right offset in page coordinates where Toolbar should be shown.
             * @param {Number} direction The direction of the selection. May be one of the following:
             * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
             */
            showAtPoint: function(left, top, direction) {
                var boundingBox,
                    xy,
                    visible;

                boundingBox = this.get('boundingBox');

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    boundingBox.replaceClass('alloy-editor-arrow-box-bottom', 'alloy-editor-arrow-box-top');
                } else {
                    boundingBox.replaceClass('alloy-editor-arrow-box-top', 'alloy-editor-arrow-box-bottom');
                }

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
             * Calculates the most appropriate position where the Toolbar should be displayed and shows it.
             *
             * @method _onEditorInteraction
             * @protected
             * @param {Object} event The editorInteraction event payload.
             * See {{#crossLink "CKEDITOR.plugins.uicore/editorInteraction:event"}}{{/crossLink}} event for more
             * information.
             */
            _onEditorInteraction: function(event) {
                var editor,
                    position,
                    selectionData,
                    selectionEmpty,
                    nativeEvent;

                editor = this.get('editor');

                selectionEmpty = editor.isSelectionEmpty();

                selectionData = event.data.selectionData;

                nativeEvent = event.data.nativeEvent;

                if (!selectionData.element && selectionData.region && !selectionEmpty) {
                    position = this._calculatePosition(selectionData, {
                        x: nativeEvent.pageX,
                        y: nativeEvent.pageY
                    });

                    this.showAtPoint(position.x, position.y, position.direction);

                    this.fire('positionChange', this);

                    editor.fire('toolbarActive', this);
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

            BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-styles alloy-editor-arrow-box">' +
                '</div>',

            CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>',

            TPL_BUTTONS_CONTAINER: '<div class="btn-group alloy-editor-toolbar-buttons"></div>'
        }, {
            ATTRS: {
                /**
                 * Specifies the buttons, which will be attached to the current instance of the toolbar.
                 * A button configuration can be simple string with the name of the button, or an object
                 * with properties, like this:
                 * <pre><code>
                 *     buttons: ['strong']
                 * </pre></code>
                 *     or:
                 * <pre><code>
                 *     buttons: [
                 *         {
                 *             name: 'strong',
                 *             cfg: {
                 *                 zIndex: 1024,
                 *                 property2: 1024
                 *             }
                 *         }
                 *     ]
                 * </pre></code>
                 *
                 * @attribute buttons
                 * @default ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
                 * @type Array
                 */
                buttons: {
                    validator: Lang.isArray,
                    value: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
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

    Y.ToolbarStyles = ToolbarStyles;
}, '', {
    requires: ['toolbar-base', 'toolbar-position', 'widget-base', 'widget-position', 'widget-position-constrain']
});
