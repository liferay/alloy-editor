import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonParagraphJustify class provides functionality for justfying a paragraph.
 *
 * @class ButtonParagraphJustify
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonParagraphJustify extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonParagraphJustify
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.alignJustify} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-paragraph-justify" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignJustify}>
                <span className="ae-icon-align-justified"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default paragraphJustify
 * @memberof ButtonParagraphJustify
 * @property {String} key
 * @static
 */
ButtonParagraphJustify.key = 'paragraphJustify';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonParagraphJustify
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonParagraphJustify.defaultProps = {
    command: 'justifyblock'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonParagraphJustify
)));