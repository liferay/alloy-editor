import React from 'react';

import ButtonCommand from '../base/button-command';
import ButtonStateClasses from '../base/button-state-classes';
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
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.removeImage}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				onClick={this.execCommand}
				title={AlloyEditor.Strings.removeImage}>
				<ButtonIcon symbol="times-circle" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonStateClasses(ButtonRemoveImage));
