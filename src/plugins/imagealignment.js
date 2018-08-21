(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_imagealignment')) {
        return;
    }

    /**
     * Enum for supported image alignments
     * @type {Object}
     */
    var IMAGE_ALIGNMENT = {
        CENTER: 'center',
        LEFT: 'left',
        RIGHT: 'right'
    };

    /**
     * Enum values for supported image alignments
     * @type {Array}
     */
    var ALIGN_VALUES = [
        IMAGE_ALIGNMENT.LEFT,
        IMAGE_ALIGNMENT.RIGHT,
        IMAGE_ALIGNMENT.CENTER
    ];

    /**
     * Necessary styles for the center alignment
     * @type {Array.<Object>}
     */
    var CENTERED_IMAGE_STYLE = [{
        name: 'display',
        value: 'block'
    }, {
        name: 'margin-left',
        value: 'auto'
    }, {
        name: 'margin-right',
        value: 'auto'
    }];

    /**
     * Retrieves the alignment value of an image.
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @return {String} The alignment value
     */
    var getImageAlignment = function(image) {
        var imageAlignment = image.getStyle('float');

        if (!imageAlignment || imageAlignment === 'inherit' || imageAlignment === 'none') {
            imageAlignment = image.getAttribute('align');
        }

        if (!imageAlignment) {
            var centeredImage = CENTERED_IMAGE_STYLE.every(function(style) {
                var styleCheck = image.getStyle(style.name) === style.value;

                if (!styleCheck && style.vendorPrefixes) {
                    styleCheck = style.vendorPrefixes.some(function(vendorPrefix) {
                        return image.getStyle(vendorPrefix + style.name) === style.value;
                    });
                }

                return styleCheck;
            });

            imageAlignment = centeredImage ? IMAGE_ALIGNMENT.CENTER : null;
        }

        return imageAlignment;
    };

    /**
     * Removes the alignment value of an image
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @param {String} imageAlignment The image alignment value to be removed
     */
    var removeImageAlignment = function(image, imageAlignment) {
        if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.removeStyle('float');

            if (imageAlignment === getImageAlignment(image)) {
                image.removeAttribute('align');
            }
        } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function(style) {
                image.removeStyle(style.name);

                if (style.vendorPrefixes) {
                    style.vendorPrefixes.forEach(function(vendorPrefix) {
                        image.removeStyle(vendorPrefix + style.name);
                    });
                }
            });
        }
    };

    /**
     * Sets the alignment value of an image
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @param {String} imageAlignment The image alignment value to be set
     */
    var setImageAlignment = function(image, imageAlignment) {
        removeImageAlignment(image, getImageAlignment(image));

        if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.setStyle('float', imageAlignment);
        } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function(style) {
                image.setStyle(style.name, style.value);

                if (style.vendorPrefixes) {
                    style.vendorPrefixes.forEach(function(vendorPrefix) {
                        image.setStyle(vendorPrefix + style.name, style.value);
                    });
                }
            });
        }
    };

    /**
     * CKEditor plugin which modifies the justify commands to properly align images. This
     * plugin is an excerpt of CKEditor's original image one that can be found at
     * https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/image/plugin.js
     *
     * @class CKEDITOR.plugins.ae_imagealignment
     */
    CKEDITOR.plugins.add(
        'ae_imagealignment', {
            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'paste' event on the editing area.
             *
             * @method afterInit
             * @param {Object} editor The current editor instance
             */
            afterInit: function(editor) {
                var self = this;

                ALIGN_VALUES.forEach(function(value) {
                    var command = editor.getCommand('justify' + value);

                    if (command) {
                        command.on('exec', function(event) {
                            var selectionData = editor.getSelectionData();

                            if (selectionData && AlloyEditor.SelectionTest.image({data: {selectionData: selectionData}})) {
                                var image = selectionData.element;

                                var imageAlignment = getImageAlignment(image);

                                if (imageAlignment === value) {
                                    removeImageAlignment(image, value);
                                } else {
                                    setImageAlignment(image, value);
                                }

                                event.cancel();

                                self.refreshCommands(editor, new CKEDITOR.dom.elementPath(image));
                            }
                        });

                        command.on('refresh', function(event) {
                            var selectionData = {
                                element: event.data.path.lastElement
                            };

                            if (AlloyEditor.SelectionTest.image({data: {selectionData: selectionData}})) {
                                var imageAlignment = getImageAlignment(selectionData.element);

                                this.setState(imageAlignment === value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);

                                event.cancel();
                            }
                        });
                    }
                });
            },

            /**
             * Forces a refresh of the modified justify commands. This is needed because the applied changes
             * do not modify the selection, so the refresh is never triggered and the UI does not update
             * properly until the next selectionChange event.
             *
             * @param {CKEDITOR.editor} editor The editor instance
             * @param {CKEDITOR.dom.elementPath} elementPath The path of the selected image
             */
            refreshCommands: function(editor, elementPath) {
                ALIGN_VALUES.forEach(function(value) {
                    var command = editor.getCommand('justify' + value);

                    if (command) {
                        command.refresh(editor, elementPath);
                    }
                });
            }
        }
    );
}());