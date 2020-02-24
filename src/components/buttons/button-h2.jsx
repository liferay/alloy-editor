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
 * The ButtonH2 class provides wraps a selection in `h2` element.
 *
 * @class ButtonH2
 * @uses ButtonActionStyle
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonH2 extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonH2
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		style: {
			element: 'h2',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default h2
	 * @memberof ButtonH2
	 * @property {String} key
	 * @static
	 */
	static key = 'h2';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonH2
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.h2}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-h2"
				onClick={this.applyStyle}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.h2}>
				<ButtonIcon symbol="h2" />
			</button>
		);
	}
}

export default ButtonActionStyle(ButtonStateClasses(ButtonStyle(ButtonH2)));
