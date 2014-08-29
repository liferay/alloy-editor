YUI.add('button-twitterquote', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnTwitterquote = Y.Base.create('twitterquote', Y.Plugin.Base, [Y.ButtonBase], {
        _handleMedia: function(event) {

        },

        TPL_CONTENT: '<i class="alloy-editor-icon-twitter-sign"></i>'
    }, {
        NAME: 'twitterquote',

        NS: 'twitterquote'
    });

    Y.ButtonTwitterquote = BtnTwitterquote;

}, '', {
    requires: ['button-base']
});