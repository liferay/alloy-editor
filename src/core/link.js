(function() {
    'use strict';

    var DEFAULT_PROTOCOL = 'http://';

    var REGEX_URI_HAS_PROTOCOL =/\:\/\/|^mailto\:|^\//;

    /**
     * Link class utility. Provides methods for create, delete and update links.
     *
     * @class CKEDITOR.Link
     * @constructor
     * @param {Object} The CKEditor instance.
     */

    function Link(editor) {
        this._editor = editor;
    }

    Link.prototype = {
        constructor: Link,

        /**
         * Create a link with given URI as href.
         *
         * @method create
         * @param {String} URI The URI of the link.
         * @param {Object} attrs A config object with link attributes. These might be arbitrary DOM attributes.
         */
        create: function(URI, attrs) {
            var selection = this._editor.getSelection();

            var range = selection.getRanges()[0];

            if (range.collapsed) {
                var text = new CKEDITOR.dom.text(URI, this._editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

            URI = this._getCompleteURI(URI);

            var linkAttrs = CKEDITOR.tools.merge({
                'data-cke-saved-href': URI,
                href: URI
            }, attrs);

            var style = new CKEDITOR.style({
                attributes: linkAttrs,
                element: 'a'
            });

            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, this._editor);
            range.select();
        },

        /**
         * Retrieves a link from the current selection.
         *
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved link or null if not found.
         */
        getFromSelection: function() {
            var selection = this._editor.getSelection();

            var selectedElement = selection.getSelectedElement();

            if (selectedElement && selectedElement.is('a')) {
                return selectedElement;
            }

            var range = selection.getRanges()[0];

            if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);

                return this._editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }

            return null;
        },

        /**
         * Removes a link from the editor.
         *
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @method remove
         */
        remove: function(link) {
            var editor = this._editor;

            if (link) {
                link.remove(editor);
            } else {
                var style = link || new CKEDITOR.style({
                    alwaysRemoveElement: 1,
                    element: 'a',
                    type: CKEDITOR.STYLE_INLINE
                });

                // 'removeStyle()' removes the style from the editor's current selection.
                //  We need to force the selection to be the whole link element
                //  to remove it properly.

                var selection = editor.getSelection();
                selection.selectElement(selection.getStartElement());

                editor.removeStyle(style);
            }
        },

        /**
         * Updates the href of an already existing link.
         *
         * @param {String} URI The new URI of the link.
         * @param {CKEDITOR.dom.element} link The link element which href should be removed.
         * @method update
         */
        update: function(URI, link) {
            var style = link || this.getFromSelection();

            style.setAttributes({
                'data-cke-saved-href': URI,
                href: URI
            });
        },

        /**
         * Checks if the URI has a protocol. If not, the default
         * protocol 'http://' is added to it.
         *
         * @method _getCompleteURI
         * @param {String} URI The URI of the link.
         * @return {String} the new URI with his protocol.
         */
        _getCompleteURI: function(URI) {
            if (!URI.match(REGEX_URI_HAS_PROTOCOL)) {
                URI = DEFAULT_PROTOCOL + URI;
            }

            return URI;
        }
    };

    CKEDITOR.Link = CKEDITOR.Link || Link;
}());