YUI.add('button-code', function (Y) {
    var Lang = Y.Lang;

    var BtnCode = Y.Base.create('code', Y.Plugin.Base, [Y.ButtonBase], {
        _handleCode: function(event) {

        },

        TPL_CONTENT: '<i class="icon-code"></i>'
    }, {
        NAME: 'code',

        NS: 'code',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'code'
            },

            toggle: {
                validator: Lang.isBoolean,
                value: false,
                writeOnce: 'initOnly'
            }
        }
    });

    Y.ButtonCode = BtnCode;

},'', {
    requires: ['button-base']
});