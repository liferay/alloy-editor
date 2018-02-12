import ButtonCommand from '../base/button-command.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
 *
 * @class ButtonOrderedList
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonOrderedList extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonOrderedList
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.numberedlist} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-ol" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.numberedlist}>
                <span className="ae-icon-numbered-list"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default ol
 * @memberof ButtonOrderedList
 * @property {String} key
 * @static
 */
ButtonOrderedList.key = 'ol';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonOrderedList
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonOrderedList.defaultProps = {
    command: 'numberedlist',
    style: {
        element: 'ol'
    }
};

export default ButtonCommand(
    ButtonStateClasses(
    ButtonStyle(
        ButtonOrderedList
)));