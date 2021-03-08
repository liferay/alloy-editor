/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';

import Lang from '../../oop/lang';

/**
 * ButtonStyle is a mixin that provides a style prop and some methods to
 * apply the resulting style and checking if it is present in a given
 * path or selection.
 *
 * @class ButtonStyle
 */
const ButtonStyle = {
	// Allows validating props being passed to the component.

	propTypes: {
		/**
		 * The style the button should handle. Allowed values are:
		 * - Object as described by
		 *   http://docs.ckeditor.com/#!/api/CKEDITOR.style.
		 * - String pointing to an object inside the editor instance
		 *   configuration. For example, `style = 'coreStyles_bold'` will
		 *   try to retrieve the style object from
		 *   `editor.config.coreStyles_bold`. Nested properties such as
		 *   `style = 'myplugin.myConfig.myStyle'` are also supported
		 *   and will try to retrieve the style object from the editor
		 *   configuration as well.
		 *
		 * @instance
		 * @memberof ButtonStyle
		 * @property {Object|String} style
		 */
		style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

		/**
		 * The style function the button should handle.
		 * If specified, style function has higher priority than style property.
		 *
		 * @instance
		 * @memberof ButtonStyle
		 * @property {function} styleFn
		 */
		styleFn: PropTypes.func,
	},

	/**
	 * Lifecycle. Invoked once, both on the client and server,
	 * immediately before the initial rendering occurs.
	 *
	 * @instance
	 * @memberof ButtonStyle
	 * @method componentWillMount
	 */
	componentWillMount() {
		let style = this.props.style;

		if (Lang.isString(style)) {
			const parts = style.split('.');
			let currentMember = this.props.editor.get('nativeEditor').config;
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
	},

	/**
	 * Lifecycle. Invoked immediately before a component is unmounted
	 * from the DOM.
	 *
	 * @instance
	 * @memberof ButtonStyle
	 * @method componentWillUnmount
	 */
	componentWillUnmount() {
		this._style = null;
	},

	/**
	 * Returns instance of CKEDITOR.style which represents the current
	 * button style.
	 *
	 * @instance
	 * @memberof ButtonStyle
	 * @method getStyle
	 * @return {CKEDITOR.style} The current style representation.
	 */
	getStyle() {
		return this._style;
	},

	/**
	 * Checks if style is active in the current selection.
	 *
	 * @instance
	 * @memberof ButtonStyle
	 * @method isActive
	 * @return {Boolean} True if style is active, false otherwise.
	 */
	isActive() {
		const editor = this.props.editor.get('nativeEditor');

		const elementPath = editor.elementPath();

		return this.getStyle().checkActive(elementPath, editor);
	},
};

export default ButtonStyle;
