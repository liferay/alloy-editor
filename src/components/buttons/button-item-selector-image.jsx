import ButtonCommand from '../base/button-command';
import ButtonIcon from './button-icon.jsx';
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

	render() {
		return (
			<button
				className="ae-button"
				data-type="button-image"
				onClick={this._handleClick}
				tabIndex={this.props.tabIndex}>
				<ButtonIcon symbol="picture" />
			</button>
		);
	}

	_handleClick = () => {
		this.execCommand(null);
	};
}

export default ButtonCommand(ButtonItemSelectorImage);
