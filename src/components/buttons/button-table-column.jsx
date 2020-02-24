/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommandsList from './button-commands-list.jsx';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonTableColumn class provides functionality to work with table columns.
 *
 * @class ButtonTableColumn
 */
class ButtonTableColumn extends React.Component {
	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default tableColumn
	 * @memberof ButtonTableColumn
	 * @property {String} key
	 * @static
	 */
	static key = 'tableColumn';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTableColumn
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		let buttonCommandsList;
		let buttonCommandsListId;

		if (this.props.expanded) {
			buttonCommandsListId = ButtonTableColumn.key + 'List';
			buttonCommandsList = (
				<ButtonCommandsList
					commands={this._getCommands()}
					listId={buttonCommandsListId}
					onDismiss={this.props.toggleDropdown}
				/>
			);
		}

		return (
			<div className="ae-container ae-has-dropdown">
				<button
					aria-expanded={this.props.expanded}
					aria-label={AlloyEditor.Strings.column}
					aria-owns={buttonCommandsListId}
					className="ae-button"
					onClick={this.props.toggleDropdown}
					role="listbox"
					tabIndex={this.props.tabIndex}
					title={AlloyEditor.Strings.column}>
					<ButtonIcon symbol="add-column" />
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
	 * @memberof ButtonTableColumn
	 * @method _getCommands
	 * @protected
	 * @return {Array} The list of available commands.
	 */
	_getCommands() {
		return (
			this.props.commands || [
				{
					command: 'columnInsertBefore',
					label: AlloyEditor.Strings.columnInsertBefore,
				},
				{
					command: 'columnInsertAfter',
					label: AlloyEditor.Strings.columnInsertAfter,
				},
				{
					command: 'columnDelete',
					label: AlloyEditor.Strings.columnDelete,
				},
			]
		);
	}
}

export default ButtonTableColumn;
