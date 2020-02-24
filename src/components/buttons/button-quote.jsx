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
 * The ButtonQuote class wraps a selection in `blockquote` element.
 *
 * @class ButtonQuote
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonQuote extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonQuote
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'blockquote',
		style: {
			element: 'blockquote',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default quote
	 * @memberof ButtonQuote
	 * @property {String} key
	 * @static
	 */
	static key = 'quote';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonQuote
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.quote}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-quote"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.quote}>
				<ButtonIcon symbol="quote-right" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonStateClasses(ButtonStyle(ButtonQuote)));
