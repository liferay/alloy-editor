'use strict';

(function () {
    'use strict';

    var _isRangeAtElementEnd = function _isRangeAtElementEnd(range, element) {
        // Finding if a range is at the end of an element is somewhat tricky due to how CKEditor handles
        // ranges. It might depend on wether a source node inside the element is selected or not. For now,
        // we need to cover the following cases:
        //
        // - The text length of the element is the same as the endOffset of the range
        // - Both start and end containers match the element and the start and end offsets are 1

        return element.getText().length === range.endOffset || element.equals(range.startContainer) && element.equals(range.endContainer) && range.startOffset === range.endOffset && range.endOffset === 1;
    };

    var embedSelectionTest = function embedSelectionTest(payload) {
        var selectionData = payload.data.selectionData;

        return !!(selectionData.element && selectionData.element.getAttribute('data-widget') === 'ae_embed');
    };

    var linkSelectionTest = function linkSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');
        var range = nativeEditor.getSelection().getRanges()[0];
        var selectionData = payload.data.selectionData;
        var element = new CKEDITOR.Link(nativeEditor).getFromSelection();
        var isSelectionEmpty = nativeEditor.isSelectionEmpty();
        var elementIsNotImage = selectionData.element ? selectionData.element.getName() !== 'img' : true;

        return !!(isSelectionEmpty && elementIsNotImage && element && element.getText().length !== range.endOffset && element && !element.isReadOnly() && !_isRangeAtElementEnd(range, element));
    };

    var imageSelectionTest = function imageSelectionTest(payload) {
        var selectionData = payload.data.selectionData;

        var selectionEmpty = false;

        if (payload.editor) {
            var nativeEditor = payload.editor._getNativeEditor();

            selectionEmpty = nativeEditor.isSelectionEmpty();
        }

        var isImageWidget = function isImageWidget(element) {
            return element.getAttribute('data-widget') === 'image' || element.getAscendant(function (el) {
                return el.getAttribute('data-widget') === 'image';
            });
        };

        return !!(selectionData.element && selectionData.element.getName() === 'img' && !selectionEmpty && (!selectionData.element.isReadOnly() || isImageWidget(selectionData.element)));
    };

    var textSelectionTest = function textSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var selectionEmpty = nativeEditor.isSelectionEmpty();

        var selectionData = payload.data.selectionData;

        return !!(!selectionData.element && selectionData.region && !selectionEmpty && !nativeEditor.getSelection().getCommonAncestor().isReadOnly());
    };

    var tableSelectionTest = function tableSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var table = new CKEDITOR.Table(nativeEditor);
        var element = table.getFromSelection();

        return !!(element && table.isEditable(element));
    };

    AlloyEditor.SelectionTest = {
        embed: embedSelectionTest,
        image: imageSelectionTest,
        link: linkSelectionTest,
        table: tableSelectionTest,
        text: textSelectionTest
    };
})();