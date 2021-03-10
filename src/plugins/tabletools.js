/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

if (!CKEDITOR.plugins.get('ae_tabletools')) {
	const cellNodeRegex = /^(?:td|th)$/;

	function getSelectedCells(selection) {
		const ranges = selection.getRanges();
		const retval = [];
		const database = {};

		function moveOutOfCellGuard(node) {
			// Apply to the first cell only.

			if (retval.length > 0) {
				return;
			}

			// If we are exiting from the first </td>, then the td should definitely be
			// included.

			if (
				node.type == CKEDITOR.NODE_ELEMENT &&
				cellNodeRegex.test(node.getName()) &&
				!node.getCustomData('selected_cell')
			) {
				CKEDITOR.dom.element.setMarker(
					database,
					node,
					'selected_cell',
					true
				);
				retval.push(node);
			}
		}

		for (let i = 0; i < ranges.length; i++) {
			const range = ranges[i];

			if (range.collapsed) {
				// Walker does not handle collapsed ranges yet - fall back to old API.

				const startNode = range.getCommonAncestor();
				const nearestCell =
					startNode.getAscendant('td', true) ||
					startNode.getAscendant('th', true);
				if (nearestCell) {
					retval.push(nearestCell);
				}
			} else {
				const walker = new CKEDITOR.dom.walker(range);
				let node;
				walker.guard = moveOutOfCellGuard;

				while ((node = walker.next())) {
					// If may be possible for us to have a range like this:
					// <td>^1</td><td>^2</td>
					// The 2nd td shouldn't be included.
					//
					// So we have to take care to include a td we've entered only when we've
					// walked into its children.

					if (
						node.type != CKEDITOR.NODE_ELEMENT ||
						!node.is(CKEDITOR.dtd.table)
					) {
						const parent =
							node.getAscendant('td', true) ||
							node.getAscendant('th', true);
						if (parent && !parent.getCustomData('selected_cell')) {
							CKEDITOR.dom.element.setMarker(
								database,
								parent,
								'selected_cell',
								true
							);
							retval.push(parent);
						}
					}
				}
			}
		}

		CKEDITOR.dom.element.clearAllMarkers(database);

		return retval;
	}

	function getFocusElementAfterDelCells(cellsToDelete) {
		let i = 0;

		const last = cellsToDelete.length - 1;

		const database = {};

		let cell;

		let focusedCell;

		let tr;

		while ((cell = cellsToDelete[i++])) {
			CKEDITOR.dom.element.setMarker(database, cell, 'delete_cell', true);
		}

		// 1.first we check left or right side focusable cell row by row;

		i = 0;
		while ((cell = cellsToDelete[i++])) {
			if (
				((focusedCell = cell.getPrevious()) &&
					!focusedCell.getCustomData('delete_cell')) ||
				((focusedCell = cell.getNext()) &&
					!focusedCell.getCustomData('delete_cell'))
			) {
				CKEDITOR.dom.element.clearAllMarkers(database);

				return focusedCell;
			}
		}

		CKEDITOR.dom.element.clearAllMarkers(database);

		// 2. then we check the toppest row (outside the selection area square) focusable cell

		tr = cellsToDelete[0].getParent();
		if ((tr = tr.getPrevious())) {
			return tr.getLast();
		}

		// 3. last we check the lowerest  row focusable cell

		tr = cellsToDelete[last].getParent();
		if ((tr = tr.getNext())) {
			return tr.getChild(0);
		}

		return null;
	}

	function insertRow(editor, insertBefore) {
		const selection = editor.getSelection();

		const cells = getSelectedCells(selection);

		const firstCell = cells[0];

		const table = firstCell.getAscendant('table');

		const doc = firstCell.getDocument();

		const startRow = cells[0].getParent();

		const startRowIndex = startRow.$.rowIndex;

		const lastCell = cells[cells.length - 1];

		const endRowIndex =
			lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1;

		const endRow = new CKEDITOR.dom.element(table.$.rows[endRowIndex]);

		const rowIndex = insertBefore ? startRowIndex : endRowIndex;

		const row = insertBefore ? startRow : endRow;

		const map = CKEDITOR.tools.buildTableMap(table);

		const cloneRow = map[rowIndex];

		const nextRow = insertBefore ? map[rowIndex - 1] : map[rowIndex + 1];

		const width = map[0].length;

		const newRow = doc.createElement('tr');
		for (let i = 0; cloneRow[i] && i < width; i++) {
			let cell;

			// Check whether there's a spanning row here, do not break it.

			if (
				cloneRow[i].rowSpan > 1 &&
				nextRow &&
				cloneRow[i] == nextRow[i]
			) {
				cell = cloneRow[i];
				cell.rowSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element(cloneRow[i]).clone();
				cell.removeAttribute('rowSpan');
				cell.appendBogus();
				newRow.append(cell);
				cell = cell.$;
			}

			i += cell.colSpan - 1;
		}

		if (insertBefore) {
			newRow.insertBefore(row);
		} else {
			newRow.insertAfter(row);
		}

		const cell = new CKEDITOR.dom.element(newRow.$).getChild(
			cells[0] ? cells[0].$.cellIndex : 0
		);
		selectElement(editor, cell);
	}

	function deleteRows(selectionOrRow) {
		if (selectionOrRow instanceof CKEDITOR.dom.selection) {
			const cells = getSelectedCells(selectionOrRow);

			const firstCell = cells[0];

			const table = firstCell.getAscendant('table');

			const map = CKEDITOR.tools.buildTableMap(table);

			const startRow = cells[0].getParent();

			const startRowIndex = startRow.$.rowIndex;

			const lastCell = cells[cells.length - 1];

			const endRowIndex =
				lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1;

			const rowsToDelete = [];

			// Delete cell or reduce cell spans by checking through the table map.

			for (let i = startRowIndex; i <= endRowIndex; i++) {
				const mapRow = map[i];

				const row = new CKEDITOR.dom.element(table.$.rows[i]);

				for (let j = 0; j < mapRow.length; j++) {
					const cell = new CKEDITOR.dom.element(mapRow[j]);

					const cellRowIndex = cell.getParent().$.rowIndex;

					if (cell.$.rowSpan == 1) {
						cell.remove();
					}

					// Row spanned cell.
					else {
						// Span row of the cell, reduce spanning.

						cell.$.rowSpan -= 1;

						// Root row of the cell, root cell to next row.

						if (cellRowIndex == i) {
							const nextMapRow = map[i + 1];
							if (nextMapRow[j - 1]) {
								cell.insertAfter(
									new CKEDITOR.dom.element(nextMapRow[j - 1])
								);
							} else {
								new CKEDITOR.dom.element(
									table.$.rows[i + 1]
								).append(cell, 1);
							}
						}
					}

					j += cell.$.colSpan - 1;
				}

				rowsToDelete.push(row);
			}

			const rows = table.$.rows;

			// Where to put the cursor after rows been deleted?
			// 1. Into next sibling row if any;
			// 2. Into previous sibling row if any;
			// 3. Into table's parent element if it's the very last row.

			const cursorPosition = new CKEDITOR.dom.element(
				rows[endRowIndex + 1] ||
					(startRowIndex > 0 ? rows[startRowIndex - 1] : null) ||
					table.$.parentNode
			);

			for (let i = rowsToDelete.length; i >= 0; i--) {
				deleteRows(rowsToDelete[i]);
			}

			return cursorPosition;
		} else if (selectionOrRow instanceof CKEDITOR.dom.element) {
			const table = selectionOrRow.getAscendant('table');

			if (table.$.rows.length == 1) {
				table.remove();
			} else {
				selectionOrRow.remove();
			}
		}

		return null;
	}

	function getCellColIndex(cell, isStart) {
		const row = cell.getParent();

		const rowCells = row.$.cells;

		let colIndex = 0;
		for (let i = 0; i < rowCells.length; i++) {
			const mapCell = rowCells[i];
			colIndex += isStart ? 1 : mapCell.colSpan;
			if (mapCell == cell.$) {
				break;
			}
		}

		return colIndex - 1;
	}

	function getColumnsIndices(cells, isStart) {
		let retval = isStart ? Infinity : 0;
		for (let i = 0; i < cells.length; i++) {
			const colIndex = getCellColIndex(cells[i], isStart);
			if (isStart ? colIndex < retval : colIndex > retval) {
				retval = colIndex;
			}
		}

		return retval;
	}

	function insertColumn(editor, insertBefore) {
		const selection = editor.getSelection();

		const cells = getSelectedCells(selection);

		const firstCell = cells[0];

		const table = firstCell.getAscendant('table');

		const startCol = getColumnsIndices(cells, 1);

		const lastCol = getColumnsIndices(cells);

		const colIndex = insertBefore ? startCol : lastCol;

		const map = CKEDITOR.tools.buildTableMap(table);

		const cloneCol = [];

		const nextCol = [];

		const height = map.length;

		for (let i = 0; i < height; i++) {
			cloneCol.push(map[i][colIndex]);
			const nextCell = insertBefore
				? map[i][colIndex - 1]
				: map[i][colIndex + 1];
			nextCol.push(nextCell);
		}

		const insertedCells = [];
		for (let i = 0; i < height; i++) {
			let cell;

			if (!cloneCol[i]) {
				continue;
			}

			// Check whether there's a spanning column here, do not break it.

			if (cloneCol[i].colSpan > 1 && nextCol[i] == cloneCol[i]) {
				cell = cloneCol[i];
				cell.colSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element(cloneCol[i]).clone();
				cell.removeAttribute('colSpan');
				cell.appendBogus();
				cell[insertBefore ? 'insertBefore' : 'insertAfter'].call(
					cell,
					new CKEDITOR.dom.element(cloneCol[i])
				);
				cell = cell.$;
			}

			insertedCells[i] = cell;

			i += cell.rowSpan - 1;
		}

		const cell = new CKEDITOR.dom.element(
			insertedCells[firstCell.getParent().$.rowIndex]
		);
		selectElement(editor, cell);
	}

	function selectElement(editor, element) {
		const range = editor.createRange();

		range.moveToPosition(element, CKEDITOR.POSITION_AFTER_START);
		editor.getSelection().selectRanges([range]);
	}

	function deleteColumns(selectionOrCell) {
		const cells = getSelectedCells(selectionOrCell);

		const firstCell = cells[0];

		const lastCell = cells[cells.length - 1];

		const table = firstCell.getAscendant('table');

		const map = CKEDITOR.tools.buildTableMap(table);

		let startColIndex;

		let endColIndex;

		const rowsToDelete = [];

		let rows;

		// Figure out selected cells' column indices.

		for (let i = 0, rows = map.length; i < rows; i++) {
			// eslint-disable-next-line sort-vars
			for (let j = 0, cols = map[i].length; j < cols; j++) {
				if (map[i][j] == firstCell.$) {
					startColIndex = j;
				}
				if (map[i][j] == lastCell.$) {
					endColIndex = j;
				}
			}
		}

		// Delete cell or reduce cell spans by checking through the table map.

		for (let i = startColIndex; i <= endColIndex; i++) {
			for (let j = 0; j < map.length; j++) {
				const mapRow = map[j];

				const row = new CKEDITOR.dom.element(table.$.rows[j]);

				const cell = new CKEDITOR.dom.element(mapRow[i]);

				if (cell.$) {
					if (cell.$.colSpan == 1) {
						cell.remove();
					}

					// Reduce the col spans.
					else {
						cell.$.colSpan -= 1;
					}

					j += cell.$.rowSpan - 1;

					if (!row.$.cells.length) {
						rowsToDelete.push(row);
					}
				}
			}
		}

		const firstRowCells = table.$.rows[0] && table.$.rows[0].cells;

		// Where to put the cursor after columns been deleted?
		// 1. Into next cell of the first row if any;
		// 2. Into previous cell of the first row if any;
		// 3. Into table's parent element;

		const cursorPosition = new CKEDITOR.dom.element(
			firstRowCells[startColIndex] ||
				(startColIndex
					? firstRowCells[startColIndex - 1]
					: table.$.parentNode)
		);

		// Delete table rows only if all columns are gone (do not remove empty row).

		if (rowsToDelete.length == rows) {
			table.remove();
		}

		return cursorPosition;
	}

	function insertCell(selection, insertBefore) {
		const startElement = selection.getStartElement();
		const cell =
			startElement.getAscendant('td', 1) ||
			startElement.getAscendant('th', 1);

		if (!cell) {
			return;
		}

		// Create the new cell element to be added.

		const newCell = cell.clone();
		newCell.appendBogus();

		if (insertBefore) {
			newCell.insertBefore(cell);
		} else {
			newCell.insertAfter(cell);
		}
	}

	function deleteCells(selectionOrCell) {
		if (selectionOrCell instanceof CKEDITOR.dom.selection) {
			const cellsToDelete = getSelectedCells(selectionOrCell);
			const table =
				cellsToDelete[0] && cellsToDelete[0].getAscendant('table');
			const cellToFocus = getFocusElementAfterDelCells(cellsToDelete);

			for (let i = cellsToDelete.length - 1; i >= 0; i--) {
				deleteCells(cellsToDelete[i]);
			}

			if (cellToFocus) {
				placeCursorInCell(cellToFocus, true);
			} else if (table) {
				table.remove();
			}
		} else if (selectionOrCell instanceof CKEDITOR.dom.element) {
			const tr = selectionOrCell.getParent();
			if (tr.getChildCount() == 1) {
				tr.remove();
			} else {
				selectionOrCell.remove();
			}
		}
	}

	// Remove filler at end and empty spaces around the cell content.

	function trimCell(cell) {
		const bogus = cell.getBogus();
		if (bogus) {
			bogus.remove();
		}
		cell.trim();
	}

	function placeCursorInCell(cell, placeAtEnd) {
		const docInner = cell.getDocument();

		const docOuter = CKEDITOR.document;

		// Fixing "Unspecified error" thrown in IE10 by resetting
		// selection the dirty and shameful way (#10308).
		// We can not apply this hack to IE8 because
		// it causes error (#11058).

		if (CKEDITOR.env.ie && CKEDITOR.env.version == 10) {
			docOuter.focus();
			docInner.focus();
		}

		const range = new CKEDITOR.dom.range(docInner);
		if (
			!range['moveToElementEdit' + (placeAtEnd ? 'End' : 'Start')](cell)
		) {
			range.selectNodeContents(cell);
			range.collapse(placeAtEnd ? false : true);
		}
		range.select(true);
	}

	function cellInRow(tableMap, rowIndex, cell) {
		const oRow = tableMap[rowIndex];
		if (typeof cell == 'undefined') {
			return oRow;
		}

		for (let c = 0; oRow && c < oRow.length; c++) {
			if (cell.is && oRow[c] == cell.$) {
				return c;
			} else if (c == cell) {
				return new CKEDITOR.dom.element(oRow[c]);
			}
		}

		return cell.is ? -1 : null;
	}

	function cellInCol(tableMap, colIndex) {
		const oCol = [];
		for (let r = 0; r < tableMap.length; r++) {
			const row = tableMap[r];
			oCol.push(row[colIndex]);

			// Avoid adding duplicate cells.

			if (row[colIndex].rowSpan > 1) {
				r += row[colIndex].rowSpan - 1;
			}
		}

		return oCol;
	}

	function mergeCells(selection, mergeDirection, isDetect) {
		const cells = getSelectedCells(selection);

		// Invalid merge request if:
		// 1. In batch mode despite that less than two selected.
		// 2. In solo mode while not exactly only one selected.
		// 3. Cells distributed in different table groups (e.g. from both thead and tbody).

		let commonAncestor;
		if (
			(mergeDirection ? cells.length != 1 : cells.length < 2) ||
			((commonAncestor = selection.getCommonAncestor()) &&
				commonAncestor.type == CKEDITOR.NODE_ELEMENT &&
				commonAncestor.is('table'))
		) {
			return false;
		}

		let cell;

		const firstCell = cells[0];

		const table = firstCell.getAscendant('table');

		const map = CKEDITOR.tools.buildTableMap(table);

		const mapHeight = map.length;

		const mapWidth = map[0].length;

		const startRow = firstCell.getParent().$.rowIndex;

		const startColumn = cellInRow(map, startRow, firstCell);

		if (mergeDirection) {
			let targetCell;
			try {
				const rowspan =
					parseInt(firstCell.getAttribute('rowspan'), 10) || 1;
				const colspan =
					parseInt(firstCell.getAttribute('colspan'), 10) || 1;

				targetCell =
					map[
						mergeDirection == 'up'
							? startRow - rowspan
							: mergeDirection == 'down'
							? startRow + rowspan
							: startRow
					][
						mergeDirection == 'left'
							? startColumn - colspan
							: mergeDirection == 'right'
							? startColumn + colspan
							: startColumn
					];
			} catch (er) {
				return false;
			}

			// 1. No cell could be merged.
			// 2. Same cell actually.

			if (!targetCell || firstCell.$ == targetCell) {
				return false;
			}

			// Sort in map order regardless of the DOM sequence.

			cells[
				mergeDirection == 'up' || mergeDirection == 'left'
					? 'unshift'
					: 'push'
			](new CKEDITOR.dom.element(targetCell));
		}

		// Start from here are merging way ignorance (merge up/right, batch merge).

		const doc = firstCell.getDocument();

		let lastRowIndex = startRow;

		let totalRowSpan = 0;

		let totalColSpan = 0;

		// Use a documentFragment as buffer when appending cell contents.

		const frag = !isDetect && new CKEDITOR.dom.documentFragment(doc);

		let dimension = 0;

		for (let i = 0; i < cells.length; i++) {
			cell = cells[i];

			const tr = cell.getParent();

			const cellFirstChild = cell.getFirst();

			const colSpan = cell.$.colSpan;

			const rowSpan = cell.$.rowSpan;

			const rowIndex = tr.$.rowIndex;

			const colIndex = cellInRow(map, rowIndex, cell);

			// Accumulated the actual places taken by all selected cells.

			dimension += colSpan * rowSpan;

			// Accumulated the maximum virtual spans from column and row.

			totalColSpan = Math.max(
				totalColSpan,
				colIndex - startColumn + colSpan
			);
			totalRowSpan = Math.max(
				totalRowSpan,
				rowIndex - startRow + rowSpan
			);

			if (!isDetect) {
				// Trim all cell fillers and check to remove empty cells.

				if ((trimCell(cell), cell.getChildren().count())) {
					// Merge vertically cells as two separated paragraphs.

					if (
						rowIndex != lastRowIndex &&
						cellFirstChild &&
						!(
							cellFirstChild.isBlockBoundary &&
							cellFirstChild.isBlockBoundary({br: 1})
						)
					) {
						const last = frag.getLast(
							CKEDITOR.dom.walker.whitespaces(true)
						);
						if (last && !(last.is && last.is('br'))) {
							frag.append('br');
						}
					}

					cell.moveChildren(frag);
				}
				if (i) {
					cell.remove();
				} else {
					cell.setHtml('');
				}
			}
			lastRowIndex = rowIndex;
		}

		if (!isDetect) {
			frag.moveChildren(firstCell);

			firstCell.appendBogus();

			if (totalColSpan >= mapWidth) {
				firstCell.removeAttribute('rowSpan');
			} else {
				firstCell.$.rowSpan = totalRowSpan;
			}

			if (totalRowSpan >= mapHeight) {
				firstCell.removeAttribute('colSpan');
			} else {
				firstCell.$.colSpan = totalColSpan;
			}

			// Swip empty <tr> left at the end of table due to the merging.

			const trs = new CKEDITOR.dom.nodeList(table.$.rows);

			let count = trs.count();

			for (let i = count - 1; i >= 0; i--) {
				const tailTr = trs.getItem(i);
				if (!tailTr.$.cells.length) {
					tailTr.remove();
					count++;
					continue;
				}
			}

			return firstCell;
		}

		// Be able to merge cells only if actual dimension of selected
		// cells equals to the caculated rectangle.
		else {
			return totalRowSpan * totalColSpan == dimension;
		}
	}

	function verticalSplitCell(selection, isDetect) {
		const cells = getSelectedCells(selection);
		if (cells.length > 1) {
			return false;
		} else if (isDetect) {
			return true;
		}

		const cell = cells[0];

		const tr = cell.getParent();

		const table = tr.getAscendant('table');

		const map = CKEDITOR.tools.buildTableMap(table);

		const rowIndex = tr.$.rowIndex;

		const colIndex = cellInRow(map, rowIndex, cell);

		const rowSpan = cell.$.rowSpan;

		let newCell;

		let newRowSpan;

		let newCellRowSpan;

		let newRowIndex;

		if (rowSpan > 1) {
			newRowSpan = Math.ceil(rowSpan / 2);
			newCellRowSpan = Math.floor(rowSpan / 2);
			newRowIndex = rowIndex + newRowSpan;
			const newCellTr = new CKEDITOR.dom.element(
				table.$.rows[newRowIndex]
			);

			const newCellRow = cellInRow(map, newRowIndex);

			let candidateCell;

			newCell = cell.clone();

			// Figure out where to insert the new cell by checking the vitual row.

			for (let c = 0; c < newCellRow.length; c++) {
				candidateCell = newCellRow[c];

				// Catch first cell actually following the column.

				if (candidateCell.parentNode == newCellTr.$ && c > colIndex) {
					newCell.insertBefore(
						new CKEDITOR.dom.element(candidateCell)
					);
					break;
				} else {
					candidateCell = null;
				}
			}

			// The destination row is empty, append at will.

			if (!candidateCell) {
				newCellTr.append(newCell);
			}
		} else {
			newCellRowSpan = newRowSpan = 1;

			const newCellTr = tr.clone();
			newCellTr.insertAfter(tr);
			newCellTr.append((newCell = cell.clone()));

			const cellsInSameRow = cellInRow(map, rowIndex);
			for (let i = 0; i < cellsInSameRow.length; i++) {
				cellsInSameRow[i].rowSpan++;
			}
		}

		newCell.appendBogus();

		cell.$.rowSpan = newRowSpan;
		newCell.$.rowSpan = newCellRowSpan;
		if (newRowSpan == 1) {
			cell.removeAttribute('rowSpan');
		}
		if (newCellRowSpan == 1) {
			newCell.removeAttribute('rowSpan');
		}

		return newCell;
	}

	function horizontalSplitCell(selection, isDetect) {
		const cells = getSelectedCells(selection);
		if (cells.length > 1) {
			return false;
		} else if (isDetect) {
			return true;
		}

		const cell = cells[0];

		const tr = cell.getParent();

		const table = tr.getAscendant('table');

		const map = CKEDITOR.tools.buildTableMap(table);

		const rowIndex = tr.$.rowIndex;

		const colIndex = cellInRow(map, rowIndex, cell);

		const colSpan = cell.$.colSpan;

		let newColSpan;

		let newCellColSpan;

		if (colSpan > 1) {
			newColSpan = Math.ceil(colSpan / 2);
			newCellColSpan = Math.floor(colSpan / 2);
		} else {
			newCellColSpan = newColSpan = 1;
			const cellsInSameCol = cellInCol(map, colIndex);
			for (let i = 0; i < cellsInSameCol.length; i++) {
				cellsInSameCol[i].colSpan++;
			}
		}
		const newCell = cell.clone();
		newCell.insertAfter(cell);
		newCell.appendBogus();

		cell.$.colSpan = newColSpan;
		newCell.$.colSpan = newCellColSpan;
		if (newColSpan == 1) {
			cell.removeAttribute('colSpan');
		}
		if (newCellColSpan == 1) {
			newCell.removeAttribute('colSpan');
		}

		return newCell;
	}

	CKEDITOR.plugins.add('ae_tabletools', {
		init(editor) {
			function createDef(def) {
				return CKEDITOR.tools.extend(def || {}, {
					contextSensitive: 1,
					refresh(editor, path) {
						this.setState(
							path.contains({td: 1, th: 1}, 1)
								? CKEDITOR.TRISTATE_OFF
								: CKEDITOR.TRISTATE_DISABLED
						);
					},
				});
			}
			function addCmd(name, def) {
				let cmd = editor.getCommand(name);

				if (cmd) {
					return;
				}

				cmd = editor.addCommand(name, def);
				editor.addFeature(cmd);
			}

			addCmd(
				'rowDelete',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						const selection = editor.getSelection();
						placeCursorInCell(deleteRows(selection));
					},
				})
			);

			addCmd(
				'rowInsertBefore',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						insertRow(editor, true);
					},
				})
			);

			addCmd(
				'rowInsertAfter',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						insertRow(editor);
					},
				})
			);

			addCmd(
				'columnDelete',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						const selection = editor.getSelection();
						const element = deleteColumns(selection);
						if (element) {
							placeCursorInCell(element, true);
						}
					},
				})
			);

			addCmd(
				'columnInsertBefore',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						insertColumn(editor, true);
					},
				})
			);

			addCmd(
				'columnInsertAfter',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						insertColumn(editor);
					},
				})
			);

			addCmd(
				'cellDelete',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						const selection = editor.getSelection();
						deleteCells(selection);
					},
				})
			);

			addCmd(
				'cellMerge',
				createDef({
					allowedContent: 'td[colspan,rowspan]',
					requiredContent: 'td[colspan,rowspan]',
					exec(editor) {
						placeCursorInCell(
							mergeCells(editor.getSelection()),
							true
						);
					},
				})
			);

			addCmd(
				'cellMergeRight',
				createDef({
					allowedContent: 'td[colspan]',
					requiredContent: 'td[colspan]',
					exec(editor) {
						placeCursorInCell(
							mergeCells(editor.getSelection(), 'right'),
							true
						);
					},
				})
			);

			addCmd(
				'cellMergeDown',
				createDef({
					allowedContent: 'td[rowspan]',
					requiredContent: 'td[rowspan]',
					exec(editor) {
						placeCursorInCell(
							mergeCells(editor.getSelection(), 'down'),
							true
						);
					},
				})
			);

			addCmd(
				'cellVerticalSplit',
				createDef({
					allowedContent: 'td[rowspan]',
					requiredContent: 'td[rowspan]',
					exec(editor) {
						placeCursorInCell(
							verticalSplitCell(editor.getSelection())
						);
					},
				})
			);

			addCmd(
				'cellHorizontalSplit',
				createDef({
					allowedContent: 'td[colspan]',
					requiredContent: 'td[colspan]',
					exec(editor) {
						placeCursorInCell(
							horizontalSplitCell(editor.getSelection())
						);
					},
				})
			);

			addCmd(
				'cellInsertBefore',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						const selection = editor.getSelection();
						insertCell(selection, true);
					},
				})
			);

			addCmd(
				'cellInsertAfter',
				createDef({
					requiredContent: 'table',
					exec(editor) {
						const selection = editor.getSelection();
						insertCell(selection);
					},
				})
			);
		},

		getSelectedCells,
	});
}

