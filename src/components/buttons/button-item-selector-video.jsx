import ButtonCommand from '../base/button-command.js';
import ButtonIcon from './button-icon.jsx';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @class ButtonItemSelectorVideo
 * @uses ButtonCommand
 */
class ButtonItemSelectorVideo extends React.Component {
	static defaultProps = {
		command: 'videoselector',
	};

	static key = 'video';

	render() {
		return (
			<button
				className="ae-button"
				data-type="button-video"
				onClick={this._handleClick}
				tabIndex={this.props.tabIndex}>
				<ButtonIcon symbol="video" />
			</button>
		);
	}

	_handleClick = () => {
		this.execCommand(null);
	};
}

export default ButtonCommand(ButtonItemSelectorVideo);
