/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';

/**
 * ButtonKeystroke is a mixin that provides a `keystroke` prop that allows configuring
 * a function of the instance to be invoked upon the keystroke activation.
 *
 * @class ButtonKeystroke
 */
export default WrappedComponent =>
	class ButtonKeystroke extends WrappedComponent {
		static contextType = EditorContext;

		/**
		 * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
		 *
		 * @instance
		 * @memberof ButtonKeystroke
		 * @method componentWillMount
		 */
		componentWillMount() {
			if (Lang.isFunction(super.componentWillMount)) {
				super.componentWillMount();
			}

			const nativeEditor = this.context.editor.get('nativeEditor');
			const keystroke = this.props.keystroke;

			const commandName = `keystroke:${keystroke.name}`;

			let command = nativeEditor.getCommand(commandName);

			if (!command) {
				command = new CKEDITOR.command(nativeEditor, {
					exec: function(editor) {
						const keystrokeFn = keystroke.fn;

						if (Lang.isString(keystrokeFn)) {
							this[keystrokeFn].call(this, editor);
						} else if (Lang.isFunction(keystrokeFn)) {
							keystrokeFn.call(this, editor);
						}
					}.bind(this),
				});

				nativeEditor.addCommand(commandName, command);
			}

			this._defaultKeystrokeCommand =
				nativeEditor.keystrokeHandler.keystrokes[keystroke.keys];

			nativeEditor.setKeystroke(keystroke.keys, commandName);
		}

		/**
		 * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
		 *
		 * @instance
		 * @memberof ButtonKeystroke
		 * @method componentWillUnmount
		 */
		componentWillUnmount() {
			if (Lang.isFunction(super.componentWillUnmount)) {
				super.componentWillUnmount();
			}

			this.context.editor
				.get('nativeEditor')
				.setKeystroke(
					this.props.keystroke.keys,
					this._defaultKeystrokeCommand
				);
		}
	};
