/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonIcon from './button-icon.jsx';

/**
 * @class ButtonItemSelectorAudio
 * @uses ButtonCommand
 */
class ButtonItemSelectorAudio extends React.Component {
	static defaultProps = {
		command: 'audioselector',
	};

	static key = 'audio';

	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.audio}
				className="ae-button"
				data-type="button-audio"
				onClick={this._handleClick}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.audio}>
				<ButtonIcon symbol="audio" />
			</button>
		);
	}

	_handleClick = () => {
		this.execCommand(null);
	};
}

export default ButtonCommand(ButtonItemSelectorAudio);
