YUI.add('button-quote', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnQuote = Y.Base.create('quote', Y.Plugin.Base, [Y.ButtonBase], {
        _handleQuote: function(event) {

        },

        TPL_CONTENT: '<i class="alloy-editor-icon-quote-sign"></i>'
    }, {
        NAME: 'quote',

        NS: 'quote'
    });

    Y.ButtonQuote = BtnQuote;

}, '', {
    requires: ['button-base']
});