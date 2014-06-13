YUI.add('button-em', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var Em = Y.Base.create('em', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="icon-italic"></i>'
    }, {
        NAME: 'em',

        NS: 'em',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'em'
            }
        }
    });

    Y.ButtonEm = Em;

},'', {
    requires: ['button-base']
});