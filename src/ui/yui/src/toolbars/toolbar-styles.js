YUI.add('toolbar-styles', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        /**
         * The ToolbarStyles class hosts the buttons for styling text selection.
         *
         * @class ToolbarStyles
         */
        ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition, Y.WidgetAutohide, Y.WidgetPositionConstrain, Y.ToolbarBase], {
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
             * Calculates and sets the position of the toolbar.
             *
             * @method showAtPoint
             * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
             * @param {Number} right The right offset in page coordinates where Toolbar should be shown.
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
             * Calculates the position of the toolbar. Depending on the direction of the
             * selection, ToolbarStyles may appear above on or on bottom of the selection.
             *
             * @method _calculatePosition
             * @protected
             * @param {Object} selectionData The data about the selection in the editor as
             * returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
             * @param {Number} pos Contains the coordinates of the position, considered as most appropriate.
             * This may be the point where the user released the mouse, or just the beginning or the end of
             * the selection.
             * @return {Object} An Object which contains the following properties:
             * direction, x, y, where x and y are in page coordinates and direction can be one of these:
             * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
             */
            _calculatePosition: function(selectionData, pos) {
                var direction,
                    endRect,
                    startRect,
                    x,
                    y;

                direction = selectionData.region.direction;

                endRect = selectionData.region.endRect;
                startRect = selectionData.region.startRect;

                if (endRect && endRect && startRect.top === endRect.top) {
                    direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
                }

                // If we have the point where user released the mouse, show Toolbar at this point
                // otherwise show it on the middle of the selection.
                if (pos.x && pos.y) {
                    x = this._getXPoint(selectionData, pos.x);

                    if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                        y = Math.min(pos.y, selectionData.region.top);
                    } else {
                        y = Math.max(pos.y, selectionData.region.bottom);
                    }
                } else {
                    x = selectionData.region.left + selectionData.region.width / 2;

                    if (direction === 0) {
                        y = selectionData.region.endRect.top;
                    } else {
                        y = selectionData.region.startRect.top;
                    }
                }

                return {
                    direction: direction,
                    x: x,
                    y: y
                };
            },

            /**
             * Returns the position of the Toolbar taking in consideration the
             * {{#crossLink "ToolbarStyles/gutter:attribute"}}{{/crossLink}} attribute.
             *
             * @method _getToolbarXYPoint
             * @protected
             * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
             * @param {Number} right The right offset in page coordinates where Toolbar should be shown.
             * @param {Number} direction The direction of the selection. May be one of the following:
             * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
             * @return {Array} An Array with left and top offsets in page coordinates.
             */
            _getToolbarXYPoint: function(left, top, direction) {
                var bbDOMNode,
                    gutter;

                bbDOMNode = this.get('boundingBox').getDOMNode();

                gutter = this.get('gutter');

                left = left - gutter.left - (bbDOMNode.offsetWidth / 2);

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    top = top + gutter.top;
                } else {
                    top = top - bbDOMNode.offsetHeight - gutter.top;
                }

                return [left, top];
            },

            /**
             * Returns the position of the Toolbar taking in consideration the
             * {{#crossLink "ToolbarStyles/gutter:attribute"}}{{/crossLink}} attribute.
             *
             * @method _getXPoint
             * @protected
             * @param {Object} selectionData The data about the selection in the editor as
             * returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
             * @param {Object} eventX The X coordinate received from the native event (mouseup).
             * @return {Number} The calculated X point in page coordinates.
             */
            _getXPoint: function(selectionData, eventX) {
                var left,
                    leftDist,
                    region,
                    right,
                    rightDist,
                    x;

                region = selectionData.region;

                left = region.startRect ? region.startRect.left : region.left;
                right = region.endRect ? region.endRect.right : region.right;

                if (left < eventX && right > eventX) {
                    x = eventX;
                } else {
                    leftDist = Math.abs(left - eventX);
                    rightDist = Math.abs(right - eventX);

                    if (leftDist < rightDist) { // user raised the mouse on left on the selection
                        x = left;
                    } else {
                        x = right;
                    }
                }

                return x;
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

                } else {
                    this.hide();
                }
            },

            BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-styles alloy-editor-arrow-box"></div>',

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
                 *         'strong': {
                 *             zIndex: 1024,
                 *             property2: 1024
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
                },

                /**
                 * Specifies the gutter of the toolbar. The gutter object contains the top and left
                 * offsets from the point, where the toolbar is supposed to appear.
                 *
                 * @attribute gutter
                 * @default {
                 *   left: 0,
                 *   top: 10
                 * }
                 * @type Object
                 */
                gutter: {
                    validator: Lang.isObject,
                    value: {
                        left: 0,
                        top: 10
                    }
                }
            }
        });

    Y.ToolbarStyles = ToolbarStyles;
}, '', {
    requires: ['toolbar-base', 'widget-base', 'widget-position', 'widget-position-constrain', 'widget-autohide']
});