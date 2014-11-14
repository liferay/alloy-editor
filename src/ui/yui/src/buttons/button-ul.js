YUI.add('button-ul', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonUl class provides functionality for converting a text selection into a bulleted list.
     *
     * @class ButtonUl
     */
    var Ul = Y.Base.create('ul', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-bulleted-list"></i>',

        /**
         * Creates a bulleted list block around the current selection with the following exceptions:
         * - If the selection is already contained inside a bulleted list, it will remove the list
         * block and transform the list items into individual paragraphs.
         * - If the selection is contained inside a numbered list, it will switch the <ol> tag for a
         * <ul> tag preserving all its items.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var editor = this.get('host').get('editor');

            editor.execCommand('bulletedlist');
        },

        /**
         * Updates the toggle status of the button. If the selection is contained inside an 'ul' block,
         * its status will be made active and "pressed" attribute of the button will be
         * set to true, otherwise, it will be set to false.
         *
         * @method updateUI
         */
        updateUI: function() {
            var editor,
                elementPath;

            editor = this.get('host').get('editor');

            elementPath = editor.elementPath();

            this._button.set('pressed', elementPath.contains('ul'));
        }
    }, {
        NAME: 'ul',

        NS: 'ul',

        ATTRS: {
            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonUl provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Bulleted List'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Bulleted List'
                }
            }
        }
    });

    Y.ButtonUl = Ul;

}, '', {
    requires: ['button-base']
});