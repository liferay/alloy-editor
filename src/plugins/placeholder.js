;(function() {
    'use strict';

    CKEDITOR.plugins.add(
        'placeholder',
        {
            init: function(editor) {
                editor.on('blur', this._onBlur, this);
            },

            _addPlaceholder: function(editor) {
                var editorNode;

                editorNode = new CKEDITOR.dom.element(editor.element.$);

                editorNode.setHtml('');

                editorNode.addClass(editor.config.placeholderClass);
            },

            _onBlur: function(event) {
                var editor = event.editor;

                if (editor.getData() === '') {
                    this._addPlaceholder(editor);
                }
            }
        }
    );
}());