YUI.add('button-u', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var Underline = Y.Base.create('underline', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="icon-underline"></i>'
    }, {
        NAME: 'underline',

        NS: 'underline',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'u'
            }
        }
    });

    Y.ButtonU = Underline;

},'', {
    requires: ['button-base']
});