/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/**
 * ButtonCommandActive is a mixin that provides an `isActive` method to
 * determine if a context-aware command is currently in an active state.
 *
 * @class ButtonCommandActive
 */
const ButtonCommandActive = {
	/**
	 * Checks if the command is active in the current selection.
	 *
	 * @instance
	 * @memberof ButtonCommandActive
	 * @method isActive
	 * @return {Boolean} True if the command is active, false otherwise.
	 */
	isActive() {
		const editor = this.props.editor.get('nativeEditor');

		const command = editor.getCommand(this.props.command);

		return command ? command.state === CKEDITOR.TRISTATE_ON : false;
	},
};

export default ButtonCommandActive;
