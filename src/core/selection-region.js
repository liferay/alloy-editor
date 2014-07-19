(function() {
    'use strict';

    if (CKEDITOR.plugins.get('selectionregion')) {
        return;
    }

    CKEDITOR.SELECTION_TOP_TO_BOTTOM = 0;
    CKEDITOR.SELECTION_BOTTOM_TO_TOP = 1;

    /**
     * SelectionRegion utility class which provides metadata about the selection. The metadata may be the start and end
     * rectangles, caret region, etc. **This class is not intended to be used standalone. Its functions will
     * be merged into each editor instance, so the developer may use them directly, without making
     * an instance of this class**. This class will be registered as CKEditor plugin with the name "selectionregion".
     *
     * @class SelectionRegion
     * @constructor
     */
    function SelectionRegion() {}

    SelectionRegion.prototype = {
        constructor: SelectionRegion,

        /**
         * Creates selection from two points in page coordinates.
         *
         * @method createSelectionFromPoint
         * @param {Number} x X point in page coordinates.
         * @param {Number} y Y point in page coordinates.
         */
        createSelectionFromPoint: function(x, y) {
            this.createSelectionFromRange(x, y, x, y);
        },

        /**
         * Creates selection from range. A range contains of two points in page coordinates.
         *
         * @method createSelectionFromRange
         * @param {Number} startX X coordinate of the first point.
         * @param {Number} startY Y coordinate of the first point.
         * @param {Number} endX X coordinate of the second point.
         * @param {Number} endY Y coordinate of the second point.
         */
        createSelectionFromRange: function(startX, startY, endX, endY) {
            var editor,
                end,
                endContainer,
                endOffset,
                endRange,
                range,
                selection,
                start,
                startContainer,
                startOffset;

            editor = this.editor;

            if (typeof document.caretPositionFromPoint == 'function') {
                start = document.caretPositionFromPoint(startX, startY);
                end = document.caretPositionFromPoint(endX, endY);

                startContainer = start.offsetNode;
                endContainer = end.offsetNode;

                startOffset = start.offset;
                endOffset = end.offset;

                range = this.createRange();
            } else if (typeof document.caretRangeFromPoint == 'function') {
                start = document.caretRangeFromPoint(startX, startY);
                end = document.caretRangeFromPoint(endX, endY);

                startContainer = start.startContainer;
                endContainer = end.startContainer;

                startOffset = start.startOffset;
                endOffset = end.startOffset;

                range = this.createRange();
            }

            if (range && document.getSelection) {
                range.setStart(new CKEDITOR.dom.node(startContainer), startOffset);
                range.setEnd(new CKEDITOR.dom.node(endContainer), endOffset);

                this.getSelection().selectRanges([range]);
            } else if (typeof document.body.createTextRange == 'function') {
                selection = this.getSelection();

                selection.unlock();

                range = document.body.createTextRange();
                range.moveToPoint(startX, startY);

                endRange = range.duplicate();
                endRange.moveToPoint(endX, endY);

                range.setEndPoint('EndToEnd', endRange);
                range.select();

                this.getSelection().lock();
            }
        },

        /**
         * Returns the region of the current position of the caret.
         *
         * @method getCaretRegion
         * @return {Object} Returns object with the following properties:
         * - bottom
         * - left
         * - right
         * - top
         */
        getCaretRegion: function() {
            var bookmarkNodeEl,
                bookmarks,
                docScrollX,
                docScrollXY,
                docScrollY,
                region,
                selection;

            selection = this.getSelection();

            bookmarks = selection.createBookmarks();
            bookmarkNodeEl = bookmarks[0].startNode.$;

            bookmarkNodeEl.style.display = 'inline-block';

            region = new CKEDITOR.dom.element(bookmarkNodeEl).getClientRect();

            bookmarkNodeEl.parentNode.removeChild(bookmarkNodeEl);

            docScrollXY = this._getDocScrollXY();
            docScrollX = docScrollXY[0];
            docScrollY = docScrollXY[1];

            return {
                bottom: docScrollY + region.bottom,
                left: docScrollX + region.left,
                right: docScrollX + region.right,
                top: docScrollY + region.top
            };
        },

        /**
         * Returns data for the current selection.
         *
         * @method getSelectionData
         * @return {Object} Returns object with the following data:
         * - element - The currently selected element, if any
         * - text - The selected text
         * - region - The data, returned from {{#crossLink "SelectionRegion/getSelectionRegion:method"}}{{/crossLink}}
         */
        getSelectionData: function() {
            var result,
                selection;

            selection = this.getSelection();

            result = {
                element: selection.getSelectedElement(),
                text: selection.getSelectedText()
            };

            result.region = this.getSelectionRegion(selection);

            return result;
        },

        /**
         * Returns the region of the current selection.
         *
         * @method getSelectionRegion
         * @return {Object} Returns object which is being returned from
         * {{#crossLink "SelectionRegion/getClientRectsRegion:method"}}{{/crossLink}} with three more properties:
         * - direction - the direction of the selection. Can be one of these:
         *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
         *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
         * - height - The height of the selection region
         * - width - The width of the selection region
         */
        getSelectionRegion: function() {
            var direction,
                region;

            direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;

            region = this.getClientRectsRegion();

            region.direction = this._getSelectionDirection();

            region.height = region.bottom - region.top;
            region.width = region.right - region.left;

            return region;
        },

        /**
         * Returns true if the current selection is empty, false otherwise.
         *
         * @method isSelectionEmpty
         * @return {Boolean} Returns true if the current selection is empty, false otherwise.
         */
        isSelectionEmpty: function() {
            var ranges,
                selection = this.getSelection();

            return (selection.getType() === CKEDITOR.SELECTION_NONE) ||
                ((ranges = selection.getRanges()) && ranges.length === 1 && ranges[0].collapsed);
        },

        /**
         * Returns object with data about the [client rectangles](https://developer.mozilla.org/en-US/docs/Web/API/Element.getClientRects) of the selection,
         * normalized across browses. All offsets below are in page coordinates.
         *
         * @method getClientRectsRegion
         * @return {Object} Returns object with the following data:
         * - bottom - bottom offset of all client rectangles
         * - left - left offset of all client rectangles
         * - right - right offset of all client rectangles
         * - top - top offset of all client rectangles
         * - startRect - An Object, which contains the following information:
         *     + bottom - bottom offset
         *     + height - the height of the rectangle
         *     + left - left offset of the selection
         *     + right - right offset of the selection
         *     + top - top offset of the selection
         *     + width - the width of the rectangle
         * - endRect - An Object, which contains the following information:
         *     + bottom - bottom offset
         *     + height - the height of the rectangle
         *     + left - left offset of the selection
         *     + right - right offset of the selection
         *     + top - top offset of the selection
         *     + width - the width of the rectangle
         */
        getClientRectsRegion: function() {
            var bottom,
                clientRects,
                docScrollX,
                docScrollXY,
                docScrollY,
                endRect,
                i,
                item,
                left,
                length,
                nativeSelection,
                range,
                rangeCount,
                region,
                right,
                selection,
                startRect,
                top;

            selection = this.getSelection();
            nativeSelection = selection.getNative();

            if (nativeSelection.createRange) {
                range = nativeSelection.createRange();
                clientRects = range.getClientRects();
            } else {
                rangeCount = nativeSelection.rangeCount;
                clientRects = (nativeSelection.rangeCount > 0) ? nativeSelection.getRangeAt(0).getClientRects() : [];
            }

            bottom = 0;
            left = Infinity;
            right = -Infinity;
            top = Infinity;

            if (clientRects.length === 0) {
                region = this.getCaretRegion();
            } else {
                for (i = 0, length = clientRects.length; i < length; i++) {
                    item = clientRects[i];

                    if (item.left < left) {
                        left = item.left;
                    }

                    if (item.right > right) {
                        right = item.right;
                    }

                    if (item.top < top) {
                        top = item.top;
                    }

                    if (item.bottom > bottom) {
                        bottom = item.bottom;
                    }
                }

                docScrollXY = this._getDocScrollXY();
                docScrollX = docScrollXY[0];
                docScrollY = docScrollXY[1];

                region = {
                    bottom: docScrollY + bottom,
                    left: docScrollX + left,
                    right: docScrollX + right,
                    top: docScrollY + top
                };

                if (clientRects.length) {
                    endRect = clientRects[clientRects.length - 1];
                    startRect = clientRects[0];

                    region.endRect = {
                        bottom: docScrollY + endRect.bottom,
                        height: endRect.height,
                        left: docScrollX + endRect.left,
                        right: docScrollX + endRect.right,
                        top: docScrollY + endRect.top,
                        width: endRect.width
                    };

                    region.startRect = {
                        bottom: docScrollY + startRect.bottom,
                        height: startRect.height,
                        left: docScrollX + startRect.left,
                        right: docScrollX + startRect.right,
                        top: docScrollY + startRect.top,
                        width: startRect.width
                    };
                }
            }

            return region;
        },

        /**
         * Retrieves document scrollX and scrollY in an array.
         *
         * @method _getDocScrollXY
         * @protected
         * @return {Array} Returns an array with two items - document scrollX and scrollY in page coordinates.
         */
        _getDocScrollXY: function() {
            var docBody,
                docDefaultView,
                docElement,
                pageXOffset,
                pageYOffset;

            docBody = document.body;
            docDefaultView = document.defaultView;
            docElement = document.documentElement;

            pageXOffset = (docDefaultView) ? docDefaultView.pageXOffset : 0;
            pageYOffset = (docDefaultView) ? docDefaultView.pageYOffset : 0;

            return [
                Math.max(docElement.scrollLeft, docBody.scrollLeft, pageXOffset),
                Math.max(docElement.scrollTop, docBody.scrollTop, pageYOffset)
            ];
        },

        /**
         * Retrieves the direction of the selection. The direction is from top to bottom or from bottom to top.
         * For IE < 9 it is not possible, so the direction for these browsers will be always CKEDITOR.SELECTION_TOP_TO_BOTTOM.
         *
         * @method _getSelectionDirection
         * @protected
         * @return {Number} Returns a number which represents selection direction. It might be one of these:
         * - CKEDITOR.SELECTION_TOP_TO_BOTTOM;
         * - CKEDITOR.SELECTION_BOTTOM_TO_TOP;
         */
        _getSelectionDirection: function() {
            var anchorNode,
                direction,
                nativeSelection,
                position,
                selection;

            selection = this.getSelection();
            nativeSelection = selection.getNative();

            direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;

            if ((anchorNode = nativeSelection.anchorNode) && anchorNode.compareDocumentPosition) {
                position = anchorNode.compareDocumentPosition(nativeSelection.focusNode);

                if (!position && nativeSelection.anchorOffset > nativeSelection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
                    direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
                }
            }

            return direction;
        }
    };

    CKEDITOR.plugins.add(
        'selectionregion', {
            init: function(editor) {
                var attr,
                    hasOwnProperty;

                hasOwnProperty = Object.prototype.hasOwnProperty;

                for (attr in SelectionRegion.prototype) {
                    if (hasOwnProperty.call(SelectionRegion.prototype, attr) && typeof editor[attr] == 'undefined') {
                        editor[attr] = SelectionRegion.prototype[attr];
                    }
                }
            }
        }
    );
}());