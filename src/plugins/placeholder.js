(function() {
    'use strict';

    if (CKEDITOR.plugins.get('placeholder')) {
        return;
    }

    /**
     * CKEditor plugin which allows adding a placeholder to the editor. In this case, if there
     * is no content to the editor, there will be hint to the user.
     *
     * @class CKEDITOR.plugins.placeholder
     */

    /**
     * Specifies the placeholder class which have to be aded to editor when editor is not focuced.
     *
     * @attribute placeholderClass
     * @default alloy-editor-placeholder
     * @type String
     */

    CKEDITOR.plugins.add(
        'placeholder', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'blur' listener to CKEditor's blur event.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.on('blur', this._onBlur, this);
            },

            /**
             * Handles the fired blur event. The function removes any data from CKEditor, because an
             * empty paragraph may still exist despite for the user the editor looks empty and
             * adds a class, specified via "placeholderClass" config attribute.
             *
             * @method init
             * @protected
             * @param {CKEDITOR.dom.event} editor Blur event, fired from CKEditor
             */
            _onBlur: function(event) {
                var editor,
                    editorNode;

                editor = event.editor;

                if (editor.getData() === '') {
                    editorNode = new CKEDITOR.dom.element(editor.element.$);

                    // Despite getData() returns empty string, the content still may have
                    // content - an empty paragrapgh. This prevents :empty selector in
                    // placeholder's CSS and placeholder does not appear.
                    // For that reason we will intentionally remove any content from editorNode.
                    editorNode.setHtml('');

                    editorNode.addClass(editor.config.placeholderClass);
                }
            }
        }
    );
}());