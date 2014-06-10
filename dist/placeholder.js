;(function() {
    CKEDITOR.plugins.add(
        'placeholder',
        {
            init: function(editor) {
                this._editor = editor;

                this._attachMouseListener();

                this._attachBlurListener();
            },

            _attachMouseListener: function() {
                var editable = this._editor.editable(this._editor.element.$);

                this._mouseListener = editable.attachListener(editable, 'mousedown', this._onMouseDown, this);
            },

            _attachBlurListener: function() {
                this._editor.on('blur', this._onBlur, this);
            },

            _onBlur: function() {
                this._mouseListener.removeListener('mousedown', this._onMouseDown);

                if (this._editor.getData() === '') {
                    this._editor.setData(this._placeholderVal);

                    this._attachMouseListener();
                }
            },

            _onMouseDown: function() {
                this._placeholderVal = this._editor.getData();

                this._editor.setData('');
            }
        }
    );
}());