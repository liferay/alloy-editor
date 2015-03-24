(function() {
    'use strict';

    if (CKEDITOR.plugins.get('autolink')) {
        return;
    }

    // Disables the auto URL detection feature in IE, their lacks functionality:
    // They convert the links only on space. We do on space, dot, comma and Enter.
    if (/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/.test(navigator.userAgent)) {
        document.execCommand('AutoUrlDetect', false, false);
    }

    var KEY_BACK = 8;

    var KEY_COMMA = 188;

    var KEY_ENTER = 13;

    var KEY_SEMICOLON = 186;

    var KEY_SPACE = 32;

    var DELIMITERS = [KEY_COMMA, KEY_ENTER, KEY_SEMICOLON, KEY_SPACE];

    var REGEX_LAST_WORD = /[^\s]+/mg;

    var REGEX_URL = /(https?\:\/\/|www\.)(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;

    /**
     * AutoLink class utility. Provides methods for building link elements.
     *
     * @class AutoLink
     * @constructor
     * @param {Object} config The link configuration:
     * - {String} uri
     * - {Object} options:
     *     - {Boolean} newWindow
     *     - {String} cssClass
     *     - ...
     */
    function AutoLink(config) {
        var defaultOptions = {
            cssClass: '',
            newWindow: true
        };

        this._elementTagName = 'a';

        this._uri = (config && config.uri) ? config.uri : '';

        this._options = CKEDITOR.tools.merge(defaultOptions, config.options);

        this._attributes = {};
    }

    AutoLink.prototype = {
        constructor: AutoLink,

        /**
         * Creates the element by creating its attributes from the configuration.
         *
         * @method build
         */
        build: function() {
            var attributes = {
                'href': this._uri
            };

            var options = this._options;

            if (options.cssClass) {
                attributes['class'] = options.cssClass;
            }

            if (options.newWindow) {
                attributes.target = '_blank';
            }

            this._attributes = attributes;
        },

        /**
         * Returns the HTML attributes that belong to the element.
         *
         * @method getAttributes
         * @return {Object} Returns an object with the HTML attributes of the element.
         */
        getAttributes: function() {
            return this._attributes;
        },

        /**
         * Returns the URI of the element.
         *
         * @method getURI
         * @return {String} Returns element's URI.
         */
        getURI: function() {
            return this._uri;
        }
    };

    /**
     * CKEditor plugin which automatically generates links when user types text which looks like URL.
     *
     * @class CKEDITOR.plugins.autolink
     * @constructor
     */
    CKEDITOR.plugins.add(
        'autolink', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers the 'keyup' event on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                this._editor = editor;

                var editable = editor.editable();

                editable.attachListener(editable, 'keyup', this._onKeyUp, this);
            },

            /**
             * Retrieves the last word introduced by the user. Reads from the current
             * caret position backwards until it finds the first white space.
             *
             * @method _getLastWord
             * @return {String} The last word introduced by user.
             * @protected
             */
            _getLastWord: function() {
                var range = this._editor.getSelection().getRanges()[0];

                var offset = range.startOffset;

                var previousText = '';

                // The user pressed Enter, so we have to look on the previous node
                if (this._currentKeyCode === KEY_ENTER) {
                    var previousNode = range.startContainer.getPrevious();

                    // The last child node may be a <BR>, ignore it and find the previous text node
                    var lastChild = previousNode.getLast();
                    while (lastChild && !lastChild.getText()) {
                        lastChild = lastChild.getPrevious();
                    }

                    // Check if the lastChild is a link
                    if (!(lastChild && lastChild.$.href)) {
                        this._startContainer = lastChild;
                        previousText = lastChild ? lastChild.getText() : '';
                        this._offset = previousText.length;
                    }
                } else {
                    this._startContainer = range.startContainer;

                    // Last character is the delimiter, ignore it
                    previousText = this._startContainer.getText().substring(0, offset - 1);

                    this._offset = offset - 1;
                }

                var lastWord = '';

                var match = previousText.match(REGEX_LAST_WORD);

                if (match) {
                    lastWord = match.pop();
                }

                return lastWord;
            },

            /**
             * Checks if the given link is a valid URL.
             *
             * @method isValidURL
             * @param  {String} link The link we want to know if it is a valid URL.
             * @return {Boolean} Returns true if the link is a valid URL, false otherwise.
             * @protected
             */
            _isValidURL: function(link) {
                return REGEX_URL.test(link);
            },

            /**
             * Listens to the `keydown` event and if the keycode is `Backspace`, removes the previously
             * create link.
             *
             * @method _onKeyDown
             * @param {EventFacade} event EventFacade object
             * @protected
             */
            _onKeyDown: function(event) {
                var nativeEvent = event.data.$;

                var editable = this._editor.editable();

                editable.removeListener('keydown', this._onKeyDown);

                if (nativeEvent.keyCode === KEY_BACK) {
                    event.cancel();
                    event.data.preventDefault();

                    this._removeLink();
                }

                this._ckLink = null;
            },

            /**
             * Listens to the `Enter` and `Space` key events to check if the last word
             * introduced by the user should be replaced by a link element.
             *
             * @method _onKeyUp
             * @param {EventFacade} event EventFacade object
             * @protected
             */
            _onKeyUp: function(event) {
                var nativeEvent = event.data.$;

                this._currentKeyCode = nativeEvent.keyCode;

                if (DELIMITERS.indexOf(this._currentKeyCode) !== -1) {
                    var lastWord = this._getLastWord();

                    if (this._isValidURL(lastWord)) {
                        this._replaceContentByLink(lastWord);
                    }
                }
            },

            /**
             * Replaces content by a link element.
             *
             * @method _replaceContentByLink
             * @param {String} content The text that has to be replaced by an link element.
             * @protected
             */
            _replaceContentByLink: function(content) {
                var autoLink = new AutoLink({
                    uri: content
                });

                autoLink.build();

                var range = this._editor.createRange();
                var node = CKEDITOR.dom.element.get(this._startContainer);
                var offset = this._offset;

                // Select the content, so CKEDITOR.Link can properly replace it
                range.setStart(node, offset - autoLink.getURI().length);
                range.setEnd(node, offset);
                range.select();

                var ckLink = new CKEDITOR.Link(this._editor);

                ckLink.create(autoLink.getURI(), autoLink.getAttributes());
                this._ckLink = ckLink;

                this._subscribeToKeyEvent();

                // Now range is on the link and it is selected. We have to
                // return focus to the caret position
                range = this._editor.getSelection().getRanges()[0];

                // If user pressed `Enter`, get the next editable node at position 0,
                // otherwise set the cursor at the next character of the link (the white space)
                if (this._currentKeyCode === KEY_ENTER) {
                    range.setEnd(range.getNextEditableNode(), 0);
                    range.setStart(range.getNextEditableNode(), 0);
                } else {
                    range.setEnd(range.getNextNode(), 1);
                    range.setStart(range.getNextNode(), 1);
                }

                range.select();
            },

            /**
             * Removes the created link element, and replaces it by its text.
             *
             * @method _removeLink
             * @protected
             */
            _removeLink: function() {
                var range = this._editor.getSelection().getRanges()[0];
                var caretOffset = range.startOffset;

                // Select the link, so CKEDITOR.Link can properly remove it
                var linkNode = this._startContainer.getNext() || this._startContainer;

                var newRange = this._editor.createRange();
                newRange.setStart(linkNode, 0);
                newRange.setEndAfter(linkNode);
                newRange.select();

                this._ckLink.remove();

                // Return focus to the caret position
                range.setEnd(range.startContainer, caretOffset);
                range.setStart(range.startContainer, caretOffset);

                range.select();
            },

            /**
             * Subscribe to a key event of the editable aria.
             *
             * @method _subscribeToKeyEvent
             * @protected
             */
            _subscribeToKeyEvent: function() {
                var editable = this._editor.editable();

                // Change the priority of keydown listener - 1 means the highest priority.
                // In Chrome on pressing `Enter` the listener is not being invoked.
                // See http://dev.ckeditor.com/ticket/11861 for more information.
                editable.attachListener(editable, 'keydown', this._onKeyDown, this, {}, 1);
            }
        }
    );
}());
