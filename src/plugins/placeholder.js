(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_placeholder')) {
        return;
    }


    /**
     * CKEDITOR enterMode config set the behaviour of paragrahps
     * When the content is empty CKEDITOR keeps the enterMode string
     * into the content
     */

    var needsBrFiller = CKEDITOR.env.needsBrFiller ? '<br>' : '';

    var enterModeString = {
        1: ['<p>' + needsBrFiller + '</p>'],
        2: ['', ' ', needsBrFiller],
        3: ['<div>' + needsBrFiller + '</div>']
    };

    /**
     * CKEditor plugin which allows adding a placeholder to the editor. In this case, if there
     * is no content to the editor, there will be hint to the user.
     *
     * @class CKEDITOR.plugins.ae_placeholder
     */

    /**
     * Specifies the placeholder class which have to be aded to editor when editor is not focuced.
     *
     * @attribute placeholderClass
     * @default ae_placeholder
     * @type String
     */

    CKEDITOR.plugins.add(
        'ae_placeholder', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'blur' and 'contentDom' event listeners.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.on('blur', this._checkEmptyData, this);
                editor.on('change', this._checkEmptyData, this);
                editor.on('focus', this._removePlaceholderClass, this);
                editor.once('contentDom', this._checkEmptyData, this);
            },

            /**
             * Removes any data from the content and adds a class,
             * specified by the "placeholderClass" config attribute.
             *
             * @protected
             * @method _checkEmptyData
             * @param {CKEDITOR.dom.event} editor event, fired from CKEditor
             */
            _checkEmptyData: function(event) {
                var editor = event.editor;

                var editableNode = editor.editable();

                var enterMode = editor.config.enterMode;

                var innerHtml = editableNode.$.innerHTML.trim();

                var enterModeStrings = enterModeString[enterMode];

                var empty = false;

                var count = 0;

                while (!empty && count < enterModeStrings.length) {
                    empty = innerHtml === enterModeStrings[count];
                    count++;
                }

                if (empty) {
                    editableNode.addClass(editor.config.placeholderClass);
                } else {
                    editableNode.removeClass(editor.config.placeholderClass);
                }
            },

            /**
             * Remove placeholder class when input is focused
             *
             * @protected
             * @method _removePlaceholderClass
             + @param {CKEDITOR.dom.event} editor event, fired from CKEditor
             */
            _removePlaceholderClass: function(event) {
                var editor = event.editor;

                var editorNode = new CKEDITOR.dom.element(editor.element.$);

                editorNode.removeClass(editor.config.placeholderClass);
            }
        }
    );
}());