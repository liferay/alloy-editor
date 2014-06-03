;(function() {
    var CKDOMElement = CKEDITOR.dom.element;

	function SelectionRegion() {}

SelectionRegion.prototype = {
    createSelectionFromPoint: function(editor, x, y) {
        this.createSelectionFromRange(editor, x, y, x, y);
    },

    createSelectionFromRange: function(editor, startX, startY, endX, endY) {
        var end,
            endContainer,
            endOffset,
            range,
            start,
            startContainer,
            startOffset;

        if (typeof document.caretPositionFromPoint == 'function') {
            start = document.caretPositionFromPoint(startX, startY);
            end = document.caretPositionFromPoint(endX, endY);

            startContainer = start.offsetNode;
            endContainer = end.offsetNode;

            startOffset = start.offset;
            endOffset = end.offset;

            range = editor.createRange();
        }
        else if (typeof document.caretRangeFromPoint == 'function') {
            start = document.caretRangeFromPoint(startX, startY);
            end = document.caretRangeFromPoint(endX, endY);

            startContainer = start.startContainer;
            endContainer = end.startContainer;

            startOffset = start.startOffset;
            endOffset = end.startOffset;

            range = editor.createRange();
        }

        if (range && document.getSelection) {
            range.setStart(new CKEDITOR.dom.node(startContainer), startOffset);
            range.setEnd(new CKEDITOR.dom.node(endContainer), endOffset);

            editor.getSelection().selectRanges([range]);
        }
        else if (typeof document.body.createTextRange == 'function') {
            var sel = editor.getSelection();

            sel.unlock();

            range = document.body.createTextRange();
            range.moveToPoint(startX, startY);

            var endRange = range.duplicate();
            endRange.moveToPoint(endX, endY);

            range.setEndPoint('EndToEnd', endRange);
            range.select();

            editor.getSelection().lock();
        }
    },

    getCaretRegion: function(editor) {
        var bookmarkNodeEl,
            bookmarks,
            docScrollX,
            docScrollXY,
            docScrollY,
            region,
            selection;

        if (this.isSelectionEmpty(editor)) {
            selection = editor.getSelection();

            bookmarks = selection.createBookmarks();
            bookmarkNodeEl = bookmarks[0].startNode.$;

            bookmarkNodeEl.style.display = 'inline-block';

            region = new CKDOMElement(bookmarkNodeEl).getClientRect();

            bookmarkNodeEl.parentNode.removeChild(bookmarkNodeEl);

            docScrollXY = this._getDocScrollXY();
            docScrollX = docScrollXY[0];
            docScrollY = docScrollXY[1];

            region = {
                bottom: docScrollY + region.bottom,
                left: docScrollX + region.left,
                right: docScrollX + region.right,
                top: docScrollY + region.top
            };
        }
        else {
            region = this.getSelectionRegion(editor);
        }

        return region;
    },

    getCaretXY: function(editor) {
        var region;

        region = this.getCaretRegion(editor);

        return [
            region.left,
            region.top
        ];
    },

    getSelectionData: function(editor) {
        var result,
            selection;

        selection = editor.getSelection();

        result = {
            element: selection.getSelectedElement(),
            text: selection.getSelectedText()
        };

        result.region = this.getSelectionRegion(selection);

        return result;
    },

    getSelectionRegion: function(editor) {
        var direction,
            region;

        direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;

        if (this.isSelectionEmpty(editor)) {
            region = this.getCaretRegion(editor);
        }
        else {
            region = this.getClientRectsRegion(editor);
        }

        region.direction = this._getSelectionDirection(editor);

        region.height = region.bottom - region.top;
        region.width = region.right - region.left;

        return region;
    },

    isSelectionEmpty: function(editor) {
        var ranges,
            selection = editor.getSelection();

        return (selection.getType() === CKEDITOR.SELECTION_NONE) ||
            ((ranges = selection.getRanges()) && ranges.length === 1 && ranges[0].collapsed);
    },

    getClientRectsRegion: function(editor) {
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

        selection = editor.getSelection();
        nativeSelection = selection.getNative();

        if (nativeSelection.createRange) {
            range = nativeSelection.createRange();
            clientRects = range.getClientRects();
        }
        else {
            rangeCount = nativeSelection.rangeCount;
            clientRects = nativeSelection.getRangeAt(0).getClientRects();
        }

        bottom = 0;
        left = Infinity;
        right = -Infinity;
        top = Infinity;

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

        docScrollXY = this.getDocScrollXY();
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

        return region;
    },

    _getDocScrollXY: function() {
        var docBody,
            docDefaultView,
            docElement,
            pageXOffset,
            pageYOffset;

        docBody = document.body;
        docDefaultView = document.defaultView;
        docElement = document.documentElement;

        pageXOffset = (docDefaultView) ? docDefaultView.pageYOffset : 0;
        pageYOffset = (docDefaultView) ? docDefaultView.pageXOffset : 0;

        return [
            Math.max(docElement.scrollLeft, docBody.scrollLeft, pageXOffset),
            Math.max(docElement.scrollTop, docBody.scrollTop, pageYOffset)
        ];
    },

    _getSelectionDirection: function(editor) {
        var anchorNode,
            direction,
            nativeSelection,
            position,
            selection;

        selection = editor.getSelection();
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

	CKEDITOR.SELECTION_TOP_TO_BOTTOM = 0;
    CKEDITOR.SELECTION_BOTTOM_TO_TOP = 1;

    CKEDITOR.plugins.add(
        'selectionregion',
        {
            init: function(editor) {
                debugger;
                var hasOwnProperty = Object.prototype.hasOwnProperty;

                for (var attr in SelectionRegion) {
                    if (hasOwnProperty.call(SelectionRegion, attr) && typeof editor[attr] == 'undefined') {
                        editor[attr] = SelectionRegion[attr];
                    }
                }
            }
        }
    );
})();