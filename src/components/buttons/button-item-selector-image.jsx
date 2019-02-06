import ButtonCommand from '../base/button-command.js';
import ButtonIcon from './button-icon.jsx';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @class ButtonItemSelectorImage
 * @uses ButtonCommand
 */
class ButtonItemSelectorImage extends React.Component {
	static defaultProps = {
		command: 'imageselector',
	};

	static key = 'image';

	static propTypes = {
		editor: PropTypes.object.isRequired,
	};

	render() {
		return (
			<button
				className="ae-button"
				data-type="button-image"
				onClick={this._handleClick}
				tabIndex={this.props.tabIndex}>
				<ButtonIcon editor={this.props.editor} symbol="picture" />
			</button>
		);
	}

	_handleClick = () => {
		this.execCommand(null);
	};
}

export default ButtonCommand(ButtonItemSelectorImage);
