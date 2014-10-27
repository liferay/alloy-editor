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
        TPL_CONTENT: '<i class="alloy-editor-icon-italic"></i>'
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