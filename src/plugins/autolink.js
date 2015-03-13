(function() {
    'use strict';

    if (/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/.test(navigator.userAgent)) {
        document.execCommand('AutoUrlDetect', false, false);
    }

    if (CKEDITOR.plugins.get('autolink')) {
        return;
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
     * LinkTag class utility. Provides methods for build <a> tags.
     *
     * @class LinkTag
     * @constructor
     * @param {Object} config The link configuration:
     * - {String} uri
     * - {Object} options:
     *     - {Boolean} newWindow
     *     - {String} cssClass
     *     - ...
     */
    function LinkTag(config) {
        var defaultOptions = {
            cssClass: '',
            newWindow: true
        };

        this._tagName = 'a';

        this._uri = (config && config.uri) ? config.uri : '';

        this._options = CKEDITOR.tools.merge(defaultOptions, config.options);

        this._attributes = {};
    }

    LinkTag.prototype = {
        constructor: LinkTag,

        /**
         * Builds the tag by creating the his attributes
         * from the configuration
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
         * Returns the html attributes that has the tag.
         *
         * @method getAttributes
         * @return {Object} Returns object with the html attributes
         */
        getAttributes: function() {
            return this._attributes;
        },

        /**
         * Returns the URI of the tag.
         *
         * @method getURI
         * @return {String} Returns the tag's uri
         */
        getURI: function() {
            return this._uri;
        },

        /**
         * Returns a string representation of the tag.
         *
         * @method toString
         * @return {String} the string representation of the tag.
         */
        toString: function() {
            var attrsStr = this._getAttrsString();
            var tagName = this._tagName;
            var uri = this._uri;

            return '<' + tagName + ' ' + attrsStr + '>' + uri + '</' + tagName + '>';
        },

        /**
         * Returns a string representation of the tag attributes
         *
         * @method _getAttrsString
         * @return {String} the string representation of the tag attributes
         */
        _getAttrsString: function() {
            var attributes = this.getAttributes();
            var attrsArr = [];

            for (var prop in attributes) {
                if (Object.prototype.hasOwnProperty.call(attributes, prop)) {
                    attrsArr.push(prop, '="', attributes[prop], '"');
                }
            }

            return attrsArr.join(' ');
        }
    };

    /**
     * CKEditor plugin which automatically generate links when user types text which looks like URL
     *
     * @class CKEDITOR.plugins.autolink
     * @constructor
     */
    CKEDITOR.plugins.add(
        'autolink', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers the 'editorInteraction' event on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                this._editor = editor;

                var editable = editor.editable();

                editable.attachListener(editable, 'keyup', this._onKeyup, this);
            },

            /**
             * Gets the last word introduced by the user. It reads from the current
             * caret point backward until it finds the first white space.
             *
             * @method _getLastWord
             * @return {String} last word introduced by user
             */
            _getLastWord: function() {
                var range = this._editor.getSelection().getRanges()[0];

                var offset = range.startOffset;

                var previousText = '';

                if (this._currentKeyCode === KEY_ENTER) {
                    var previousNode = range.startContainer.getPrevious();

                    //last child node may be a <BR>, ignore it and find the previous text node
                    var lastChild = previousNode.getLast();
                    while (lastChild && !lastChild.getText()) {
                        lastChild = lastChild.getPrevious();
                    }

                    //check if it is already a link
                    if (lastChild && lastChild.$.href) {
                        previousText = '';
                    } else {
                        this._startContainer = lastChild;
                        previousText = lastChild ? lastChild.getText() : '';
                        this._offset = previousText.length;
                    }
                }
                else {
                    this._startContainer = range.startContainer;

                    //last character is the delimiter, ignore it
                    previousText = this._startContainer.getText().substring(0, offset - 1);

                    this._offset = offset - 1;
                }

                var lastWord = (previousText.match(REGEX_LAST_WORD)) ? previousText.match(REGEX_LAST_WORD).pop() : '';

                return lastWord;
            },

            /**
             * Checks if the given link is a valid URL
             *
             * @method isValidURL
             * @param  {String} link The link we want to know if it is a valid URL
             * @return {Boolean} Returns true if the link is a valid URL, false otherwise.
             */
            _isValidURL: function(link) {
                return REGEX_URL.test(link);
            },

            /**
             * Listens the "BACK" event to check if the previous created
             * link has to be removed
             *
             * @method  _onKeyDown
             * @param  {EventFacade} event
             */
            _onKeyDown: function(event) {
                var nativeEvent = event.data.$;

                var editable = this._editor.editable();

                editable.removeListener('keydown', this._onKeyDown);

                if (nativeEvent.keyCode === KEY_BACK) {
                    event.cancel();
                    event.data.preventDefault();

                    this._undoLink();
                }

                this._ckLink = null;
            },

            /**
             * Listens the "ENTER" and "SPACE" key events to check if the last word
             * introduced by the user has to be replaced by a link tag.
             *
             * @method _onKeyup
             * @param  {EventFacade} event
             */
            _onKeyup: function(event) {
                var nativeEvent = event.data.$;

                this._currentKeyCode = nativeEvent.keyCode;

                if (DELIMITERS.indexOf(nativeEvent.keyCode) !== -1) {
                    var lastWord = this._getLastWord();

                    if (this._isValidURL(lastWord)) {
                        this._replaceByLink(lastWord);
                    }
                }
            },

            /**
             * Replace a text by a link tag.
             *
             * @method _replaceByLink
             * @param  {String} link the text that has to be replaced by a tag
             */
            _replaceByLink: function(link) {
                var urlTag = new LinkTag({
                    uri: link
                });

                urlTag.build();

                var range = this._editor.createRange();
                var node = CKEDITOR.dom.element.get(this._startContainer);
                var offset = this._offset;

                //select the link, so CKEDITOR.Link can properly replace it
                range.setStart(node, offset - urlTag.getURI().length);
                range.setEnd(node, offset);
                range.select();

                var ckLink = new CKEDITOR.Link(this._editor);

                ckLink.create(urlTag.getURI(), urlTag.getAttributes);
                this._ckLink = ckLink;

                this._subscribeKeyEvent();

                //now range is on the link and it is selected. We have to
                //return focus to the caret position
                range = this._editor.getSelection().getRanges()[0];

                //if user pressed "ENTER", get the next editable node at position '0'
                //else set the cursor at the next character of the link (the white space)
                if (this._currentKeyCode === KEY_ENTER) {
                    range.setEnd(range.getNextEditableNode(), 0);
                    range.setStart(range.getNextEditableNode(), 0);
                }
                else {
                    range.setEnd(range.getNextNode(), 1);
                    range.setStart(range.getNextNode(), 1);
                }

                range.select();
            },

            /**
             * Suscribe the editor to a key event.
             *
             * @method _subscribeKeyEvent
             */
            _subscribeKeyEvent: function() {
                var editable = this._editor.editable();

                editable.attachListener(editable, 'keydown', this._onKeyDown, this, {}, 1);
            },

            /**
             * Removes the link tag created, and replaces it by his text
             *
             * @method _undoLink
             */
            _undoLink: function() {
                var range = this._editor.getSelection().getRanges()[0];
                var caretOffset = range.startOffset;

                //select the link, so CKEDITOR.Link can properly remove it
                var linkNode = this._startContainer.getNext() || this._startContainer;

                var newRange = this._editor.createRange();
                newRange.setStart(linkNode, 0);
                newRange.setEndAfter(linkNode);
                newRange.select();

                this._ckLink.remove();

                //return focus to caret position
                range.setEnd(range.startContainer, caretOffset);
                range.setStart(range.startContainer, caretOffset);

                range.select();
            }
        }
    );
}());
