import ButtonCommand from '../base/button-command.js';
import ButtonIcon from './button-icon.jsx';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @class ButtonItemSelectorAudio
 * @uses ButtonCommand
 */
class ButtonItemSelectorAudio extends React.Component {
	static defaultProps = {
		command: 'audioselector',
	};

	static key = 'audio';

	static propTypes = {
		editor: PropTypes.object.isRequired,
	};

	render() {
		return (
			<button
				className="ae-button"
				data-type="button-audio"
				onClick={this._handleClick}
				tabIndex={this.props.tabIndex}>
				<ButtonIcon editor={this.props.editor} symbol="audio"/>
			</button>
		);
	}

	_handleClick = () => {
		this.execCommand(null);
	}
}

export default ButtonCommand(ButtonItemSelectorAudio);
