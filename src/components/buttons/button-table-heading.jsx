import React from 'react';
import ButtonCommandsList from './button-commands-list.jsx';
import ButtonIcon from './button-icon.jsx';
import EditorContext from '../../adapter/editor-context';

/**
 * The ButtonTableHeading class provides functionality to work with table heading.
 *
 * @class ButtonTableHeading
 */
class ButtonTableHeading extends React.Component {
	static contextType = EditorContext;

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default tableRow
	 * @memberof ButtonTableHeading
	 * @property {String} key
	 * @static
	 */
	static key = 'tableHeading';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTableHeading
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		let buttonCommandsList;
		let buttonCommandsListId;

		if (this.props.expanded) {
			buttonCommandsListId = ButtonTableHeading.key + 'List';
			buttonCommandsList = (
				<ButtonCommandsList
					commands={this._getCommands()}
					editor={this.context.editor}
					listId={buttonCommandsListId}
					onDismiss={this.props.toggleDropdown}
				/>
			);
		}

		const activeHeading = new CKEDITOR.Table(
			this.context.editor.get('nativeEditor')
		).getHeading();
		const activeHeadingIntro = AlloyEditor.Strings.headers + ':';
		const activeHeadingLabel =
			AlloyEditor.Strings['headers' + activeHeading];

		return (
			<div className="ae-container-dropdown-xl ae-has-dropdown">
				<button
					aria-expanded={this.props.expanded}
					aria-label=""
					className="ae-toolbar-element"
					onClick={this.props.toggleDropdown}
					role="combobox"
					tabIndex={this.props.tabIndex}
					title="">
					<div className="ae-container">
						<span className="ae-container-dropdown-selected-item">
							{activeHeadingIntro}{' '}
							<strong>{activeHeadingLabel}</strong>
						</span>
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
	 * @memberof ButtonTableHeading
	 * @method _getCommands
	 * @protected
	 * @return {Array} The list of available commands.
	 */
	_getCommands() {
		return (
			this.props.commands || [
				{
					command: 'tableHeadingNone',
					label: AlloyEditor.Strings.headersNone,
				},
				{
					command: 'tableHeadingRow',
					label: AlloyEditor.Strings.headersRow,
				},
				{
					command: 'tableHeadingColumn',
					label: AlloyEditor.Strings.headersColumn,
				},
				{
					command: 'tableHeadingBoth',
					label: AlloyEditor.Strings.headersBoth,
				},
			]
		);
	}
}

export default ButtonTableHeading;
