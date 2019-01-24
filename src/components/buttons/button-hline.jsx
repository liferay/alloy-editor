import ButtonCommand from '../base/button-command.js';
import ButtonStyle from '../base/button-style.js';
import ButtonIcon from './button-icon.jsx';
import React from 'react';

/**
 * The ButtonHline class provides inserts horizontal line.
 *
 * @class ButtonHline
 * @uses ButtonCommand
 * @uses ButtonStyle
 */
class ButtonHline extends React.Component {
	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonHline
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
		command: 'horizontalrule',
		style: {
			element: 'hr',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default hline
	 * @memberof ButtonHline
	 * @property {String} key
	 * @static
	 */
	static key = 'hline';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonHline
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.horizontalrule}
				className="ae-button"
				data-type="button-hline"
				onClick={this.execCommand}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.horizontalrule}>
				<ButtonIcon editor={this.props.editor} symbol="hr" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonStyle(ButtonHline));
