YUI.add('button-strike', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonStrong class provides functionality for applying strike style to a text selection.
     *
     * @class ButtonStrong
     */
    var Strike = Y.Base.create('strike', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-strike"></i>',

        /**
         * Applies the style of this button if its current status is pressed
         * and removes it otherwise.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var editor = this.get('host').get('editor');

            editor.execCommand('strike');
        }
    }, {
        NAME: 'strike',

        NS: 'strike',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 's'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 's'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonStrong provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Strike'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Strike'
                }
            }
        }
    });

    Y.ButtonStrike = Strike;

}, '', {
    requires: ['button-base']
});