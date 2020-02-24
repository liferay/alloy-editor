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
 * The ButtonH1 class provides wraps a selection in `h1` element.
 *
 * @class ButtonH1
 * @uses ButtonActionStyle
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonH1 extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonH1
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		style: {
			element: 'h1',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default h1
	 * @memberof ButtonH1
	 * @property {String} key
	 * @static
	 */
	static key = 'h1';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonH1
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.h1}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-h1"
				onClick={this.applyStyle}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.h1}>
				<ButtonIcon symbol="h1" />
			</button>
		);
	}
}

export default ButtonActionStyle(ButtonStateClasses(ButtonStyle(ButtonH1)));
