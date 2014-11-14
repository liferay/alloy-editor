YUI.add('button-subscript', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonStrong class provides functionality for applying subscript style to a text selection.
     *
     * @class ButtonStrong
     */
    var Subscript = Y.Base.create('subscript', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-subscript"></i>',

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

            editor.execCommand('subscript');
        }
    }, {
        NAME: 'subscript',

        NS: 'subscript',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'sub'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'sub'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonStrong provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Subscript'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Subscript'
                }
            }
        }
    });

    Y.ButtonSubscript = Subscript;

}, '', {
    requires: ['button-base']
});