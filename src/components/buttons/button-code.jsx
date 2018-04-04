import ButtonActionStyle from '../base/button-action-style.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonCode class provides wraps a selection in `pre` element.
 *
 * @class ButtonCode
 * @uses ButtonActionStyle
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonCode extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonCode
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.code} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-code" onClick={this.applyStyle.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.code}>
                <span className="ae-icon-code"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default code
 * @memberof ButtonCode
 * @property {String} key
 * @static
 */
ButtonCode.key = 'code';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonCode
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonCode.defaultProps = {
    style: {
        element: 'pre'
    }
};

export default ButtonActionStyle(
    ButtonStateClasses(
    ButtonStyle(
        ButtonCode
)));