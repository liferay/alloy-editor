import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonIndentBlock class provides functionality for indenting the selected blocks.
 *
 * @class ButtonIndentBlock
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonIndentBlock extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonIndentBlock
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.indent} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-indent-block" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.indent}>
                <span className="ae-icon-indent-block"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default indentBlock
 * @memberof ButtonIndentBlock
 * @property {String} key
 * @static
 */
ButtonIndentBlock.key = 'indentBlock';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonIndentBlock
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonIndentBlock.defaultProps = {
    command: 'indent'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonIndentBlock
)));