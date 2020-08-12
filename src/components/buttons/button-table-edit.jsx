/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';

const KEY_ENTER = 13;
const KEY_ESC = 27;

const INPUT_NAMES = {
	COLS: 'cols',
	ROWS: 'rows',
};

const MINIMUM_GRID_VALUE = 1;

/**
 * The ButtonTableEdit class provides functionality for creating and editing a table in a document.
 * Provides UI for creating a table.
 *
 * @class ButtonTableEdit
 */
class ButtonTableEdit extends React.Component {
	static contextType = EditorContext;

	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method getDefaultProps
	 */
	static defaultProps = {
		tableAttributes: {
			border: 1,
			cellPadding: 0,
			cellSpacing: 0,
			style: 'table-layout: fixed; width: 100%;',
		},
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default tableEdit
	 * @memberof ButtonTableEdit
	 * @property {String} key
	 * @static
	 */
	static key = 'tableEdit';

	/**
	 * Lifecycle. Invoked once before the component is mounted.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method getInitialState
	 */
	constructor(props) {
		super(props);

		this.rowsRef = React.createRef();
		this.colsRef = React.createRef();
		this.state = {
			cols: 3,
			rows: 3,
		};
	}

	/**
	 * Lifecycle. Invoked once, only on the client (not on the server),
	 * immediately after the initial rendering occurs.
	 *
	 * Focuses on the link input to immediately allow editing.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method componentDidMount
	 */
	componentDidMount() {
		this.rowsRef.current.focus();
	}

	/**
	 * Creates a table.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method _createTable
	 * @protected
	 */
	_createTable = () => {
		const editor = this.context.editor.get('nativeEditor');
		const tableUtils = new CKEDITOR.Table(editor);
		const {cols, rows} = this.state;

		tableUtils.create({
			attrs: this.props.tableAttributes,
			cols: Math.max(MINIMUM_GRID_VALUE, cols),
			rows: Math.max(MINIMUM_GRID_VALUE, rows),
		});

		this.props.cancelExclusive();

		editor.fire('actionPerformed', this);
	};

	/**
	 * Handles a change in input value. Sets the provided value from the user back to the input.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method _handleChange
	 * @param {String} inputName The name of the input which value should be updated.
	 * @param {SyntheticEvent} event The provided event.
	 * @protected
	 */
	_handleChange = (inputName, event) => {
		this.setState({
			[inputName]: event.target.value,
		});
	};

	/**
	 * Monitors key interaction inside the input element to respond to the keys:
	 * - Enter: Creates the table.
	 * - Escape: Discards the changes.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method _handleKeyDown
	 * @param {SyntheticEvent} event The keyboard event.
	 * @protected
	 */
	_handleKeyDown = event => {
		if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
			event.preventDefault();
		}

		if (event.keyCode === KEY_ENTER) {
			this._createTable();
		} else if (event.keyCode === KEY_ESC) {
			this.props.cancelExclusive();
		}
	};

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonTableEdit
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const time = Date.now();
		const rowsId = time + INPUT_NAMES.ROWS;
		const colsId = time + INPUT_NAMES.COLS;

		return (
			<div className="ae-container-edit-table">
				<label htmlFor={rowsId}>{AlloyEditor.Strings.rows}</label>
				<div className="ae-container-input small">
					<input
						className="ae-input"
						id={rowsId}
						min={MINIMUM_GRID_VALUE}
						onChange={this._handleChange.bind(
							this,
							INPUT_NAMES.ROWS
						)}
						onKeyDown={this._handleKeyDown}
						placeholder="Rows"
						ref={this.rowsRef}
						type="number"
						value={this.state.rows}
					/>
				</div>

				<label htmlFor={colsId}>{AlloyEditor.Strings.columns}</label>
				<div className="ae-container-input small">
					<input
						className="ae-input"
						id={colsId}
						min={MINIMUM_GRID_VALUE}
						onChange={this._handleChange.bind(
							this,
							INPUT_NAMES.COLS
						)}
						onKeyDown={this._handleKeyDown}
						placeholder="Colums"
						ref={this.colsRef}
						type="number"
						value={this.state.cols}
					/>
				</div>

				<button
					aria-label="Confirm"
					className="ae-button"
					onClick={this._createTable}>
					<ButtonIcon symbol="check" />
				</button>
			</div>
		);
	}
}

export default ButtonTableEdit;
