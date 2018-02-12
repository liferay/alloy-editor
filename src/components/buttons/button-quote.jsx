import ButtonCommand from '../base/button-command.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonQuote class wraps a selection in `blockquote` element.
 *
 * @class ButtonQuote
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonQuote extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonQuote
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.quote} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-quote" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.quote}>
                <span className="ae-icon-quote"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default quote
 * @memberof ButtonQuote
 * @property {String} key
 * @static
 */
ButtonQuote.key = 'quote';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonQuote
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonQuote.defaultProps = {
    command: 'blockquote',
    style: {
        element: 'blockquote'
    }
};

export default ButtonCommand(
    ButtonStateClasses(
    ButtonStyle(
        ButtonQuote
)));