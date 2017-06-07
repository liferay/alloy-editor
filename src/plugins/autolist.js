(function() {
	'use strict';

    if (CKEDITOR.plugins.get('ae_autolist')) {
        return;
    }

    var KEY_BACK = 8;

    var KEY_SPACE = 32;

    var DEFAULT_CONFIG = [
        {
            regex: /^\*$/,
            type: 'bulletedlist'
        },
        {
            regex: /^1\.$/,
            type: 'numberedlist'
        }
    ];

	/**
     * CKEditor plugin which automatically generates ordered/unordered list when user types text which looks like a list.
     *
     * @class CKEDITOR.plugins.ae_autolist
     * @constructor
     */
    CKEDITOR.plugins.add(
        'ae_autolist', {

            /**
             * Initialization of the plugin, part of CKeditor plugin lifecycle.
             * The function registers the `keydown` event on the content editing area.
             *
             * @instance
             * @memberof CKEDITOR.plugins.ae_autolist
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.once('contentDom', function() {
                    var editable = editor.editable();

                    editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
                        editor: editor
                    });

                }.bind(this));
            },

            /**
             * Checks for pressing the `Backspace` key in order to undo the list creation.
             *
             * @instance
             * @memberof CKEDITOR.plugins.ae_autolist
             * @method _checkForBackspaceAndUndo
             * @param {Event} event Event object
             * @protected
             */
            _checkForBackspaceAndUndo: function(event) {
                var editor = event.listenerData.editor;

                var nativeEvent = event.data.$;

                var editable = editor.editable();

                editable.removeListener('keydown', this._checkForBackspaceAndUndo);

                if (nativeEvent.keyCode === KEY_BACK) {
                    editor.execCommand('undo');
                    editor.insertHtml(event.listenerData.bullet + '&nbsp;');
                    event.data.preventDefault();
                }
            },

            /**
             * Checks current line to find match with MATCHES object to create OL or UL.
             *
             * @instance
             * @memberof CKEDITOR.plugins.ae_autolist
             * @method _checkLine
             * @param {editor} Editor object
             * @protected
             * @return {Object|null} Returns an object which contains the detected list config if any
             */
            _getListConfig: function(editor) {
                var configRegex = editor.config.autolist || DEFAULT_CONFIG;

                var range = editor.getSelection().getRanges()[0];

                var textContainer = range.endContainer.getText();

                var bullet = textContainer.substring(0, range.startOffset);

                var text = textContainer.substring(range.startOffset, textContainer.length);

                var index = 0;

                var regexLen = configRegex.length;

                var autolistCfg = null;

                while (!autolistCfg && regexLen > index) {
                    var regexItem = configRegex[index];

                    if (regexItem.regex.test(bullet)) {
                        autolistCfg = {
                            bullet: bullet,
                            editor: editor,
                            text: text,
                            type: regexItem.type
                        };

                        break;
                    }

                    index++;
                }

                return autolistCfg;
            },

			/**
             * Create list with different types: Bulleted or Numbered list
             *
             * @instance
             * @memberof CKEDITOR.plugins.ae_autolist
             * @method _createList
             * @param {Object} listConfig Object that contains bullet, text and type for creating the list
             * @protected
			 */
            _createList: function(listConfig) {
                var editor = listConfig.editor;

                var range = editor.getSelection().getRanges()[0];

                range.endContainer.setText(listConfig.text);
                editor.execCommand(listConfig.type);

                var editable = editor.editable();

                // Subscribe to keydown in order to check if the next key press is `Backspace`.
                // If so, the creation of the list will be discarded.
                editable.attachListener(editable, 'keydown', this._checkForBackspaceAndUndo, this, {
                    editor: editor,
                    bullet: listConfig.bullet
                }, 1);
            },

			/**
             * Listens to the `Space` key events to check if the last word
             * introduced by the user should be replaced by a list (OL or UL)
             *
             * @instance
             * @memberof CKEDITOR.plugins.ae_autolist
             * @method _onKeyDown
             * @param {Event} event Event object
             * @protected
             */
            _onKeyDown: function(event) {
                var nativeEvent = event.data.$;

                if (nativeEvent.keyCode === KEY_SPACE) {
                    var listConfig = this._getListConfig(event.listenerData.editor);

                    if (listConfig) {
                        event.data.preventDefault();
                        this._createList(listConfig);
                    }
                }
            }
        }
	);
}());