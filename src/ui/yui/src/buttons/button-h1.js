YUI.add('button-h1', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonH1 class provides functionality for applying HTML heading, level 1
     * to the selection.
     *
     * @class ButtonH1
     */
    var H1 = Y.Base.create('h1', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-h1"></i>'
    }, {
        NAME: 'h1',

        NS: 'h1',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'h1'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'h1'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonH1 provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Heading level 1'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Heading level 1'
                }
            }
        }
    });

    Y.ButtonH1 = H1;

}, '', {
    requires: ['button-base']
});