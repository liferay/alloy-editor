YUI.add('button-quote', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnQuote = Y.Base.create('quote', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-quote"></i>',

        /**
         * Applies the style of this button if its current status is pressed
         * and removes it otherwise.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function() {
            var editor = this.get('host').get('editor');

            editor.execCommand('blockquote');
        }
    }, {
        NAME: 'quote',

        NS: 'quote',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'blockquote'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'blockquote'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonQuote provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Quote'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Quote'
                }
            }
        }
    });

    Y.ButtonQuote = BtnQuote;

}, '', {
    requires: ['button-base']
});