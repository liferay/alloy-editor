YUI.add('toolbar-position', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array;

    function ToolbarPosition() {}

    /**
     * The ToolbarPosition extension provides functionality to position a toolbar
     * based on the current selection and the toolbar contents.
     *
     * @class ToolbarPosition
     */
    ToolbarPosition.prototype = {
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

            if (endRect && startRect && startRect.top === endRect.top) {
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

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    y = selectionData.region.bottom;
                } else {
                    y = selectionData.region.top;
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

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {

                left = left - gutter.left - (bbDOMNode.offsetWidth / 2);
                top = (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) ? (top + gutter.top) : (top - bbDOMNode.offsetHeight - gutter.top);

            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT || direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                left = (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT) ? (left + gutter.left + bbDOMNode.offsetHeight / 2) : (left - 3 * bbDOMNode.offsetHeight / 2 - gutter.left);
                top = top - gutter.top - (bbDOMNode.offsetHeight / 2);

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
        }
    };

    ToolbarPosition.ATTRS = {
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
    };

    Y.ToolbarPosition = ToolbarPosition;

}, '', {
    requires: ['node-base']
});