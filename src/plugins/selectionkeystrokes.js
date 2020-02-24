/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

if (!CKEDITOR.plugins.get('ae_selectionkeystrokes')) {
	/**
	 * CKEditor plugin that simulates editor interaction events based on manual keystrokes. This
	 * can be used to trigger different reactions in the editor.
	 *
	 * @class CKEDITOR.plugins.ae_selectionkeystrokes
	 */
	CKEDITOR.plugins.add('ae_selectionkeystrokes', {
		requires: 'ae_selectionregion',

		/**
		 * Initialization of the plugin, part of CKEditor plugin lifecycle.
		 * The function adds a command to the editor for every defined selectionKeystroke
		 * in the configuration and maps it to the specified keystroke.
		 *
		 * @method init
		 * @param {Object} editor The current editor instance
		 */
		init(editor) {
			if (editor.config.selectionKeystrokes) {
				editor.config.selectionKeystrokes.forEach(
					selectionKeystroke => {
						const command = new CKEDITOR.command(editor, {
							exec(editor) {
								editor.fire('editorInteraction', {
									manualSelection:
										selectionKeystroke.selection,
									nativeEvent: {},
									selectionData: editor.getSelectionData(),
								});
							},
						});

						const commandName =
							'selectionKeystroke' + selectionKeystroke.selection;

						editor.addCommand(commandName, command);
						editor.setKeystroke(
							selectionKeystroke.keys,
							commandName
						);
					}
				);
			}
		},
	});
}
