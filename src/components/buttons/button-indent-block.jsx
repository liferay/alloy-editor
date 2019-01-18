import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonIcon from './button-icon.jsx';
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
     * Lifecycle. Returns the default values of the properties used in the widget.
     *
     * @instance
     * @memberof ButtonIndentBlock
     * @method getDefaultProps
     * @return {Object} The default properties.
     */
    static defaultProps = {
        command: 'indent'
    };

    /**
     * The name which will be used as an alias of the button in the configuration.
     *
     * @default indentBlock
     * @memberof ButtonIndentBlock
     * @property {String} key
     * @static
     */
    static key = 'indentBlock';

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonIndentBlock
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        const cssClass = `ae-button ${this.getStateClasses()}`;

        return (
            <button aria-label={AlloyEditor.Strings.indent} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-indent-block" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.indent}>
                <ButtonIcon editor={this.props.editor} symbol="indent-less" />
            </button>
        );
    }
}

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonIndentBlock
)));