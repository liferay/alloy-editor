/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonStyle from '../base/button-style';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonUnorderedlist class provides functionality for creating unordered lists in an editor.
 *
 * @class ButtonUnorderedlist
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonUnorderedlist extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonUnorderedlist
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'bulletedlist',
		style: {
			element: 'ul',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default ul
	 * @memberof ButtonUnorderedlist
	 * @property {String} key
	 * @static
	 */
	static key = 'ul';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonUnorderedlist
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.bulletedlist}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-ul"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.bulletedlist}>
				<ButtonIcon symbol="list-ul" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonStateClasses(ButtonStyle(ButtonUnorderedlist))
);
