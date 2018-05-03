import ButtonCommand from '../base/button-command.js';
import ButtonKeystroke from '../base/button-keystroke.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonItalic class provides functionality for styling an selection with italic (em) style.
 *
 * @class ButtonItalic
 * @uses ButtonCommand
 * @uses ButtonKeystroke
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonItalic extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonItalic
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.italic} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-italic" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.italic}>
                <span className="ae-icon-italic"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default italic
 * @memberof ButtonItalic
 * @property {String} key
 * @static
 */
ButtonItalic.key = 'italic';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonItalic
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonItalic.defaultProps = {
    command: 'italic',
    keystroke: {
        fn: 'execCommand',
        keys: CKEDITOR.CTRL + 73 /*I*/
    },
    style: 'coreStyles_italic'
};

export default ButtonCommand(
    ButtonKeystroke(
    ButtonStateClasses(
    ButtonStyle(
        ButtonItalic
))));