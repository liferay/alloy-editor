/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonIcon from './button-icon.jsx';
import ButtonTableEdit from './button-table-edit.jsx';

/**
 * The ButtonTable class provides functionality for creating and editing a table in a document. ButtonTable
 * renders in two different modes:
 *
 * - Normal: Just a button that allows to switch to the edition mode
 * - Exclusive: The ButtonTableEdit UI with all the table edition controls.
 *
 * @class ButtonTable
 */
class ButtonTable extends React.Component {
	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default table
	 * @memberof ButtonTable
	 * @property {String} key
	 * @static
	 */
	static key = 'table';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTable
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		if (this.props.renderExclusive) {
			return <ButtonTableEdit {...this.props} />;
		} else {
			return (
				<button
					aria-label={AlloyEditor.Strings.table}
					className="ae-button"
					data-type="button-table"
					onClick={this.props.requestExclusive}
					tabIndex={this.props.tabIndex}
					title={AlloyEditor.Strings.table}>
					<ButtonIcon symbol="table" />
				</button>
			);
		}
	}
}

export default ButtonTable;
