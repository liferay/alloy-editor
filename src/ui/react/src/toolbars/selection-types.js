(function () {
    'use strict';

    var SelectionTypes = [
        {
            buttons: [global.ButtonLink],
            name: 'link',
            test: function() {

            }
        },

        {
            buttons: [global.ButtonBold, global.ButtonItalic, global.ButtonLink],
            name: 'text',
            test: function() {

            }
        }
    ];

    global.SelectionTypes = SelectionTypes;
}());