YUI.add('button-hline', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnHline = Y.Base.create('hline', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-hline-sign"></i>',

        /**
         * Inserts a horizontal line after the current selection.
         *
         * @method _onClick
         * protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var editor = this.get('host').get('editor');

            editor.execCommand('horizontalrule');
        }
    }, {
        NAME: 'hline',

        NS: 'hline'
    });

    Y.ButtonHline = BtnHline;

}, '', {
    requires: ['button-base']
});