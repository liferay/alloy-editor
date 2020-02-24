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
 * The ButtonImageAlignLeft class provides functionality for aligning an image on left.
 *
 * @class ButtonImageAlignLeft
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonImageAlignLeft extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonImageAlignLeft
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'justifyleft',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default imageLeft
	 * @memberof ButtonImageAlignLeft
	 * @property {String} key
	 * @static
	 */
	static key = 'imageLeft';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonImageAlignLeft
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.alignLeft}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-image-align-left"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.alignLeft}>
				<ButtonIcon symbol="align-image-left" />
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonCommandActive(ButtonStateClasses(ButtonImageAlignLeft))
);
