import ButtonCommand from '../base/button-command.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import ButtonStyle from '../base/button-style.js';
import React from 'react';

/**
 * The ButtonUnorderedlist class provides functionality for creating unordered lists in an editor.
 *
 * @class ButtonUnorderedlist
 * @uses ButtonCommand
 * @uses ButtonStateClasses
 * @uses ButtonStyle
 */
class ButtonUnorderedlist extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonUnorderedlist
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var cssClass = 'ae-button ' + this.getStateClasses();

        return (
            <button aria-label={AlloyEditor.Strings.bulletedlist} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-ul" onClick={this.execCommand.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.bulletedlist}>
                <span className="ae-icon-bulleted-list"></span>
            </button>
        );
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default ul
 * @memberof ButtonUnorderedlist
 * @property {String} key
 * @static
 */
ButtonUnorderedlist.key = 'ul';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonUnorderedlist
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonUnorderedlist.defaultProps = {
    command: 'bulletedlist',
    style: {
        element: 'ul'
    }
};

export default ButtonCommand(
    ButtonStateClasses(
    ButtonStyle(
        ButtonUnorderedlist
)));