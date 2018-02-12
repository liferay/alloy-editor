import ButtonCommand from '../base/button-command.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
 *
 * @class ButtonSubscript
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonSubscript extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonSubscript
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.subscript} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-subscript" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.subscript}>
                <span className="ae-icon-subscript"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default subscript
 * @memberof ButtonSubscript
 * @property {String} key
 * @static
 */
ButtonSubscript.key = 'subscript';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonSubscript
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonSubscript.defaultProps = {
    command: 'subscript',
    style: 'coreStyles_subscript'
};

export default ButtonCommand(
    ButtonStateClasses(
    ButtonStyle(
        ButtonSubscript
)));