(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_autolink')) {
        return;
    }

    // Disables the auto URL detection feature in IE, their lacks functionality:
    // They convert the links only on space. We do on space, comma, semicolon and Enter.
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
     * CKEditor plugin which automatically generates links when user types text which looks like URL.
     *
     * @class CKEDITOR.plugins.ae_autolink
     * @constructor
     */
    CKEDITOR.plugins.add(
        'ae_autolink', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers the `keyup` event on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.once('contentDom', function() {
                    var editable = editor.editable();

                    editable.attachListener(editable, 'keyup', this._onKeyUp, this, {
                        editor: editor
                    });
                }.bind(this));
            },

            /**
             * Retrieves the last word introduced by the user. Reads from the current
             * caret position backwards until it finds the first white space.
             *
             * @protected
             * @method _getLastWord
             * @return {String} The last word introduced by user
             */
            _getLastWord: function(editor) {
                var range = editor.getSelection().getRanges()[0];

                var offset = range.startOffset;

                var previousText = '';

                // The user pressed Enter, so we have to look on the previous node
                if (this._currentKeyCode === KEY_ENTER) {
                    var previousNode = range.startContainer.getPrevious();

                    var lastChild;

                    if (previousNode) {
                        // If previous node is a SPACE, (it does not have 'getLast' method),
                        // ignore it and find the previous text node
                        while (!previousNode.getLast) {
                            previousNode = previousNode.getPrevious();
                        }

                        lastChild = previousNode.getLast();

                        // Depending on the browser, the last child node may be a <BR>
                        // (which does not have 'getText' method),
                        // so ignore it and find the previous text node
                        while (lastChild && !lastChild.getText()) {
                            lastChild = lastChild.getPrevious();
                        }
                    }

                    // Check if the lastChild is already a link
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
             * @protected
             * @method isValidURL
             * @param {String} link The link we want to know if it is a valid URL
             * @return {Boolean} Returns true if the link is a valid URL, false otherwise
             */
            _isValidURL: function(link) {
                return REGEX_URL.test(link);
            },

            /**
             * Listens to the `keydown` event and if the keycode is `Backspace`, removes the previously
             * created link.
             *
             * @protected
             * @method _onKeyDown
             * @param {EventFacade} event EventFacade object
             */
            _onKeyDown: function(event) {
                var nativeEvent = event.data.$;

                var editor = event.listenerData.editor;

                var editable = editor.editable();

                editable.removeListener('keydown', this._onKeyDown);

                if (nativeEvent.keyCode === KEY_BACK) {
                    event.cancel();
                    event.data.preventDefault();

                    this._removeLink(editor);
                }

                this._ckLink = null;
            },

            /**
             * Listens to the `Enter` and `Space` key events in order to check if the last word
             * introduced by the user should be replaced by a link element.
             *
             * @protected
             * @method _onKeyUp
             * @param {EventFacade} event EventFacade object
             */
            _onKeyUp: function(event) {
                var nativeEvent = event.data.$;

                this._currentKeyCode = nativeEvent.keyCode;

                if (DELIMITERS.indexOf(this._currentKeyCode) !== -1) {
                    var editor = event.listenerData.editor;

                    var lastWord = this._getLastWord(editor);

                    if (this._isValidURL(lastWord)) {
                        this._replaceContentByLink(editor, lastWord);
                    }
                }
            },

            /**
             * Replaces content by a link element.
             *
             * @protected
             * @method _replaceContentByLink
             * @param {String} content The text that has to be replaced by an link element
             */
            _replaceContentByLink: function(editor, content) {
                var range = editor.createRange();
                var node = CKEDITOR.dom.element.get(this._startContainer);
                var offset = this._offset;

                // Select the content, so CKEDITOR.Link can properly replace it
                range.setStart(node, offset - content.length);
                range.setEnd(node, offset);
                range.select();

                var ckLink = new CKEDITOR.Link(editor);
                ckLink.create(content);
                this._ckLink = ckLink;

                this._subscribeToKeyEvent(editor);

                // Now range is on the link and it is selected. We have to
                // return focus to the caret position.
                range = editor.getSelection().getRanges()[0];

                // If user pressed `Enter`, get the next editable node at position 0,
                // otherwise set the cursor at the next character of the link (the white space)
                if (this._currentKeyCode === KEY_ENTER) {
                    var nextEditableNode = range.getNextEditableNode();

                    range.setStart(nextEditableNode, 0);
                    range.setEnd(nextEditableNode, 0);
                } else {
                    var nextNode = range.getNextNode();

                    range.setStart(nextNode, 1);
                    range.setEnd(nextNode, 1);
                }

                range.select();
            },

            /**
             * Removes the created link element, and replaces it by its text.
             *
             * @protected
             * @method _removeLink
             */
            _removeLink: function(editor) {
                var range = editor.getSelection().getRanges()[0];
                var caretOffset = range.startOffset;

                // Select the link, so CKEDITOR.Link can properly remove it
                var linkNode = this._startContainer.getNext() || this._startContainer;

                var newRange = editor.createRange();
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
             * @protected
             * @method _subscribeToKeyEvent
             */
            _subscribeToKeyEvent: function(editor) {
                var editable = editor.editable();

                // Change the priority of keydown listener - 1 means the highest priority.
                // In Chrome on pressing `Enter` the listener is not being invoked.
                // See http://dev.ckeditor.com/ticket/11861 for more information.
                editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
                    editor: editor
                }, 1);
            }
        }
    );
}());
