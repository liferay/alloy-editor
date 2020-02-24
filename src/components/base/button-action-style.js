/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';

/**
 * ButtonActionStyle is a mixin that provides applying style implementation for a
 * button based on the `applyStyle` and `removeStyle` API of CKEDITOR.
 *
 * To execute properly, the component has to expose the following methods which can be obtained
 * out of the box using the {{#crossLink "ButtonStyle"}}{{/crossLink}} mixin:
 * - `Function` {{#crossLink "ButtonStyle/isActive"}}{{/crossLink}} to check the active state
 * - `Function` {{#crossLink "ButtonStyle/getStyle"}}{{/crossLink}} to return the style that should be applied
 *
 * @class ButtonActionStyle
 */
export default WrappedComponent =>
	class ButtonActionStyle extends WrappedComponent {
		static contextType = EditorContext;

		/**
		 * Removes or applies the component style to the current selection.
		 *
		 * @instance
		 * @memberof ButtonActionStyle
		 * @method applyStyle
		 */
		applyStyle = () => {
			if (
				Lang.isFunction(this.isActive) &&
				Lang.isFunction(this.getStyle)
			) {
				const editor = this.context.editor.get('nativeEditor');

				editor.getSelection().lock();

				if (this.isActive()) {
					editor.removeStyle(this.getStyle());
				} else {
					editor.applyStyle(this.getStyle());
				}

				editor.getSelection().unlock();

				editor.fire('actionPerformed', this);
			}
		};
	};
