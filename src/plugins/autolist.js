/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

if (!CKEDITOR.plugins.get('ae_autolist')) {
	const KEY_BACK = 8;

	const KEY_SPACE = 32;

	const DEFAULT_CONFIG = [
		{
			regex: /^\*$/,
			type: 'bulletedlist',
		},
		{
			regex: /^1\.$/,
			type: 'numberedlist',
		},
	];

	/**
	 * CKEditor plugin which automatically generates ordered/unordered list when user types text which looks like a list.
	 *
	 * @class CKEDITOR.plugins.ae_autolist
	 * @constructor
	 */
	CKEDITOR.plugins.add('ae_autolist', {
		/**
		 * Initialization of the plugin, part of CKeditor plugin lifecycle.
		 * The function registers the `keydown` event on the content editing area.
		 *
		 * @instance
		 * @memberof CKEDITOR.plugins.ae_autolist
		 * @method init
		 * @param {Object} editor The current editor instance
		 */
		init(editor) {
			editor.once('contentDom', () => {
				const editable = editor.editable();

				editable.attachListener(
					editable,
					'keydown',
					this._onKeyDown,
					this,
					{
						editor,
					}
				);
			});
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
		_checkForBackspaceAndUndo(event) {
			const editor = event.listenerData.editor;

			const nativeEvent = event.data.$;

			const editable = editor.editable();

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
		_getListConfig(editor) {
			const configRegex = editor.config.autolist || DEFAULT_CONFIG;

			const range = editor.getSelection().getRanges()[0];

			const textContainer = range.endContainer.getText();

			const bullet = textContainer.substring(0, range.startOffset);

			const text = textContainer.substring(
				range.startOffset,
				textContainer.length
			);

			let index = 0;

			const regexLen = configRegex.length;

			let autolistCfg = null;

			while (!autolistCfg && regexLen > index) {
				const regexItem = configRegex[index];

				if (regexItem.regex.test(bullet)) {
					autolistCfg = {
						bullet,
						editor,
						text,
						type: regexItem.type,
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
		_createList(listConfig) {
			const editor = listConfig.editor;

			const range = editor.getSelection().getRanges()[0];

			range.endContainer.setText(listConfig.text);
			editor.execCommand(listConfig.type);

			const editable = editor.editable();

			// Subscribe to keydown in order to check if the next key press is `Backspace`.
			// If so, the creation of the list will be discarded.

			editable.attachListener(
				editable,
				'keydown',
				this._checkForBackspaceAndUndo,
				this,
				{
					editor,
					bullet: listConfig.bullet,
				},
				1
			);
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
		_onKeyDown(event) {
			const nativeEvent = event.data.$;

			if (nativeEvent.keyCode === KEY_SPACE) {
				const listConfig = this._getListConfig(
					event.listenerData.editor
				);

				if (listConfig) {
					event.data.preventDefault();
					this._createList(listConfig);
				}
			}
		},
	});
}
