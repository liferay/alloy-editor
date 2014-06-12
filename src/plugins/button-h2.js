YUI.add('button-h2', function (Y) {
    var Lang = Y.Lang;

    var H2 = Y.Base.create('h2', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="icon-h2"></i>'
    }, {
        NAME: 'h2',

        NS: 'h2',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'h2'
            }
        }
    });

    Y.ButtonH2 = H2;

},'', {
    requires: ['button-base']
});