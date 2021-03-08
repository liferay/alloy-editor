/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';

/**
 * ButtonStyle is a mixin that provides a style prop and some methods to apply the resulting
 * style and checking if it is present in a given path or selection.
 *
 * @class ButtonStyle
 */
export default WrappedComponent =>
	class ButtonStyle extends WrappedComponent {
		static contextType = EditorContext;

		/**
		 * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
		 *
		 * @instance
		 * @memberof ButtonStyle
		 * @method componentWillMount
		 */
		componentWillMount() {
			if (Lang.isFunction(super.componentWillMount)) {
				super.componentWillMount();
			}

			let style = this.props.style;

			if (Lang.isString(style)) {
				const parts = style.split('.');
				let currentMember = this.context.editor.get('nativeEditor')
					.config;
				let property = parts.shift();

				while (
					property &&
					Lang.isObject(currentMember) &&
					Lang.isObject(currentMember[property])
				) {
					currentMember = currentMember[property];
					property = parts.shift();
				}

				if (Lang.isObject(currentMember)) {
					style = currentMember;
				}
			}

			this._style = new CKEDITOR.style(style);
		}

		/**
		 * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
		 *
		 * @instance
		 * @memberof ButtonStyle
		 * @method componentWillUnmount
		 */
		componentWillUnmount() {
			if (Lang.isFunction(super.componentWillUnmount)) {
				super.componentWillUnmount();
			}

			this._style = null;
		}

		/**
		 * Returns instance of CKEDITOR.style which represents the current button style.
		 *
		 * @instance
		 * @memberof ButtonStyle
		 * @method getStyle
		 * @return {CKEDITOR.style} The current style representation.
		 */
		getStyle() {
			return this._style;
		}

		/**
		 * Checks if style is active in the current selection.
		 *
		 * @instance
		 * @memberof ButtonStyle
		 * @method isActive
		 * @return {Boolean} True if style is active, false otherwise.
		 */
		isActive() {
			const editor = this.context.editor.get('nativeEditor');
			const elementPath = editor.elementPath();

			return this.getStyle().checkActive(elementPath, editor);
		}
	};
