YUI.add('button-em', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonEm class provides functionality for applying "em" (emphasize, italic) style
     * to the selection.
     *
     * @class ButtonEm
     */
    var Em = Y.Base.create('em', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-italic"></i>',

        /**
         * Applies the style of the button if its current status is pressed
         * and removes it otherwise.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var editor = this.get('host').get('editor');

            editor.execCommand('italic');
        }
    }, {
        NAME: 'em',

        NS: 'em',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'em'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'em'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonEm provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Italic'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Italic'
                }
            }
        }
    });

    Y.ButtonEm = Em;

}, '', {
    requires: ['button-base']
});