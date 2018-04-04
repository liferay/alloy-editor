import ButtonCommand from '../base/button-command.js';
import ButtonKeystroke from '../base/button-keystroke.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonBold class provides functionality for styling an selection with strong (bold) style.
 *
 * @class ButtonBold
 * @uses ButtonCommand
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonBold extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonBold
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.bold} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-bold" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.bold}>
                <span className="ae-icon-bold"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default bold
 * @memberof ButtonBold
 * @property {String} key
 * @static
 */
ButtonBold.key = 'bold';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonBold
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonBold.defaultProps = {
    command: 'bold',
    keystroke: {
        fn: 'execCommand',
        keys: CKEDITOR.CTRL + 66 /*B*/
    },
    style: 'coreStyles_bold'
};

export default ButtonCommand(
    ButtonKeystroke(
    ButtonStateClasses(
    ButtonStyle(
        ButtonBold
))));
