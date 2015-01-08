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
         * Initializer lifecycle implementation for the ButtonTwitter class.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var dataType,
                editor;

            dataType = this.get('dataType');

            editor = this.get('host').get('editor');

            this._ckLink = new CKEDITOR.Link(editor);
        },

        /**
         * Overwrites the default implementation from {{#crossLink "ButtonBase/updateUI:method"}}{{/crossLink}}.
         * The button updates its "pressed" attribute and changes the UI accordingly to the presence or lack of
         * link style and class of the selection.
         *
         * @method updateUI
         */
        updateUI: function() {
            var dataType,
                editor,
                elementPath,
                result;

            editor = this.get('host').get('editor');

            elementPath = editor.elementPath();

            result = this._style.checkActive(elementPath, editor);

            dataType = elementPath.lastElement.data('type');

            this._button.set('pressed', !!result && (dataType === this.get('dataType')));
        },

        /**
         * Reads the selected text from the editor and opens a browser window so the
         * user will be able to tweet directly the text.
         *
         * @method _onClick
         * @param {EventFacade} event An Event Facade object
         * @protected
         */
        _onClick: function(event) {
            var btnInst,
                editor,
                tooltip,
                tweetAuthor,
                tweetLink,
                tweetMessage,
                tweetURL;

            btnInst = event.target;

            editor = this.get('host').get('editor');

            if (btnInst.get('pressed')) {
                tweetMessage = '"' + editor.getSelection().getSelectedText() + '"';

                tweetLink = this.get('tweetLink');

                tweetURL = this.get('tweetURL');

                tweetURL = Lang.sub(
                    tweetURL, {
                        text: encodeURIComponent(tweetMessage),
                        url: encodeURIComponent(tweetLink)
                    }
                );

                tweetAuthor = this.get('tweetAuthor');

                if (tweetAuthor) {
                    tweetURL += Lang.sub(
                        this.get('tweetURLVia'), {
                            via: tweetAuthor
                        }
                    );
                }

                tooltip = Lang.sub(
                    this.TPL_TOOLTIP, {
                        text: tweetMessage,
                        url: tweetLink,
                        via: tweetAuthor ? 'via @' + tweetAuthor : ''
                    }
                );

                this._ckLink.create(tweetURL, {
                    'class': 'alloy-editor-twitter-link',
                    'data-cke-tooltip': tooltip,
                    'data-type': this.get('dataType'),
                    'target': '_blank'
                });
            }
            else {
                this._ckLink.remove();
            }
        },

        TPL_CONTENT: '<i class="alloy-editor-icon-twitter"></i>',

        TPL_TOOLTIP: '{text} {url} {via}'
    }, {
        ATTRS: {
            /**
             * Specifies the value of data-type attribute
             * that twitter link will have.
             *
             * @attribute dataType
             * @default 'twitter-link'
             * @type String
             */
            dataType: {
                validator: Lang.isString,
                value: 'twitter-link'
            },

            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'a'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'a'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonTwitter provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Tweet'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Tweet'
                }
            },

            /**
             * Specifies the @via value that will be added to the tweet message
             *
             * @attribute tweetAuthor
             * @default ''
             * @type String
             */
            tweetAuthor: {
                validator: Lang.isString,
                value: ''
            },

            /**
             * Specifies the link that will be added to the tweet text.
             * If it is not a valid url, it will not appear in the tweet
             * message, just in 'href' attribute.
             *
             * @attribute tweetLink
             * @default ''
             * @type String
             */
            tweetLink: {
                validator: Lang.isString,
                value: ''
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
             * Specifies the "via" parameter that can be added to the tweet.
             * It must be appended to the tweetURL only if it is not empty.
             *
             * @attribute tweetURLVia
             * @default '&via={via}'
             * @type String
             */
            tweetURLVia: {
                validator: Lang.isString,
                value: '&via={via}'
            }
        },

        NAME: 'tweet',

        NS: 'tweet'
    });

    Y.ButtonTwitter = Tweet;

}, '', {
    requires: ['button-base']
});