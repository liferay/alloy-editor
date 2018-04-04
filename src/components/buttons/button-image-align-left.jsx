import ButtonCommand from '../base/button-command.js';
import ButtonCommandActive from '../base/button-command-active.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import React from 'react';

/**
 * The ButtonImageAlignLeft class provides functionality for aligning an image on left.
 *
 * @class ButtonImageAlignLeft
 * @uses ButtonCommand
 * @uses ButtonCommandActive
 * @uses ButtonStateClasses
 */
class ButtonImageAlignLeft extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonImageAlignLeft
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.alignLeft} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-image-align-left" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignLeft}>
                <span className="ae-icon-align-left"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default imageLeft
 * @memberof ButtonImageAlignLeft
 * @property {String} key
 * @static
 */
ButtonImageAlignLeft.key = 'imageLeft';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonImageAlignLeft
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonImageAlignLeft.defaultProps = {
    command: 'justifyleft'
};

export default ButtonCommand(
    ButtonCommandActive(
    ButtonStateClasses(
        ButtonImageAlignLeft
)));