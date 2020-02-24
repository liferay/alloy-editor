/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonTableRemove class provides functionality for removing a table
 *
 * @class ButtonTableRemove
 */
class ButtonTableRemove extends React.Component {
	static contextType = EditorContext;

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default tableRemove
	 * @memberof ButtonTableRemove
	 * @property {String} key
	 * @static
	 */
	static key = 'tableRemove';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTableRemove
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		return (
			<button
				aria-label={AlloyEditor.Strings.deleteTable}
				className="ae-button"
				data-type="button-table-remove"
				onClick={this._removeTable}
				tabIndex={this.props.tabIndex}
				title={AlloyEditor.Strings.deleteTable}>
				<ButtonIcon symbol="trash" />
			</button>
		);
	}

	/**
	 * Removes the table in the editor element.
	 *
	 * @instance
	 * @memberof ButtonTableRemove
	 * @method _removeTable
	 * @protected
	 */
	_removeTable = () => {
		const editor = this.context.editor.get('nativeEditor');
		const tableUtils = new CKEDITOR.Table(editor);

		tableUtils.remove();

		editor.fire('actionPerformed', this);
	};
}

export default ButtonTableRemove;
