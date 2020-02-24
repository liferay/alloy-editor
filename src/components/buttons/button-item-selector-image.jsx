/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonIcon from './button-icon.jsx';

/**
 * @class ButtonItemSelectorImage
 * @uses ButtonCommand
 */
class ButtonItemSelectorImage extends React.Component {
	static defaultProps = {
		command: 'imageselector',
	};

	static key = 'image';

	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.image}
				className="ae-button"
				data-type="button-image"
				onClick={this._handleClick}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.image}>
				<ButtonIcon symbol="picture" />
			</button>
		);
	}

	_handleClick = () => {
		this.execCommand(null);
	};
}

export default ButtonCommand(ButtonItemSelectorImage);
