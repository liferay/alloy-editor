import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonImageAlignRight class provides functionality for aligning an image on right.
 *
 * @class ButtonImageAlignRight
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonImageAlignRight extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonImageAlignRight
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.alignRight} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-image-align-right" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignRight}>
                <span className="ae-icon-align-right"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default imageRight
 * @memberof ButtonImageAlignRight
 * @property {String} key
 * @static
 */
ButtonImageAlignRight.key = 'imageRight';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonImageAlignRight
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonImageAlignRight.defaultProps = {
    command: 'justifyright'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonImageAlignRight
)));