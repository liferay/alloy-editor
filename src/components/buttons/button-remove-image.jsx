/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonRemoveImage class removes an image using a CKEDITOR.command.
 *
 * @class ButtonRemoveImage
 * @uses ButtonCommand
 */
class ButtonRemoveImage extends React.Component {
	static defaultProps = {
		command: 'removeImage',
	};

	static key = 'removeImage';

	/**
	 * @inheritDoc
	 */
	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.removeImage}
				aria-pressed={false}
				className="ae-button"
				onClick={this.execCommand}
				title={AlloyEditor.Strings.removeImage}>
				<ButtonIcon symbol="times-circle" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonRemoveImage);
