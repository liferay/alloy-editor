;(function() {
    'use strict';

    var REGEX_EOL = /(?:\r?\n\s*)+$/;

    CKEDITOR.plugins.add(
        'placeholder',
        {
            init: function(editor) {
                editor.on('focus', this._onFocus, this);
                editor.on('blur', this._onBlur, this);
            },

            _addPlaceholder: function(editor) {
                var editorNode,
                    placeholder;

                editorNode = new CKEDITOR.dom.element(editor.element.$);

                placeholder = editor.config.placeholderValue || editorNode.getAttribute('data-placeholder');

                editor.setData(placeholder);

                editorNode.addClass(editor.config.placeholderClass);
            },

            _onBlur: function(event) {
                var editor = event.editor;

                if (editor.getData() === '') {
                    this._addPlaceholder(editor);
                }
            },

            _onFocus: function(event) {
                var config,
                    data,
                    editor,
                    editorNode,
                    element,
                    placeholder;

                editor = event.editor;
                config = editor.config;

                data = editor.getData();

                placeholder = config.placeholderValue || new CKEDITOR.dom.element(editor.element.$).getAttribute('data-placeholder');

                if (!placeholder) {
                    config.placeholderValue = editor.getData();

                    this._removePlaceholder(editor);
                }
                else if (data === placeholder) {
                    this._removePlaceholder(editor);
                }
                else {
                    element = document.createElement('div');

                    element.innerHTML = data;

                    data = element.innerText || element.textContent;

                    if (data === placeholder || data.replace(REGEX_EOL, '') === placeholder) {
                        this._removePlaceholder(editor);
                    }
                }
            },

            _removePlaceholder: function(editor) {
                editor.setData('');

                new CKEDITOR.dom.element(editor.element.$).removeClass(editor.config.placeholderClass);
            }
        }
    );
}());