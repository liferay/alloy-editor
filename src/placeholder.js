;(function() {
    CKEDITOR.plugins.add(
        'placeholder',
        {
            init: function(editor) {
                editor.on('focus', this._onFocus, this);
                editor.on('blur', this._onBlur, this);

                this._editor = editor;
            },

            _onBlur: function() {
                if (this._editor.getData() === '') {
                    this._editor.setData(this._placeholderVal);
                }
            },

            _onFocus: function() {
                if (typeof this._placeholderVal == 'undefined') {
                    this._placeholderVal = this._editor.getData();

                    this._editor.setData('');
                }
                else if (this._editor.getData() === this._placeholderVal) {
                    this._editor.setData('');
                }
            }
        }
    );
}());