import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonIcon from './button-icon.jsx';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonOutdentBlock class provides functionality for outdenting blocks.
 *
 * @class ButtonOutdentBlock
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonOutdentBlock extends React.Component {
    /**
     * Lifecycle. Returns the default values of the properties used in the widget.
     *
     * @instance
     * @memberof ButtonOutdentBlock
     * @method getDefaultProps
     * @return {Object} The default properties.
     */
    static defaultProps = {
        command: 'outdent'
    };

    /**
     * The name which will be used as an alias of the button in the configuration.
     *
     * @default indentBlock
     * @memberof ButtonOutdentBlock
     * @property {String} key
     * @static
     */
    static key = 'outdentBlock';

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonOutdentBlock
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.outdent} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-outdent-block" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.outdent}>
                <ButtonIcon editor={this.props.editor} symbol="indent-more" />
            </button>
        );
    }
}

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonOutdentBlock
)));