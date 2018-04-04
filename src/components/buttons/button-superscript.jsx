import ButtonCommand from '../base/button-command.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonSuperscript class provides functionality for applying superscript style to a text selection.
 *
 * @class ButtonSuperscript
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonSuperscript extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonSuperscript
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.superscript} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-superscript" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.superscript}>
                <span className="ae-icon-superscript"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default superscript
 * @memberof ButtonSuperscript
 * @property {String} key
 * @static
 */
ButtonSuperscript.key = 'superscript';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonSuperscript
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonSuperscript.defaultProps = {
    command: 'superscript',
    style: 'coreStyles_superscript'
};

export default ButtonCommand(
    ButtonStateClasses(
    ButtonStyle(
        ButtonSuperscript
)));