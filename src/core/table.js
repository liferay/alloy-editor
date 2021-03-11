/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const IE_NON_DIRECTLY_EDITABLE_ELEMENT = {
	table: 1,
	col: 1,
	colgroup: 1,
	tbody: 1,
	td: 1,
	tfoot: 1,
	th: 1,
	thead: 1,
	tr: 1,
};

/**
 * Table class utility. Provides methods for create, delete and update tables.
 *
 * @class CKEDITOR.Table
 * @constructor
 * @param {Object} editor The CKEditor instance.
 */

function Table(editor) {
	this._editor = editor;
}

Table.HEADING_BOTH = 'Both';
Table.HEADING_COL = 'Column';
Table.HEADING_NONE = 'None';
Table.HEADING_ROW = 'Row';

Table.prototype = {
	constructor: Table,

	/**
	 * Creates a table.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method create
	 * @param {Object} config Table configuration object
	 * @return {Object} The created table
	 */
	create(config) {
		const editor = this._editor;
		const table = this._createElement('table');

		config = config || {};

		// Generate the rows and cols.

		const tbody = table.append(this._createElement('tbody'));
		const rows = config.rows || 1;
		const cols = config.cols || 1;

		for (let i = 0; i < rows; i++) {
			const row = tbody.append(this._createElement('tr'));
			for (let j = 0; j < cols; j++) {
				const cell = row.append(this._createElement('td'));

				cell.appendBogus();
			}
		}

		this.setAttributes(table, config.attrs);
		this.setHeading(table, config.heading);

		// Insert the table element if we're creating one.

		editor.insertElement(table);

		const firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
		const range = editor.createRange();
		range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
		range.select();

		return table;
	},

	/**
	 * Retrieves a table from the current selection.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method getFromSelection
	 * @return {CKEDITOR.dom.element} The retrieved table or null if not found.
	 */
	getFromSelection() {
		let table;
		const selection = this._editor.getSelection();
		const selected = selection.getSelectedElement();

		if (selected && selected.is('table')) {
			table = selected;
		} else {
			const ranges = selection.getRanges();

			if (ranges.length > 0) {
				// Webkit could report the following range on cell selection (#4948):
				// <table><tr><td>[&nbsp;</td></tr></table>]

				/* istanbul ignore else */
				if (CKEDITOR.env.webkit) {
					ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
				}

				table = this._editor
					.elementPath(ranges[0].getCommonAncestor(true))
					.contains('table', 1);
			}
		}

		return table;
	},

	/**
	 * Checks if a given table can be considered as editable. This method
	 * workarounds a limitation of IE where for some elements (like table),
	 * `isContentEditable` returns always false. This is because IE does not support
	 * `contenteditable` on such elements. However, despite such elements
	 * cannot be set as content editable directly, a content editable SPAN,
	 * or DIV element can be placed inside the individual table cells.
	 * See https://msdn.microsoft.com/en-us/library/ms537837%28v=VS.85%29.aspx
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method isEditable
	 * @param {CKEDITOR.dom.element} el The table element to test if editable
	 * @return {Boolean}
	 */
	isEditable(el) {
		if (!CKEDITOR.env.ie || !el.is(IE_NON_DIRECTLY_EDITABLE_ELEMENT)) {
			return !el.isReadOnly();
		}

		if (el.hasAttribute('contenteditable')) {
			return el.getAttribute('contenteditable') !== 'false';
		}

		return this.isEditable(el.getParent());
	},

	/**
	 * Returns which heading style is set for the given table.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method getHeading
	 * @param {CKEDITOR.dom.element} table The table to gather the heading from. If null, it will be retrieved from the current selection.
	 * @return {String} The heading of the table. Expected values are `CKEDITOR.Table.NONE`, `CKEDITOR.Table.ROW`, `CKEDITOR.Table.COL` and `CKEDITOR.Table.BOTH`.
	 */
	getHeading(table) {
		table = table || this.getFromSelection();

		if (!table) {
			return null;
		}

		const rowHeadingSettings = table.$.tHead !== null;

		let colHeadingSettings = true;

		// Check if all of the first cells in every row are TH

		for (let row = 0; row < table.$.rows.length; row++) {
			// If just one cell isn't a TH then it isn't a header column

			const cell = table.$.rows[row].cells[0];

			if (cell && cell.nodeName.toLowerCase() !== 'th') {
				colHeadingSettings = false;
				break;
			}
		}

		let headingSettings = Table.HEADING_NONE;

		if (rowHeadingSettings) {
			headingSettings = Table.HEADING_ROW;
		}

		if (colHeadingSettings) {
			headingSettings =
				headingSettings === Table.HEADING_ROW
					? Table.HEADING_BOTH
					: Table.HEADING_COL;
		}

		return headingSettings;
	},

	/**
	 * Removes a table from the editor.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method remove
	 * @param {CKEDITOR.dom.element} table The table element which table style should be removed.
	 */
	remove(table) {
		const editor = this._editor;

		if (table) {
			table.remove();
		} else {
			table = editor.elementPath().contains('table', 1);

			if (table) {
				// If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element) (#5416, #6289, #12110)

				const parent = table.getParent();
				const editable = editor.editable();

				if (
					parent.getChildCount() === 1 &&
					!parent.is('td', 'th') &&
					!parent.equals(editable)
				) {
					table = parent;
				}

				const range = editor.createRange();
				range.moveToPosition(table, CKEDITOR.POSITION_BEFORE_START);
				table.remove();
			}
		}
	},

	/**
	 * Assigns provided attributes to a table.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method setAttributes
	 * @param {Object} table The table to which the attributes should be assigned
	 * @param {Object} attrs The attributes which have to be assigned to the table
	 */
	setAttributes(table, attrs) {
		if (attrs) {
			Object.keys(attrs).forEach(attr => {
				table.setAttribute(attr, attrs[attr]);
			});
		}
	},

	/**
	 * Sets the appropriate table heading style to a table.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @method setHeading
	 * @param {CKEDITOR.dom.element} table The table element to which the heading should be set. If null, it will be retrieved from the current selection.
	 * @param {String} heading The table heading to be set. Accepted values are: `CKEDITOR.Table.NONE`, `CKEDITOR.Table.ROW`, `CKEDITOR.Table.COL` and `CKEDITOR.Table.BOTH`.
	 */
	setHeading(table, heading) {
		table = table || this.getFromSelection();

		let i;
		let newCell;
		let tableHead;
		const tableBody = table.getElementsByTag('tbody').getItem(0);

		let tableHeading = this.getHeading(table);
		const hadColHeading =
			tableHeading === Table.HEADING_COL ||
			tableHeading === Table.HEADING_BOTH;

		const needColHeading =
			heading === Table.HEADING_COL || heading === Table.HEADING_BOTH;
		const needRowHeading =
			heading === Table.HEADING_ROW || heading === Table.HEADING_BOTH;

		// If we need row heading and don't have a <thead> element yet, move the
		// first row of the table to the head and convert the nodes to <th> ones.

		if (!table.$.tHead && needRowHeading) {
			const tableFirstRow = tableBody.getElementsByTag('tr').getItem(0);
			const tableFirstRowChildCount = tableFirstRow.getChildCount();

			// Change TD to TH:

			for (i = 0; i < tableFirstRowChildCount; i++) {
				const cell = tableFirstRow.getChild(i);

				// Skip bookmark nodes. (#6155)

				if (
					cell.type === CKEDITOR.NODE_ELEMENT &&
					!cell.data('cke-bookmark')
				) {
					cell.renameNode('th');
					cell.setAttribute('scope', 'col');
				}
			}

			tableHead = this._createElement(table.$.createTHead());
			tableHead.append(tableFirstRow.remove());
		}

		// If we don't need row heading and we have a <thead> element, move the
		// row out of there and into the <tbody> element.

		if (table.$.tHead !== null && !needRowHeading) {
			// Move the row out of the THead and put it in the TBody:

			tableHead = this._createElement(table.$.tHead);

			const previousFirstRow = tableBody.getFirst();

			while (tableHead.getChildCount() > 0) {
				const newFirstRow = tableHead.getFirst();
				const newFirstRowChildCount = newFirstRow.getChildCount();

				for (i = 0; i < newFirstRowChildCount; i++) {
					newCell = newFirstRow.getChild(i);

					if (newCell.type === CKEDITOR.NODE_ELEMENT) {
						newCell.renameNode('td');
						newCell.removeAttribute('scope');
					}
				}

				newFirstRow.insertBefore(previousFirstRow);
			}

			tableHead.remove();
		}

		tableHeading = this.getHeading(table);
		const hasColHeading =
			tableHeading === Table.HEADING_COL ||
			tableHeading === Table.HEADING_BOTH;

		// If we need column heading and the table doesn't have it, convert every first cell in
		// every row into a `<th scope="row">` element.

		if (!hasColHeading && needColHeading) {
			for (i = 0; i < table.$.rows.length; i++) {
				if (table.$.rows[i].cells[0].nodeName.toLowerCase() !== 'th') {
					newCell = new CKEDITOR.dom.element(
						table.$.rows[i].cells[0]
					);
					newCell.renameNode('th');
					newCell.setAttribute('scope', 'row');
				}
			}
		}

		// If we don't need column heading but the table has it, convert every first cell in every
		// row back into a `<td>` element.

		if (hadColHeading && !needColHeading) {
			for (i = 0; i < table.$.rows.length; i++) {
				const row = new CKEDITOR.dom.element(table.$.rows[i]);

				if (row.getParent().getName() === 'tbody') {
					newCell = new CKEDITOR.dom.element(row.$.cells[0]);
					newCell.renameNode('td');
					newCell.removeAttribute('scope');
				}
			}
		}
	},

	/**
	 * Creates a new CKEDITOR.dom.element using the passed tag name.
	 *
	 * @instance
	 * @memberof CKEDITOR.Table
	 * @protected
	 * @method _createElement
	 * @param {String} name The tag name from which an element should be created
	 * @return {CKEDITOR.dom.element} Instance of CKEDITOR DOM element class
	 */
	_createElement(name) {
		return new CKEDITOR.dom.element(name, this._editor.document);
	},
};

CKEDITOR.on('instanceReady', event => {
	const headingCommands = [
		Table.HEADING_NONE,
		Table.HEADING_ROW,
		Table.HEADING_COL,
		Table.HEADING_BOTH,
	];

	const tableUtils = new Table(event.editor);

	headingCommands.forEach(heading => {
		event.editor.addCommand('tableHeading' + heading, {
			exec(_editor) {
				tableUtils.setHeading(null, heading);
			},
		});
	});
});

CKEDITOR.Table = CKEDITOR.Table || Table;
