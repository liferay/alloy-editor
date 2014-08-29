YUI.add('button-hline', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnHline = Y.Base.create('hline', Y.Plugin.Base, [Y.ButtonBase], {
        _handleMedia: function(event) {

        },

        TPL_CONTENT: '<i class="alloy-editor-icon-hline-sign"></i>'
    }, {
        NAME: 'hline',

        NS: 'hline'
    });

    Y.ButtonHline = BtnHline;

}, '', {
    requires: ['button-base']
});