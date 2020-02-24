/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import EditorContext from '../../adapter/editor-context';

/**
 * ButtonCommandActive is a mixin that provides an `isActive` method to determine if
 * a context-aware command is currently in an active state.
 *
 * @class ButtonCommandActive
 */
export default WrappedComponent =>
	class ButtonCommandActive extends WrappedComponent {
		static contextType = EditorContext;

		/**
		 * Checks if the command is active in the current selection.
		 *
		 * @instance
		 * @memberof ButtonCommandActive
		 * @method isActive
		 * @return {Boolean} True if the command is active, false otherwise.
		 */
		isActive() {
			const editor = this.context.editor.get('nativeEditor');

			const command = editor.getCommand(this.props.command);

			return command ? command.state === CKEDITOR.TRISTATE_ON : false;
		}
	};
