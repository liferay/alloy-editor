import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonIcon from './button-icon.jsx';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonImageAlignRight class provides functionality for aligning an image on right.
 *
 * @class ButtonImageAlignRight
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonImageAlignRight extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonImageAlignRight
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'justifyright',
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default imageRight
	 * @memberof ButtonImageAlignRight
	 * @property {String} key
	 * @static
	 */
	static key = 'imageRight';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonImageAlignRight
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const cssClass = `ae-button ${this.getStateClasses()}`;

		return (
			<button
				aria-label={AlloyEditor.Strings.alignRight}
				aria-pressed={cssClass.indexOf('pressed') !== -1}
				className={cssClass}
				data-type="button-image-align-right"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.alignRight}>
				<ButtonIcon
					editor={this.props.editor}
					symbol="align-image-right"
				/>
			</button>
		);
	}
}

export default ButtonCommand(
	ButtonCommandActive(ButtonStateClasses(ButtonImageAlignRight))
);
