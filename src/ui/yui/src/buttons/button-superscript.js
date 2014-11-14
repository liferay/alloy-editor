YUI.add('button-superscript', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonStrong class provides functionality for applying superscript style to a text selection.
     *
     * @class ButtonStrong
     */
    var Superscript = Y.Base.create('superscript', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-superscript"></i>',

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

            editor.execCommand('superscript');
        }
    }, {
        NAME: 'superscript',

        NS: 'superscript',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'sup'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'sup'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonStrong provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Superscript'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Superscript'
                }
            }
        }
    });

    Y.ButtonSuperscript = Superscript;

}, '', {
    requires: ['button-base']
});