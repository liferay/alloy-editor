YUI.add('button-h2', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonH2 class provides functionality for applying HTML heading, level 2
     * to the selection.
     *
     * @class ButtonH2
     */
    var H2 = Y.Base.create('h2', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-h2"></i>'
    }, {
        NAME: 'h2',

        NS: 'h2',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'h2'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'h2'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonH2 provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Heading level 2'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Heading level 2'
                }
            }
        }
    });

    Y.ButtonH2 = H2;

}, '', {
    requires: ['button-base']
});