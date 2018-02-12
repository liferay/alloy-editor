import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonParagraphCenter class provides functionality for centering a paragraph.
 *
 * @class ButtonParagraphCenter
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonParagraphCenter extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonParagraphCenter
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.alignCenter} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-paragraph-center" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignCenter}>
                <span className="ae-icon-align-center"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default paragraphCenter
 * @memberof ButtonParagraphCenter
 * @property {String} key
 * @static
 */
ButtonParagraphCenter.key = 'paragraphCenter';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonParagraphCenter
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonParagraphCenter.defaultProps = {
    command: 'justifycenter'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonParagraphCenter
)));