/**
 * Create a two-dimension array that reflects the actual layout of table cells,
 * with cell spans, with mappings to the original td elements.
 *
 * @param {CKEDITOR.dom.element} table
 * @member CKEDITOR.tools
 */
CKEDITOR.tools.buildTableMap = function(table) {
	const aRows = table.$.rows;

	// Row and Column counters.

	let r = -1;

	const aMap = [];

	for (let i = 0; i < aRows.length; i++) {
		r++;
		if (!aMap[r]) {
			aMap[r] = [];
		}

		let c = -1;

		for (let j = 0; j < aRows[i].cells.length; j++) {
			const oCell = aRows[i].cells[j];

			c++;
			while (aMap[r][c]) {
				c++;
			}

			const iColSpan = isNaN(oCell.colSpan) ? 1 : oCell.colSpan;
			const iRowSpan = isNaN(oCell.rowSpan) ? 1 : oCell.rowSpan;

			for (let rs = 0; rs < iRowSpan; rs++) {
				if (!aMap[r + rs]) {
					aMap[r + rs] = [];
				}

				for (let cs = 0; cs < iColSpan; cs++) {
					aMap[r + rs][c + cs] = aRows[i].cells[j];
				}
			}

			c += iColSpan - 1;
		}
	}

	return aMap;
};
