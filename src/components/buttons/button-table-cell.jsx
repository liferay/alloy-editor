/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCommandsList from './button-commands-list.jsx';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonTableCell class provides functionality to work with table cells.
 *
 * @class ButtonTableCell
 */
class ButtonTableCell extends React.Component {
	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default tableCell
	 * @memberof ButtonTableCell
	 * @property {String} key
	 * @static
	 */
	static key = 'tableCell';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTableCell
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		let buttonCommandsList;
		let buttonCommandsListId;

		if (this.props.expanded) {
			buttonCommandsListId = ButtonTableCell.key + 'List';
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
					aria-label={AlloyEditor.Strings.cell}
					aria-owns={buttonCommandsListId}
					className="ae-button"
					onClick={this.props.toggleDropdown}
					tabIndex={this.props.tabIndex}
					title={AlloyEditor.Strings.cell}>
					<ButtonIcon symbol="add-cell" />
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
	 * @memberof ButtonTableCell
	 * @method _getCommands
	 * @protected
	 * @return {Array} The list of available commands.
	 */
	_getCommands() {
		return (
			this.props.commands || [
				{
					command: 'cellInsertBefore',
					label: AlloyEditor.Strings.cellInsertBefore,
				},
				{
					command: 'cellInsertAfter',
					label: AlloyEditor.Strings.cellInsertAfter,
				},
				{
					command: 'cellDelete',
					label: AlloyEditor.Strings.cellDelete,
				},
				{
					command: 'cellMerge',
					label: AlloyEditor.Strings.cellMerge,
				},
				{
					command: 'cellMergeDown',
					label: AlloyEditor.Strings.cellMergeDown,
				},
				{
					command: 'cellMergeRight',
					label: AlloyEditor.Strings.cellMergeRight,
				},
				{
					command: 'cellHorizontalSplit',
					label: AlloyEditor.Strings.cellSplitHorizontal,
				},
				{
					command: 'cellVerticalSplit',
					label: AlloyEditor.Strings.cellSplitVertical,
				},
			]
		);
	}
}

export default ButtonTableCell;
