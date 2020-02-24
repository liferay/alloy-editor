/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/* istanbul ignore if */
if (!CKEDITOR.plugins.get('ae_uibridge')) {
	/**
	 * CKEditor plugin that extends CKEDITOR.ui.add function so an add handler can be specified
	 * on top of the original ones. It bridges the calls to add components via:
	 * - editor.ui.add(name, type, definition)
	 *
	 * @class CKEDITOR.plugins.ae_uibridge
	 * @constructor
	 */
	CKEDITOR.plugins.add('ae_uibridge', {
		/**
		 * Initialization of the plugin, part of CKEditor plugin lifecycle.
		 *
		 * @method beforeInit
		 * @param {Object} editor The current editor instance
		 */
		beforeInit(editor) {
			const originalUIAddFn = editor.ui.add;

			editor.ui.add = function(name, type, definition) {
				originalUIAddFn.call(this, name, type, definition);

				const typeHandler = this._.handlers[type];

				if (typeHandler && typeHandler.add) {
					typeHandler.add(name, definition, editor);
					AlloyEditor.registerBridgeButton(
						name,
						editor.__processingPlugin__.plugin.name
					);
				}
			};
		},
	});
}
