YUI.add('button-strong', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var Strong = Y.Base.create('strong', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="icon-bold"></i>'
    }, {
        NAME: 'strong',

        NS: 'strong',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'strong'
            }
        }
    });

    Y.ButtonStrong = Strong;

},'', {
    requires: ['button-base']
});