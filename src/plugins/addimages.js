(function() {
    'use strict';

    var isIE = CKEDITOR.env.ie;

    if (CKEDITOR.plugins.get('ae_addimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows Drag&Drop of images directly into the editable area. The image will be encoded
     * as Data URI. An event `imageAdd` will be fired with the inserted element into the editable area.
     *
     * @class CKEDITOR.plugins.ae_addimages
     */

    /**
     * Fired when an image is being added to the editor successfully.
     *
     * @event imageAdd
     * @param {CKEDITOR.dom.element} el The created image with src as Data URI
     */

    CKEDITOR.plugins.add(
        'ae_addimages', {
            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'dragenter', 'dragover', 'drop' and `paste` events on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.once('contentDom', function() {
                    var editable = editor.editable();

                    editable.attachListener(editable, 'dragenter', this._onDragEnter, this, {
                        editor: editor
                    });

                    editable.attachListener(editable, 'dragover', this._onDragOver, this, {
                        editor: editor
                    });

                    editable.attachListener(editable, 'drop', this._onDragDrop, this, {
                        editor: editor
                    });

                    editable.attachListener(editable, 'paste', this._onPaste, this, {
                        editor: editor
                    });
                }.bind(this));
            },

            /**
             * Accepts an array of dropped files to the editor. Then, it filters the images and sends them for further
             * processing to {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}}
             *
             * @protected
             * @method _handleFiles
             * @param {Array} files Array of dropped files. Only the images from this list will be processed.
             * @param {Object} editor The current editor instance
             */
            _handleFiles: function(files, editor) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    if (file.type.indexOf('image') === 0) {
                        this._processFile(file, editor);
                    }
                }

                return false;
            },

            /**
             * Handles drag enter event. In case of IE, this function will prevent the event.
             *
             * @protected
             * @method _onDragEnter
             * @param {DOM event} event dragenter event, as received natively from CKEditor
             */
            _onDragEnter: function(event) {
                if (isIE) {
                    this._preventEvent(event);
                }
            },

            /**
             * Handles drag over event. In case of IE, this function will prevent the event.
             *
             * @protected
             * @method _onDragOver
             * @param {DOM event} event dragover event, as received natively from CKEditor
             */
            _onDragOver: function(event) {
                if (isIE) {
                    this._preventEvent(event);
                }
            },

            /**
             * Handles drag drop event. The function will create selection from the current points and
             * will send a list of files to be processed to
             * {{#crossLink "CKEDITOR.plugins.ae_addimages/_handleFiles:method"}}{{/crossLink}}
             *
             * @protected
             * @method _onDragDrop
             * @param {CKEDITOR.dom.event} event dragdrop event, as received natively from CKEditor
             */
            _onDragDrop: function(event) {
                var nativeEvent = event.data.$;

                new CKEDITOR.dom.event(nativeEvent).preventDefault();

                var editor = event.listenerData.editor;

                event.listenerData.editor.createSelectionFromPoint(nativeEvent.clientX, nativeEvent.clientY);

                this._handleFiles(nativeEvent.dataTransfer.files, editor);
            },

            /**
             * Checks if the pasted data is image and passes it to
             * {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}} for processing.
             *
             * @method _onPaste
             * @protected
             * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
             */
            _onPaste: function(event) {
                if (event.data.$.clipboardData) {
                    var pastedData = event.data.$.clipboardData.items[0];

                    if (pastedData.type.indexOf('image') === 0) {
                        var imageFile = pastedData.getAsFile();

                        this._processFile(imageFile, event.listenerData.editor);
                    }
                }
            },

            /**
             * Prevents a native event.
             *
             * @protected
             * @method _preventEvent
             * @param {DOM event} event The event to be prevented.
             */
            _preventEvent: function(event) {
                event = new CKEDITOR.dom.event(event.data.$);

                event.preventDefault();
                event.stopPropagation();
            },

            /**
             * Processes an image file. The function creates an img element and sets as source
             * a Data URI, then fires an 'imageAdd' event via CKEditor's event system.
             *
             * @protected
             * @method _preventEvent
             * @param {DOM event} event The event to be prevented.
             */
            _processFile: function(file, editor) {
                var reader = new FileReader();

                reader.addEventListener('loadend', function() {
                    var bin = reader.result;

                    var el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');

                    editor.insertElement(el);

                    var imageData = {
                        el: el,
                        file: file
                    };

                    editor.fire('imageAdd', imageData);
                });

                reader.readAsDataURL(file);
            }
        }
    );
}());