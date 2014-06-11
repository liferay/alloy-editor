;(function() {
    var isIE = CKEDITOR.env.ie;

    CKEDITOR.plugins.add(
        'dropimages',
        {
            init: function(editor) {
                var editable;

                editable = new CKEDITOR.editable(editor, editor.element.$);

                editable.attachListener(editable, 'dragenter', this._onDragEnter, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'dragover', this._onDragOver, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'drop', this._onDragDrop, this, {
                    editor: editor
                });
            },

            _handleFiles: function(files, editor) {
                var i,
                    imageType,
                    file;

                for (i = 0; i < files.length; i++) {
                    file = files[i];
                    imageType = /image.*/;

                    if (file.type.match(imageType)) {
                        this._processFile(file, editor);
                    }
                }

                return false;
            },

            _onDragEnter: function(event) {
                if (isIE) {
                    event = new CKEDITOR.dom.event(event.data.$);

                    event.preventDefault();
                    event.stopPropagation();
                }
            },

            _onDragOver: function(event) {
                if (isIE) {
                    event = new CKEDITOR.dom.event(event.data.$);

                    event.preventDefault();
                    event.stopPropagation();
                }
            },

            _onDragDrop: function(event) {
                var editor,
                    nativeEvent;

                nativeEvent = event.data.$;

                new CKEDITOR.dom.event(nativeEvent).preventDefault();

                editor = event.listenerData.editor;

                event.listenerData.editor.createSelectionFromPoint(nativeEvent.clientX, nativeEvent.clientY);

                this._handleFiles(nativeEvent.dataTransfer.files, editor);
            },

            _processFile: function(file, editor) {
                var reader = new FileReader();

                reader.addEventListener('loadend', function() {
                    var bin,
                        el;

                    bin = reader.result;

                    el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');

                    editor.insertElement(el);

                    CKEDITOR.fire('imagedrop', el);
                });

                reader.readAsDataURL(file);
            }
        }
    );
}());