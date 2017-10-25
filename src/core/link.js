(function() {
    'use strict';

    var REGEX_BOOKMARK_SCHEME = /^#.*/i;
    var REGEX_EMAIL_SCHEME = /^[a-z0-9\u0430-\u044F\._-]+@/i;
    var REGEX_URI_SCHEME = /^(?:[a-z][a-z0-9+\-.]*)\:|^\//i;

    /**
     * Link class utility. Provides methods for create, delete and update links.
     *
     * @class CKEDITOR.Link
     * @constructor
     * @param {Object} editor The CKEditor instance.
     */
    function Link(editor, config) {
        this._editor = editor;
        this.appendProtocol = config && config.appendProtocol === false ? false : true;
    }

    Link.prototype = {
        constructor: Link,

        /**
         * Advances the editor selection to the next available position after a
         * given link or the one in the current selection.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method advanceSelection
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         */
        advanceSelection: function(link) {
            link = link || this.getFromSelection();

            var range = this._editor.getSelection().getRanges()[0];

            if (link) {
                range.moveToElementEditEnd(link);

                var nextNode = range.getNextEditableNode();

                if (nextNode && !this._editor.element.equals(nextNode.getCommonAncestor(link))) {
                    var whitespace = /\s/.exec(nextNode.getText());

                    var offset = whitespace ? whitespace.index + 1 : 0;

                    range.setStart(nextNode, offset);
                    range.setEnd(nextNode, offset);
                }
            }

            this._editor.getSelection().selectRanges([range]);
        },

        /**
         * Create a link with given URI as href.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method create
         * @param {Object} attrs A config object with link attributes. These might be arbitrary DOM attributes.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         * @param {String} URI The URI of the link.
         */
        create: function(URI, attrs, modifySelection) {
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

            if (modifySelection && modifySelection.advance) {
                this.advanceSelection();
            } else {
                range.select();
            }
        },

        /**
         * Retrieves a link from the current selection.
         *
         * @instance
         * @memberof CKEDITOR.Link
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
         * @instance
         * @memberof CKEDITOR.Link
         * @method remove
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         */
        remove: function(link, modifySelection) {
            var editor = this._editor;

            if (link) {
                if (modifySelection && modifySelection.advance) {
                    this.advanceSelection();
                }

                link.remove(editor);
            } else {
                var style = new CKEDITOR.style({
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
         * @instance
         * @memberof CKEDITOR.Link
         * @method update
         * @param {CKEDITOR.dom.element} link The link element which href should be removed.
         * @param {Object|String} attrs The attributes to update or remove. Attributes with null values will be removed.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         */
        update: function(attrs, link, modifySelection) {
            var instance =  this;

            link = link || this.getFromSelection();

            if (typeof attrs === 'string') {
                var uri = instance._getCompleteURI(attrs);

                link.setAttributes({
                    'data-cke-saved-href': uri,
                    href: uri
                });
            } else if (typeof attrs === 'object') {
                var removeAttrs = [];

                var setAttrs = {};

                Object.keys(attrs).forEach(function(key) {
                    if (attrs[key] === null) {
                        if (key === 'href') {
                            removeAttrs.push('data-cke-saved-href');
                        }

                        removeAttrs.push(key);
                    } else {
                        if (key === 'href') {
                            var uri = instance._getCompleteURI(attrs[key]);

                            setAttrs['data-cke-saved-href'] = uri;
                            setAttrs[key] = uri;
                        } else {
                            setAttrs[key] = attrs[key];
                        }
                    }
                });

                link.removeAttributes(removeAttrs);
                link.setAttributes(setAttrs);
            }

            if (modifySelection && modifySelection.advance) {
                this.advanceSelection(link);
            }
        },

        /**
         * Checks if the URI begins with a '#' symbol to determine if it's an on page bookmark.
         * If it doesn't, it then checks if the URI has an '@' symbol. If it does and the URI
         * looks like an email and doesn't have 'mailto:', 'mailto:' is added to the URI.
         * If it doesn't and the URI doesn't have a scheme, the default 'http' scheme with
         * hierarchical path '//' is added to the URI.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method _getCompleteURI
         * @param {String} URI The URI of the link.
         * @protected
         * @return {String} The URI updated with the protocol.
         */
        _getCompleteURI: function(URI) {
            if (REGEX_BOOKMARK_SCHEME.test(URI)) {
                return URI;
            } else if (REGEX_EMAIL_SCHEME.test(URI)) {
                URI = 'mailto:' + URI;
            } else if (!REGEX_URI_SCHEME.test(URI)) {
                URI = this.appendProtocol ? 'http://' + URI : URI;
            }

            return URI;
        }
    };

    CKEDITOR.Link = CKEDITOR.Link || Link;
}());