import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonImageAlignCenter class provides functionality for aligning an image in the center.
 *
 * @class ButtonImageAlignCenter
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonImageAlignCenter extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonImageAlignCenter
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.alignCenter} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-image-align-center" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignCenter}>
                <span className="ae-icon-align-center"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default imageCenter
 * @memberof ButtonImageAlignCenter
 * @property {String} key
 * @static
 */
ButtonImageAlignCenter.key = 'imageCenter';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonImageAlignCenter
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonImageAlignCenter.defaultProps = {
    command: 'justifycenter'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonImageAlignCenter
)));