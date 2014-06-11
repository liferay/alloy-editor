;(function() {
    var REGEX_EOL = /(?:\r?\n)+$/;

    CKEDITOR.plugins.add(
        'placeholder',
        {
            init: function(editor) {
                editor.on('focus', this._onFocus, this);
                editor.on('blur', this._onBlur, this);
            },

            _onBlur: function(event) {
                var editor = event.editor;

                if (editor.getData() === '') {
                    editor.setData(editor.config.placeholderValue);

                    new CKEDITOR.dom.element(editor.element.$).addClass(editor.config.placeholderClass);
                }
            },

            _onFocus: function(event) {
                var config,
                    data,
                    editor,
                    element;

                editor = event.editor;
                config = editor.config;

                if (!config.placeholderValue) {
                    config.placeholderValue = editor.getData();

                    editor.setData('');

                    new CKEDITOR.dom.element(editor.element.$).removeClass(config.placeholderClass);
                }
                else {
                    element = document.createElement('div');

                    element.innerHTML = editor.getData();

                    data = element.innerText || element.textContent;

                    if (data === config.placeholderValue || data.replace(REGEX_EOL, '') === config.placeholderValue) {
                        editor.setData('');

                        new CKEDITOR.dom.element(editor.element.$).removeClass(config.placeholderClass);
                    }
                }
            }
        }
    );
}());