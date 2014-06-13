YUI.add('button-twitter', function (Y) {
    var Lang = Y.Lang;

    var Tweet = Y.Base.create('tweet', Y.Plugin.Base, [Y.ButtonBase], {
        updateUI: function() {
            // NOP
        },

    	_onClick: function() {
            var editor;

            editor = this.get('host').get('editor');

            window.open(
                this.get('tweetURL') + encodeURIComponent(editor.getSelection().getSelectedText()),
                this.get('windowTitle'),
                this.get('windowProperties')
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

            tweetURL: {
                validator: Lang.isString,
                value: 'https://twitter.com/intent/tweet?text='
            },

            windowProperties: {
                validator: Lang.isString,
                value: 'resizable,status,width=400,height=250'
            },

            windowTitle: {
                validator: Lang.isString,
                value: ''
            }
        }
    });

    Y.ButtonTwitter = Tweet;

},'', {
    requires: ['button-base', 'node-event-simulate']
});