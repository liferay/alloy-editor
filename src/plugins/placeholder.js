(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_placeholder')) {
        return;
    }

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

                if (editor.getData() === '') {
                    var editorNode = new CKEDITOR.dom.element(editor.element.$);

                    // Despite getData() returns empty string, the content still may have
                    // data - an empty paragraph. This breaks the :empty selector in
                    // placeholder's CSS and placeholder does not appear.
                    // For that reason, we will intentionally remove any content from editorNode.
                    editorNode.setHtml('');

                    editorNode.addClass(editor.config.placeholderClass);
                }
            }
        }
    );
}());