YUI.add('button-code', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnCode = Y.Base.create('code', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-code"></i>',

        /**
         * Updates "pressed" attribute of the button. If the currently selected text
         * is contained inside a <pre> element, "pressed" attribute will be set to true,
         * otherwise, it will be set to false.
         *
         * @method updateUI
         */
        updateUI: function() {
            var editor,
                elementPath;

            editor = this.get('host').get('editor');

            elementPath = editor.elementPath();

            this._button.set('pressed', elementPath.contains('pre'));
        },

        /**
         * Creates a <pre> element around the current selection if
         * current status is pressed, and removes it otherwise.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var btnInst,
                editor,
                parent,
                preElement;

            btnInst = event.target;

            editor = this.get('host').get('editor');

            if (btnInst.get('pressed')) {
               editor.insertHtml( '<pre>' + editor.getSelection().getSelectedText() + '</pre>' );
            }
            else {
                preElement = editor.getSelection().getStartElement();

                parent = preElement.getParent().$;

                parent.replaceChild(document.createTextNode(preElement.getText()), preElement.$);
            }
        }
    }, {
        NAME: 'code',

        NS: 'code',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'code'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'code'
            },

            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonCode provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Code'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Code'
                }
            }
        }
    });

    Y.ButtonCode = BtnCode;

}, '', {
    requires: ['button-base']
});