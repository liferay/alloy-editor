/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonCommandActive from '../base/button-command-active';
import ButtonStateClasses from '../base/button-state-classes';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonImageAlignCenter class provides functionality for aligning an image in the center.
 *
 * @class ButtonImageAlignCenter
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonImageAlignCenter extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonImageAlignCenter
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'justifycenter',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default imageCenter
	 * @memberof ButtonImageAlignCenter
	 * @property {String} key
	 * @static
	 */
	static key = 'imageCenter';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonImageAlignCenter
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.alignCenter}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-image-align-center"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.alignCenter}>
				<ButtonIcon symbol="align-image-center" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonCommandActive(ButtonStateClasses(ButtonImageAlignCenter))
);
