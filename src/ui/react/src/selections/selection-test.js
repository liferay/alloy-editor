(function() {
    'use strict';

    var linkSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor'),
            element = (new CKEDITOR.Link(nativeEditor)).getFromSelection();

        return !!(
            !nativeEditor.isSelectionEmpty() &&
            element &&
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
        var selectionElement = nativeEditor.getSelection().getCommonAncestor();
        var selectionData = payload.data.selectionData;

        return !!(
            !selectionData.element &&
            selectionData.region &&
            !selectionEmpty &&
            !selectionElement.isReadOnly()
        );
    };

    var tableSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor'),
            element = (new CKEDITOR.Table(nativeEditor)).getFromSelection();

        return !!(element && !element.isReadOnly());
    };

    AlloyEditor.SelectionTest = {
        image: imageSelectionTest,
        link: linkSelectionTest,
        table: tableSelectionTest,
        text: textSelectionTest
    };
}());
