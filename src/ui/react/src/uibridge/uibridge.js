(function() {
    'use strict';

    /**
     * CKEditor plugin that extends CKEDITOR.ui.add function so an add handler can be specified
     * on top of the original ones. It bridges the calls to add components via:
     * - editor.ui.add(name, type, definition)
     *
     * @class CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_uibridge', {
        beforeInit: function(editor) {
            var originalUIAddFn = editor.ui.add;

            editor.ui.add = function(name, type, definition) {
                originalUIAddFn.apply(this, arguments);

                var typeHandler = this._.handlers[type];

                if (typeHandler && typeHandler.add) {
                    typeHandler.add(name, definition);
                }
            };
        }
    });
}());