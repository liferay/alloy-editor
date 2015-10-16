(function() {
    'use strict';

    var linkSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor'),
            element;

        return !!(
            !nativeEditor.isSelectionEmpty() &&
            (element = (new CKEDITOR.Link(nativeEditor)).getFromSelection()) &&
            !element.isReadOnly()
        );
    };

    var imageSelectionTest = function(payload) {
        var selectionData = payload.data.selectionData;

        return !!(
            selectionData.element &&
            selectionData.element.getName() === 'img' &&
            !selectionData.element.isReadOnly()
        );
    };

    var textSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var selectionEmpty = nativeEditor.isSelectionEmpty();

        var selectionData = payload.data.selectionData;

        return !!(
            !selectionData.element &&
            selectionData.region &&
            !selectionEmpty &&
            !nativeEditor.getSelection().getCommonAncestor().isReadOnly()
        );
    };

    var tableSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor'),
            table = new CKEDITOR.Table(nativeEditor),
            element = table.getFromSelection();

        return !!(element && table.isEditable(element));
    };

    AlloyEditor.SelectionTest = {
        image: imageSelectionTest,
        link: linkSelectionTest,
        table: tableSelectionTest,
        text: textSelectionTest
    };
}());
