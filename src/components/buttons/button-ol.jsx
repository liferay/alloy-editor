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
 * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
 *
 * @class ButtonOrderedList
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonOrderedList extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonOrderedList
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'numberedlist',
		style: {
			element: 'ol',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default ol
	 * @memberof ButtonOrderedList
	 * @property {String} key
	 * @static
	 */
	static key = 'ol';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonOrderedList
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.numberedlist}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-ol"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.numberedlist}>
				<ButtonIcon symbol="list-ol" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonStateClasses(ButtonStyle(ButtonOrderedList))
);
