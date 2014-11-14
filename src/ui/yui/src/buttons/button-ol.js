YUI.add('button-ol', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonOl class provides functionality for converting a text selection into a numbered list.
     *
     * @class ButtonOl
     */
    var Ol = Y.Base.create('ol', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-numbered-list"></i>',

        /**
         * Creates a numbered list block around the current selection with the following exceptions:
         * - If the selection is already contained inside a numbered list, it will remove the list
         * block and transform the list items into individual paragraphs.
         * - If the selection is contained inside a bulleted list, it will switch the <ul> tag for an
         * <ol> tag preserving all its items.
         *
         * @method _onClick
         * @protected
         * @param {EventFacade} event Event that triggered when user clicked on the button.
         */
        _onClick: function(event) {
            var editor = this.get('host').get('editor');

            editor.execCommand('numberedlist');
        },

        /**
         * Updates the toggle status of the button. If the selection is contained inside an 'ol' block,
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

            this._button.set('pressed', elementPath.contains('ol'));
        }
    }, {
        NAME: 'ol',

        NS: 'ol',

        ATTRS: {
            /**
             * Collection of strings used to label elements of the button's UI.
             * ButtonOl provides string properties to specify the label of the button.
             *
             * @attribute strings
             * @default {label: 'Numbered List'}
             * @type Object
             */
            strings: {
                validator: Lang.isObject,
                value: {
                    label: 'Numbered List'
                }
            }
        }
    });

    Y.ButtonOl = Ol;

}, '', {
    requires: ['button-base']
});