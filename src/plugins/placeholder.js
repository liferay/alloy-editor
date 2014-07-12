;(function() {
    'use strict';

    CKEDITOR.plugins.add(
        'placeholder',
        {
            init: function(editor) {
                editor.on('blur', this._onBlur, this);
            },

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