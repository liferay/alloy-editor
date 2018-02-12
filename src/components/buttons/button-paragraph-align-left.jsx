import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';
/**
 * The ButtonParagraphAlignLeft class provides functionality for aligning a paragraph on left.
 *
 * @class ButtonParagraphAlignLeft
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonParagraphAlignLeft extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonParagraphAlignLeft
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.alignLeft} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-paragraph-align-left" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignLeft}>
                <span className="ae-icon-align-left"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default paragraphLeft
 * @memberof ButtonParagraphAlignLeft
 * @property {String} key
 * @static
 */
ButtonParagraphAlignLeft.key = 'paragraphLeft';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonParagraphAlignLeft
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonParagraphAlignLeft.defaultProps = {
    command: 'justifyleft'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonParagraphAlignLeft
)));