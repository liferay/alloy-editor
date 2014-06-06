;(function() {
    var isIE = CKEDITOR.env.ie;

    CKEDITOR.plugins.add(
        'dropimages',
        {
            init: function(editor) {
                var editable;

                editable = editor.element.$;

                this._editor = editor;

                editable.addEventListener('dragenter', CKEDITOR.tools.bind(this._onDragEnter, this));
                editable.addEventListener('dragover', CKEDITOR.tools.bind(this._onDragOver, this));
                editable.addEventListener('drop', CKEDITOR.tools.bind(this._onDragDrop, this));
            },

            _handleFiles: function(files) {
                var i,
                    imageType,
                    file;

                for (i = 0; i < files.length; i++) {
                    file = files[i];
                    imageType = /image.*/;

                    if (file.type.match(imageType)) {
                        this._processFile(file);
                    }
                }

                return false;
            },

            _onDragEnter: function(event) {
                if (isIE) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            },

            _onDragOver: function(event) {
                if (isIE) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            },

            _onDragDrop: function(event) {
                event.stopPropagation();
                event.preventDefault();

                this._editor.createSelectionFromPoint(event.clientX, event.clientY);

                this._handleFiles(event.dataTransfer.files);
            },

            _processFile: function(file) {
                var instance = this;

                var reader = new FileReader();

                reader.addEventListener('loadend', function() {
                    var bin,
                        el;

                    bin = reader.result;

                    el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');

                    instance._editor.insertElement(el);

                    CKEDITOR.fire('imagedrop', el);
                });

                reader.readAsDataURL(file);
            }
        }
    );
}());