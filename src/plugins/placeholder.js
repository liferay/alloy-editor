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
                editor.setData(editor.config.placeholderValue);

                new CKEDITOR.dom.element(editor.element.$).addClass(editor.config.placeholderClass);
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
                    element;

                editor = event.editor;
                config = editor.config;

                data = editor.getData();

                if (!config.placeholderValue) {
                    config.placeholderValue = editor.getData();

                    this._removePlaceholder(editor);
                }
                else if (data === config.placeholderValue) {
                    this._removePlaceholder(editor);
                }
                else {
                    element = document.createElement('div');

                    element.innerHTML = data;

                    data = element.innerText || element.textContent;

                    if (data === config.placeholderValue || data.replace(REGEX_EOL, '') === config.placeholderValue) {
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