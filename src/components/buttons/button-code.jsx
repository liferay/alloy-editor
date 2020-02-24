/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonActionStyle from '../base/button-action-style';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonStyle from '../base/button-style';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonCode class provides wraps a selection in `pre` element.
 *
 * @class ButtonCode
 * @uses ButtonActionStyle
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonCode extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonCode
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		style: {
			element: 'pre',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default code
	 * @memberof ButtonCode
	 * @property {String} key
	 * @static
	 */
	static key = 'code';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonCode
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.code}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-code"
				onClick={this.applyStyle}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.code}>
				<ButtonIcon symbol="code" />
			</button>
		);
	}
}

export default ButtonActionStyle(ButtonStateClasses(ButtonStyle(ButtonCode)));
