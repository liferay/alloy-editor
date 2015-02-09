(function () {
    'use strict';

    var Selections = [
        {
            buttons: [global.ButtonLink],
            name: 'link',
            test: function() {

            }
        },
        {
            buttons: [global.ButtonBold, global.ButtonItalic, global.ButtonLink],
            name: 'text',
            test: function(data, editor) {
                var nativeEditor = editor.get('nativeEditor');

                var selectionEmpty = nativeEditor.isSelectionEmpty();

                var selectionData = data.selectionData;

                return (!selectionData.element && selectionData.region && !selectionEmpty);
            }
        }
    ];

    global.Selections = Selections;
}());