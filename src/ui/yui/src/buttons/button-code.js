YUI.add('button-code', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnCode = Y.Base.create('code', Y.Plugin.Base, [Y.ButtonBase], {
        _handleCode: function(event) {

        },

        TPL_CONTENT: '<i class="alloy-editor-icon-code"></i>'
    }, {
        NAME: 'code',

        NS: 'code'
    });

    Y.ButtonCode = BtnCode;

}, '', {
    requires: ['button-base']
});