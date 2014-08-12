YUI.add('button-twitter', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonTwitter class provides functionality for sending tweets based on the selected text.
     *
     * @class ButtonTwitter
     */
    var Tweet = Y.Base.create('tweet', Y.Plugin.Base, [Y.ButtonBase], {
        /**
         * Overwrites the default behaviour of ButtonBase's
         * {{#crossLink "ButtonBase/updateUI:method"}}{{/crossLink}} method since
         * this button does is not toggleable.
         *
         * @method updateUI
         */
        updateUI: function() {
            // NOP
        },

        /**
         * Reads the selected text from the editor and opens a browser window so the
         * user will be able to tweet directly the text.
         *
         * @method _onClick
         * @protected
         */
        _onClick: function() {
            var editor,
                tweetURL;

            tweetURL = this.get('tweetURL');

            editor = this.get('host').get('editor');

            tweetURL = Lang.sub(tweetURL, {
                text: encodeURIComponent(editor.getSelection().getSelectedText()),
                url: encodeURIComponent(Y.config.win.location)
            });

            window.open(
                tweetURL,
                this.get('windowTitle'),
                this.get('windowProperties')
            );
        },

        TPL_CONTENT: '<i class="alloy-editor-icon-twitter"></i>'
    }, {
        NAME: 'tweet',

        NS: 'tweet',

        ATTRS: {
            /**
             * Specifies if the button is toggleable, or not. ButtonTwitter will be not toggleable by default.
             *
             * @attribute toggle
             * @default false
             * @type Boolean
             * @writeOnce 'initOnly'
             */
            toggle: {
                validator: Lang.isBoolean,
                value: false,
                writeOnce: 'initOnly'
            },

            /**
             * Specifies the URL where user can tweet the selected text.
             *
             * @attribute tweetURL
             * @default 'https://twitter.com/intent/tweet?text={text}&url={url}'
             * @type String
             */
            tweetURL: {
                validator: Lang.isString,
                value: 'https://twitter.com/intent/tweet?text={text}&url={url}'
            },

            /**
             * Specifies the properties of the browser window where the selected text
             * will appear.
             *
             * @attribute windowProperties
             * @default 'resizable,status,width=400,height=250'
             * @type String
             */
            windowProperties: {
                validator: Lang.isString,
                value: 'resizable,status,width=400,height=250'
            },

            /**
             * Specifies the title of the browser window where the selected text
             * will appear.
             *
             * @attribute windowTitle
             * @default ''
             * @type String
             */
            windowTitle: {
                validator: Lang.isString,
                value: ''
            }
        }
    });

    Y.ButtonTwitter = Tweet;

}, '', {
    requires: ['button-base']
});