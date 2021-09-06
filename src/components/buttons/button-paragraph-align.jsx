/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonCommandsList from './button-commands-list.jsx';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonParagraphAlign class provides functionality to work with table rows.
 *
 * @class ButtonParagraphAlign
 */
class ButtonParagraphAlign extends React.Component {
	static contextType = EditorContext;

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
		let buttonCommandsList;
		let buttonCommandsListId;
		const getCommands = this._getCommands();

		if (this.props.expanded) {
			buttonCommandsListId = ButtonParagraphAlign.key + 'List';
			buttonCommandsList = (
				<ButtonCommandsList
					commands={getCommands}
					inlineIcons={false}
					listId={buttonCommandsListId}
					onDismiss={this.props.toggleDropdown}
				/>
			);
		}

		const editor = this.context.editor.get('nativeEditor');

		let activeCommand = getCommands
			.filter(alignment => {
				const command = editor.getCommand(alignment.command);

				return command ? command.state === CKEDITOR.TRISTATE_ON : false;
			})
			.pop();

		activeCommand = activeCommand ? activeCommand : getCommands[0];

		const iconClassName = activeCommand.icon;

		return (
			<div className="ae-container-dropdown ae-container-dropdown-xsmall ae-has-dropdown">
				<button
					aria-expanded={this.props.expanded}
					aria-label={activeCommand.label}
					aria-owns={buttonCommandsListId}
					className="ae-toolbar-element"
					onClick={this.props.toggleDropdown}
					role="combobox"
					tabIndex={this.props.tabIndex}
					title={AlloyEditor.Strings.row}>
					<div className="ae-container">
						<ButtonIcon symbol={iconClassName} />
						<ButtonIcon symbol="caret-bottom" />
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
		return (
			this.props.commands || [
				{
					command: 'justifyleft',
					icon: 'align-left',
					label: AlloyEditor.Strings.alignLeft,
				},
				{
					command: 'justifycenter',
					icon: 'align-center',
					label: AlloyEditor.Strings.alignCenter,
				},
				{
					command: 'justifyright',
					icon: 'align-right',
					label: AlloyEditor.Strings.alignRight,
				},
				{
					command: 'justifyblock',
					icon: 'align-justify',
					label: AlloyEditor.Strings.alignJustify,
				},
			]
		);
	}
}

export default ButtonParagraphAlign;
