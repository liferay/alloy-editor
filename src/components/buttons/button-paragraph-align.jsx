import ButtonCommandsList from './button-commands-list.jsx';
import ButtonIcon from './button-icon.jsx';
import React from 'react';

/**
 * The ButtonParagraphAlign class provides functionality to work with table rows.
 *
 * @class ButtonParagraphAlign
 */
class ButtonParagraphAlign extends React.Component {
    static key = 'paragraphAlign';

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonParagraphAlign
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var activeAlignment = AlloyEditor.Strings.alignLeft;

        var buttonCommandsList;
        var buttonCommandsListId;

        if (this.props.expanded) {
            buttonCommandsListId = ButtonParagraphAlign.key + 'List';
            buttonCommandsList = <ButtonCommandsList commands={this._getCommands()} editor={this.props.editor} listId={buttonCommandsListId} inlineIcons={false} onDismiss={this.props.toggleDropdown} />
        }

        var editor = this.props.editor.get('nativeEditor');

        var activeCommand = this._getCommands().filter(
            alignment => {
                var command = editor.getCommand(alignment.command);

                return command ? command.state === CKEDITOR.TRISTATE_ON : false;
            }
        ).pop();

        var iconClassName = activeCommand.icon;

        return (
            <div className="ae-container-dropdown ae-container-dropdown-xsmall ae-has-dropdown">
                <button aria-expanded={this.props.expanded} aria-label={activeCommand.label} aria-owns={buttonCommandsListId} className="ae-toolbar-element" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.row}>
                    <div className="ae-container">
                        <ButtonIcon editor={this.props.editor} symbol={iconClassName} />
                        <ButtonIcon editor={this.props.editor} symbol="caret-bottom" />
                    </div>
                </button>
                {buttonCommandsList}
            </div>
        );
    }

    /**
     * Returns a list of commands. If a list of commands was passed
     * as property `commands`, it will take a precedence over the default ones.
     *
     * @instance
     * @memberof ButtonParagraphAlign
     * @method _getCommands
     * @protected
     * @return {Array} The list of available commands.
     */
    _getCommands() {
        return this.props.commands || [
            {
                command: 'justifyleft',
                icon: 'align-left',
                label: AlloyEditor.Strings.alignLeft
            },
            {
                command: 'justifycenter',
                icon: 'align-center',
                label: AlloyEditor.Strings.alignCenter
            },
            {
                command: 'justifyright',
                icon: 'align-right',
                label: AlloyEditor.Strings.alignRight
            },
            {
                command: 'justifyblock',
                icon: 'align-justify',
                label: AlloyEditor.Strings.alignJustify
            }
        ];
    }
}

export default ButtonParagraphAlign;