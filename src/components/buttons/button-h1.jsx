import ButtonActionStyle from '../base/button-action-style.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import ButtonIcon from './button-icon.jsx';
import React from 'react';

/**
 * The ButtonH1 class provides wraps a selection in `h1` element.
 *
 * @class ButtonH1
 * @uses ButtonActionStyle
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonH1 extends React.Component {
    /**
     * Lifecycle. Returns the default values of the properties used in the widget.
     *
     * @instance
     * @memberof ButtonH1
     * @method getDefaultProps
     * @return {Object} The default properties.
     */
    static defaultProps = {
        style: {
            element: 'h1'
        }
    };

    /**
     * The name which will be used as an alias of the button in the configuration.
     *
     * @default h1
     * @memberof ButtonH1
     * @property {String} key
     * @static
     */
    static key = 'h1';

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonH1
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.h1} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-h1" onClick={this.applyStyle.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.h1}>
                <ButtonIcon editor={this.props.editor} symbol="h1" />
            </button>
        );
    }
}

export default ButtonActionStyle(
    ButtonStateClasses(
    ButtonStyle(
        ButtonH1
)));