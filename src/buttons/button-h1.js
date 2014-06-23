YUI.add('button-h1', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var H1 = Y.Base.create('h1', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="icon-h1">H1</i>'
    }, {
        NAME: 'h1',

        NS: 'h1',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'h1'
            }
        }
    });

    Y.ButtonH1 = H1;

},'', {
    requires: ['button-base']
});