(function() {
	'use strict';

	if (CKEDITOR.plugins.get('ae_autolist')) {
		return;
	}

	var KEY_BACK = 8;

	var KEY_SPACE = 32;

	var bulletExpressions = [
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
     * CKEditor plugin which automatically generates ordered/unordered list when user types text which looks like list.
     *
     * @class CKEDITOR.plugins.ae_autolist
     * @constructor
     */
	CKEDITOR.plugins.add(
		'ae_autolist', {

			/**
			* Initialization of the plugin, part of CKeditor plugin lifecycle.
			* The function registers the `keyup` event on the edition area.
			*
			* @method init
			* @param {Object} editor The current editor instance
			*/
			init: function(editor) {
				editor.once('contentDom', function() {
					var editable = editor.editable();

					editor.config.autolist = editor.config.autolist || bulletExpressions;

					editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
						editor: editor
					});

				}.bind(this));
			},

			/**
			* Check current line to find match with MATCHES object to create OL or UL
			*
			* @protected
			* @method _checkLine
			* @param {Integer} the position of the line
			* @param {element} string that is checked if match exists
			* @param {editor} Editor object
			@ @param {Event} event Event object
			*/
			_checkLine: function(bullet, text, editor, event) {
				var index = 0;

				var configRegex = editor.config.autolist;

				var regexLen = configRegex.length;

				var found = false;

				while (!found && regexLen > index) {

					var regexItem = configRegex[index];

					if (regexItem.regex.test(bullet)) {
						found = {
							editor: editor,
							bullet: bullet,
							text: text,
							type: regexItem.type
						};

					}
					index++;
				}

				return found;
			},

			/**
			* Create list with different types: bulletedlist or numberedlist
			*
			* @protectec
			* @method _createList
			* @param {listCreation} object that contains bullet, text and type for creating the list
			*/
			_createList: function(listCreation) {
				var editor = listCreation.editor;

				var range = editor.getSelection().getRanges()[0];

				range.endContainer.setText(listCreation.text);
				editor.execCommand(listCreation.type);
				this._subscribeToKeyDownEvent(editor, listCreation.bullet);
			},

			/**
             * Listens to the `Space` key events to check if the last word
             * introduced by the user should be replaced by a list (OL or UL)
             *
             * @protected
             * @method _onKeyPress
             * @param {Event} event Eventobject
             */
            _onKeyDown: function(event) {
            	var nativeEvent = event.data.$;

				this._currentKeyCode = nativeEvent.keyCode;
				if (this._currentKeyCode === KEY_SPACE) {

					var editor = event.listenerData.editor;

					var range = editor.getSelection().getRanges()[0];

					var textContainer = range.endContainer.getText();

					var bullet = textContainer.substring(0, range.startOffset);

					var text = textContainer.substring(range.startOffset, textContainer.length);

					var listCreation = this._checkLine(bullet, text, editor, event);

					if (listCreation) {
						event.data.preventDefault();
						this._createList(listCreation);
					}
				}
            },

            /**
            * Listens to the 'Key Back', to check if after list is created, key back is clicked
        	* to undo the list
        	*
        	* @protected
        	* @method _onKeyDownCheckToDelete
        	* @param {Event} event Eventobject
            */
            _onKeyDownCheckToDelete: function(event) {
				var editor = event.listenerData.editor;

                var nativeEvent = event.data.$;

                var editable = editor.editable();

                this._currentKeyCode = nativeEvent.keyCode;

                editable.removeListener('keydown', this._onKeyDownCheckToDelete);

                if (this._currentKeyCode === KEY_BACK) {
					editor.execCommand('undo');
					editor.insertHtml(event.listenerData.bullet + '&nbsp;');
					event.data.preventDefault();
				}
            },

            /**
            * Add attachlistener after autolist is created.
            *
            * @protected
            * @method _subscribeToKeyDownEvent
            * @param {editor} Editor object
            * @param {bullet} String to add at beginning of container when key back is clicked
            */
            _subscribeToKeyDownEvent: function(editor, bullet) {
				var editable = editor.editable();

				editable.attachListener(editable, 'keydown', this._onKeyDownCheckToDelete, this, {
					editor: editor,
					bullet: bullet
				}, 1);
			}
        }
	);
}());