YUI.add('button-right', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonRight class provides functionality for changing the alignment of an image.
     *
     * @class ButtonRight
     */
    var Right = Y.Base.create('right', Y.Plugin.Base, [Y.ButtonBase], {
        /**
         * Updates "pressed" attribute of the button. If the currently selected element
         * is an image and this image is explicitly right aligned,
         * "pressed" attribute will be set to true, otherwise - to false.
         *
         * @method updateUI
         */
        updateUI: function() {
            var editor,
                element,
                styleFloat;

            editor = this.get('host').get('editor');

            element = editor.getSelection().getSelectedElement();

            if (element && element.getName() === 'img') {
                styleFloat = element.getStyle('float');

                this._button.set('pressed', styleFloat === 'right');
            }
        },

        /**
         * Handles the click event. If the current status of button is "pressed",
         * applies "float: right" style to the image and removes "float" style otherwise.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var instance = this,
                btnInst,
                editor,
                element;

            btnInst = event.target;

            editor = instance.get('host').get('editor');

            element = editor.getSelection().getSelectedElement();

            if (btnInst.get('pressed')) {
                element.setStyle('float', 'right');
            } else {
                element.removeStyle('float');
            }
        },

        TPL_CONTENT: '<i class="alloy-editor-icon-align-right"></i>'
    }, {
        NAME: 'right',

        NS: 'right',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'right'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'right'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonRight provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Align right'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Align right'
                }
            }
        }
    });

    Y.ButtonRight = Right;

}, '', {
    requires: ['button-base']
});