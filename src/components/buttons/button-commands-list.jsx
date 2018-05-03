import ButtonCommandListItem from './button-command-list-item.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import WidgetFocusManager from '../base/widget-focus-manager.js';

/**
 * The ButtonCommandsList class provides functionality for showing a list of commands that can be
 * executed to the current selection..
 *
 * @class ButtonCommandsList
 * @uses WidgetFocusManager
 */
class ButtonCommandsList extends React.Component {
    /**
     * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
     *
     * Focuses on the list node to allow keyboard interaction.
     *
     * @instance
     * @memberof ButtonCommandsList
     * @method componentDidMount
     */
    componentDidMount() {
        ReactDOM.findDOMNode(this).focus();
    }

    /**
     * Lifecycle. Renders the UI of the list.
     *
     * @instance
     * @memberof ButtonCommandsList
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        return (
            <div className="ae-dropdown ae-arrow-box ae-arrow-box-top-left" onFocus={this.focus.bind(this)} onKeyDown={this.handleKey.bind(this)} tabIndex="0">
                <ul className="ae-listbox" id={this.props.listId} role="listbox">
                    {this._renderActions(this.props.commands)}
                </ul>
            </div>
        );
    }

    /**
     * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
     *
     * @instance
     * @memberof ButtonCommandsList
     * @method _renderActions
     * @protected
     * @return {Array} Rendered instances of ButtonCommandListItem class
     */
    _renderActions(commands) {
        var editor = this.props.editor;
        var items;

        if (commands && commands.length) {
            items = commands.map(function(item) {
                return (
                    <li key={item.command} role="option">
                        <ButtonCommandListItem command={item.command} description={typeof item.label === 'string' ? item.label : item.label()} editor={editor} />
                    </li>
                );
            });
        }

        return items;
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default buttonCommandsList
 * @memberof ButtonCommandsList
 * @property {String} key
 * @static
 */
ButtonCommandsList.key = 'buttonCommandsList';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonCommandsList
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonCommandsList.defaultProps = {
    circular: false,
    descendants: '.ae-toolbar-element',
    keys: {
        dismiss: [27],
        dismissNext: [39],
        dismissPrev: [37],
        next: [40],
        prev: [38]
    }
};

export default WidgetFocusManager(
    ButtonCommandsList
);