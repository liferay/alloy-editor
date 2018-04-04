import ButtonActionStyle from '../base/button-action-style.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonH2 class provides wraps a selection in `h2` element.
 *
 * @class ButtonH2
 * @uses ButtonActionStyle
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonH2 extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonH2
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.h2} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-h2" onClick={this.applyStyle.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.h2}>
                <span className="ae-icon-h2"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default h2
 * @memberof ButtonH2
 * @property {String} key
 * @static
 */
ButtonH2.key = 'h2';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonH2
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonH2.defaultProps = {
    style: {
        element: 'h2'
    }
};

export default ButtonActionStyle(
    ButtonStateClasses(
    ButtonStyle(
        ButtonH2
)));