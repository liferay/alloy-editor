YUI.add('button-tweet', function (Y) {
    var Lang = Y.Lang;

    var Tweet = Y.Base.create('tweet', Y.Plugin.Base, [Y.ButtonBase], {
        updateUI: function() {
            // this.set('pressed')
            // editor.getSelection().getSelectedText().
        },

    	_onClick: function() {
            var editor;

            editor = this.get('host').get('editor');

            window.open(
                this.get('tweetURL') + editor.getSelection().getSelectedText(),
                this.get('tweetWindowTitle'),
                this.get('tweetWindowProperties')
            );
        },

        TPL_CONTENT: '<i class="icon-twitter"></i>'
    }, {
        NAME: 'tweet',

        NS: 'tweet',

        ATTRS: {
            toggle: {
                validator: Lang.isBoolean,
                value: false,
                writeOnce: 'initOnly'
            },

            tweetWindowProperties: {
                validator: Lang.isString,
                value: 'resizable,status,width=400,height=250'
            },

            tweetURL: {
                validator: Lang.isString,
                value: 'https://twitter.com/intent/tweet?text='
            },

            tweetWindowTitle: {
                validator: Lang.isString,
                value: ''
            }
        }
    });

    Y.ButtonTweet = Tweet;

},'', {
    requires: ['button-base', 'node-event-simulate']
});