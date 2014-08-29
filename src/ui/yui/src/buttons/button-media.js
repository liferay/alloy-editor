YUI.add('button-media', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnMedia = Y.Base.create('media', Y.Plugin.Base, [Y.ButtonBase], {
        _handleMedia: function(event) {

        },

        TPL_CONTENT: '<i class="alloy-editor-icon-media-sign"></i>'
    }, {
        NAME: 'media',

        NS: 'media'
    });

    Y.ButtonMedia = BtnMedia;

}, '', {
    requires: ['button-base']
});