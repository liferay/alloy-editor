import ButtonCommand from '../base/button-command.js';
import React from 'react';

/**
 * The ButtonRemoveFormat class removes style formatting.
 *
 * @class ButtonRemoveFormat
 * @uses ButtonCommand
 */
class ButtonRemoveFormat extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonRemoveFormat
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        return (
            <button aria-label={AlloyEditor.Strings.removeformat} className='ae-button' data-type="button-removeformat" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.removeformat}>
                <span className="ae-icon-removeformat"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default removeFormat
 * @memberof ButtonRemoveFormat
 * @property {String} key
 * @static
 */
ButtonRemoveFormat.key = 'removeFormat';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonRemoveFormat
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonRemoveFormat.defaultProps = {
    command: 'removeFormat'
};

export default ButtonCommand(
    ButtonRemoveFormat
);