(function() {
    'use strict';

    var linkSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        return !nativeEditor.isSelectionEmpty() && (new CKEDITOR.Link(nativeEditor).getFromSelection());
    };

    var imageSelectionTest = function(payload) {
        var selectionData = payload.data.selectionData;

        return (selectionData.element && selectionData.element.getName() === 'img');
    };

    var textSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var selectionEmpty = nativeEditor.isSelectionEmpty();

        var selectionData = payload.data.selectionData;

        return (!selectionData.element && selectionData.region && !selectionEmpty);
    };

    var tableSelectionTest = function(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        return !!(new CKEDITOR.Table(nativeEditor).getFromSelection());
    };

    AlloyEditor.SelectionTest = {
        image: imageSelectionTest,
        link: linkSelectionTest,
        table: tableSelectionTest,
        text: textSelectionTest
    };
}());