import ButtonCommand from '../base/button-command.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonStrike class styles a selection with strike style.
 *
 * @class ButtonStrike
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonStrike extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     * @instance
     * @memberof ButtonStrike
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.strike} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-strike" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.strike}>
                <span className="ae-icon-strike"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default strike
 * @memberof ButtonStrike
 * @property {String} key
 * @static
 */
ButtonStrike.key = 'strike';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonStrike
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonStrike.defaultProps = {
    command: 'strike',
    style: 'coreStyles_strike'
};

export default ButtonCommand(
    ButtonStateClasses(
    ButtonStyle(
        ButtonStrike
)));