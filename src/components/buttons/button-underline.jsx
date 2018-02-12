import ButtonCommand from '../base/button-command.js';
import ButtonKeystroke from '../base/button-keystroke.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonUnderline class provides functionality for underlying a text selection.
 *
 * @class ButtonUnderline
 * @uses ButtonCommand
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonUnderline extends React.Component{
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonUnderline
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.underline} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-underline" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.underline}>
                <span className="ae-icon-underline"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default underline
 * @memberof ButtonUnderline
 * @property {String} key
 * @static
 */
ButtonUnderline.key = 'underline';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonUnderline
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonUnderline.defaultProps = {
    command: 'underline',
    keystroke: {
        fn: 'execCommand',
        keys: CKEDITOR.CTRL + 85 /*U*/
    },
    style: 'coreStyles_underline'
};

export default ButtonCommand(
    ButtonKeystroke(
    ButtonStateClasses(
    ButtonStyle(
        ButtonUnderline
))));