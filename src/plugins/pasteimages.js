(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_pasteimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows pasting images directly into the editable area. The image will be encoded
     * as Data URI. An event `imageAdd` will be fired with the inserted element into the editable area.
     *
     * @class CKEDITOR.plugins.ae_pasteimages
     */

    /**
     * Fired when an image is being added to the editor successfully.
     *
     * @event imageAdd
     * @param {CKEDITOR.dom.element} el The created image with src as Data URI
     */

    CKEDITOR.plugins.add(
        'ae_pasteimages', {
            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'paste' event on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.once('contentDom', function() {
                    var editable = editor.editable();

                    editable.attachListener(editable, 'paste', this._onPaste, this, {
                        editor: editor
                    });
                }.bind(this));
            },

            /**
             * The function creates an img element with src the image data as Data URI.
             * Then, it fires an 'imageAdd' event via CKEditor's event system. The passed
             * params will be:
             * - `el` - the created img element
             * - `file` - the original pasted data
             *
             * @method _onPaste
             * @protected
             * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
             */
            _onPaste: function(event) {
                if (event.data.$.clipboardData) {
                    var pastedData = event.data.$.clipboardData.items[0];
                    var editor = event.listenerData.editor;

                    if (pastedData.type.indexOf('image') === 0) {
                        var reader = new FileReader();
                        var imageFile = pastedData.getAsFile();

                        reader.onload = function(event) {
                            var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                            editor.insertElement(el);

                            var imageData = {
                                el: el,
                                file: imageFile
                            };

                            editor.fire('imageAdd', imageData);
                        }.bind(this);

                        reader.readAsDataURL(imageFile);
                    }
                }
            }
        }
    );
}());