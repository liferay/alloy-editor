/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function() {
	'use strict';

	if (CKEDITOR.plugins.get('ae_tableresize')) {
		return;
	}

	let pxUnit = CKEDITOR.tools.cssLength;

	function getWidth(el) {
		return CKEDITOR.env.ie
			? el.$.clientWidth
			: parseInt(el.getComputedStyle('width'), 10);
	}

	function getBorderWidth(element, side) {
		let computed = element.getComputedStyle('border-' + side + '-width');

		let borderMap = {
			thin: '0px',
			medium: '1px',
			thick: '2px',
		};

		if (computed.indexOf('px') < 0) {
			// look up keywords
			if (
				computed in borderMap &&
				element.getComputedStyle('border-style') != 'none'
			) {
				computed = borderMap[computed];
			} else {
				computed = 0;
			}
		}

		return parseInt(computed, 10);
	}

	// Gets the table row that contains the most columns.
	function getMasterPillarRow(table) {
		let $rows = table.$.rows;

		let maxCells = 0;

		let cellsCount;

		let $elected;

		let $tr;

		for (let i = 0, len = $rows.length; i < len; i++) {
			$tr = $rows[i];
			cellsCount = $tr.cells.length;

			if (cellsCount > maxCells) {
				maxCells = cellsCount;
				$elected = $tr;
			}
		}

		return $elected;
	}

	function buildTableColumnPillars(table) {
		let pillars = [];

		let pillarIndex = -1;

		let rtl = table.getComputedStyle('direction') === 'rtl';

		// Get the raw row element that cointains the most columns.
		let $tr = getMasterPillarRow(table);

		// Get the tbody element and position, which will be used to set the
		// top and bottom boundaries.
		let tbody = new CKEDITOR.dom.element(table.$.tBodies[0]);

		let tbodyPosition = tbody.getDocumentPosition();

		// Loop thorugh all cells, building pillars after each one of them.
		for (let i = 0, len = $tr.cells.length; i < len; i++) {
			// Both the current cell and the successive one will be used in the
			// pillar size calculation.
			let td = new CKEDITOR.dom.element($tr.cells[i]);

			let nextTd =
				$tr.cells[i + 1] && new CKEDITOR.dom.element($tr.cells[i + 1]);

			pillarIndex += td.$.colSpan || 1;

			// Calculate the pillar boundary positions.
			let pillarLeft;
			let pillarRight;
			let pillarWidth;

			let x = td.getDocumentPosition().x;

			// Calculate positions based on the current cell.
			rtl
				? (pillarRight = x + getBorderWidth(td, 'left'))
				: (pillarLeft =
						x + td.$.offsetWidth - getBorderWidth(td, 'right'));

			// Calculate positions based on the next cell, if available.
			if (nextTd) {
				x = nextTd.getDocumentPosition().x;

				rtl
					? (pillarLeft =
							x +
							nextTd.$.offsetWidth -
							getBorderWidth(nextTd, 'right'))
					: (pillarRight = x + getBorderWidth(nextTd, 'left'));
			}
			// Otherwise calculate positions based on the table (for last cell).
			else {
				x = table.getDocumentPosition().x;

				rtl
					? (pillarLeft = x)
					: (pillarRight = x + table.$.offsetWidth);
			}

			pillarWidth = Math.max(pillarRight - pillarLeft, 4);

			// The pillar should reflects exactly the shape of the hovered
			// column border line.
			pillars.push({
				table: table,
				index: pillarIndex,
				x: pillarLeft,
				y: tbodyPosition.y,
				width: pillarWidth,
				height: tbody.$.offsetHeight,
				rtl: rtl,
			});
		}

		return pillars;
	}

	function getPillarAtPosition(pillars, positionX) {
		for (let i = 0, len = pillars.length; i < len; i++) {
			let pillar = pillars[i];

			if (positionX >= pillar.x && positionX <= pillar.x + pillar.width) {
				return pillar;
			}
		}

		return null;
	}

	function cancel(evt) {
		(evt.data || evt).preventDefault();
	}

	function ColumnResizer(editor, pillar) {
		let document;
		let isResizing;
		let move;
		let resizer;
		let resizing;
		let startOffset;
		let currentShift;

		let leftSideCells;

		let rightSideCells;

		let leftShiftBoundary;

		let rightShiftBoundary;

		function detach() {
			resizer.removeListener('mouseup', onMouseUp);
			resizer.removeListener('mousedown', onMouseDown);
			resizer.removeListener('mousemove', onMouseMove);
		}

		function resizeStart() {
			// Before starting to resize, figure out which cells to change
			// and the boundaries of this resizing shift.

			let columnIndex = pillar.index;

			let map = CKEDITOR.tools.buildTableMap(pillar.table);

			let leftColumnCells = [];

			let rightColumnCells = [];

			let leftMinSize = Number.MAX_VALUE;

			let rightMinSize = leftMinSize;

			let rtl = pillar.rtl;

			for (let i = 0, len = map.length; i < len; i++) {
				let row = map[i];

				let leftCell = row[columnIndex + (rtl ? 1 : 0)];

				let rightCell = row[columnIndex + (rtl ? 0 : 1)];

				leftCell = leftCell && new CKEDITOR.dom.element(leftCell);
				rightCell = rightCell && new CKEDITOR.dom.element(rightCell);

				if (!leftCell || !rightCell || !leftCell.equals(rightCell)) {
					leftCell &&
						(leftMinSize = Math.min(
							leftMinSize,
							getWidth(leftCell)
						));
					rightCell &&
						(rightMinSize = Math.min(
							rightMinSize,
							getWidth(rightCell)
						));

					leftColumnCells.push(leftCell);
					rightColumnCells.push(rightCell);
				}
			}

			// Cache the list of cells to be resized.
			leftSideCells = leftColumnCells;
			rightSideCells = rightColumnCells;

			// Cache the resize limit boundaries.
			leftShiftBoundary = pillar.x - leftMinSize;
			rightShiftBoundary = pillar.x + rightMinSize;

			resizer.setOpacity(0.5);
			startOffset = parseInt(resizer.getStyle('left'), 10);
			currentShift = 0;
			resizing = 1;

			resizer.on('mousemove', onMouseMove);

			// Prevent the native drag behavior otherwise 'mousemove' won't fire.
			document.on('dragstart', cancel);
		}

		function resizeEnd() {
			resizing = 0;

			resizer.setOpacity(0);

			currentShift && resizeColumn();

			let table = pillar.table;
			setTimeout(function() {
				table.removeCustomData('_cke_table_pillars');
			}, 0);

			document.removeListener('dragstart', cancel);
		}

		function resizeColumn() {
			let rtl = pillar.rtl;

			let cellsCount = rtl ? rightSideCells.length : leftSideCells.length;

			// Perform the actual resize to table cells, only for those by side of the pillar.
			for (let i = 0; i < cellsCount; i++) {
				let leftCell = leftSideCells[i];

				let rightCell = rightSideCells[i];

				const table = pillar.table;

				// Defer the resizing to avoid any interference among cells.
				CKEDITOR.tools.setTimeout(
					function(
						leftCell,
						leftOldWidth,
						rightCell,
						rightOldWidth,
						tableWidth,
						sizeShift
					) {
						// 1px is the minimum valid width (#11626).
						leftCell &&
							leftCell.setStyle(
								'width',
								pxUnit(Math.max(leftOldWidth + sizeShift, 1))
							);
						rightCell &&
							rightCell.setStyle(
								'width',
								pxUnit(Math.max(rightOldWidth - sizeShift, 1))
							);

						// If we're in the last cell, we need to resize the table as well
						if (tableWidth) {
							table.setStyle(
								'width',
								pxUnit(tableWidth + sizeShift * (rtl ? -1 : 1))
							);
						}
					},
					0,
					this,
					[
						leftCell,
						leftCell && getWidth(leftCell),
						rightCell,
						rightCell && getWidth(rightCell),
						(!leftCell || !rightCell) &&
							getWidth(table) +
								getBorderWidth(table, 'left') +
								getBorderWidth(table, 'right'),
						currentShift,
					]
				);
			}
		}

		function onMouseDown(evt) {
			cancel(evt);

			resizeStart();

			document.on('mouseup', onMouseUp, this);
		}

		function onMouseUp(evt) {
			evt.removeListener();

			resizeEnd();
		}

		function onMouseMove(evt) {
			move(evt.data.getPageOffset().x);
		}

		document = editor.document;

		resizer = CKEDITOR.dom.element.createFromHtml(
			'<div data-cke-temp=1 contenteditable=false unselectable=on ' +
				'style="position:absolute;cursor:col-resize;filter:alpha(opacity=0);opacity:0;' +
				'padding:0;background-color:#004;background-image:none;border:0px none;z-index:10"></div>',
			document
		);

		// Clean DOM when editor is destroyed.
		editor.on('destroy', function() {
			detach();

			resizer.remove();
		});

		// Place the resizer after body to prevent it
		// from being editable.
		document.getDocumentElement().append(resizer);

		resizer.setStyles({
			width: pxUnit(pillar.width),
			height: pxUnit(pillar.height),
			left: pxUnit(pillar.x),
			top: pxUnit(pillar.y),
		});

		resizer.on('mousedown', onMouseDown, this);

		document.getBody().setStyle('cursor', 'col-resize');

		// Display the resizer to receive events but don't show it,
		// only change the cursor to resizable shape.
		resizer.show();

		move = this.move = function(posX) {
			let resizerNewPosition =
				posX - Math.round(resizer.$.offsetWidth / 2);

			if (isResizing) {
				if (
					resizerNewPosition === leftShiftBoundary ||
					resizerNewPosition === rightShiftBoundary
				) {
					return;
				}

				resizerNewPosition = Math.max(
					resizerNewPosition,
					leftShiftBoundary
				);
				resizerNewPosition = Math.min(
					resizerNewPosition,
					rightShiftBoundary
				);

				currentShift = resizerNewPosition - startOffset;
			}

			resizer.setStyle('left', pxUnit(resizerNewPosition));
		};

		this.destroy = function() {
			detach();

			document.getBody().setStyle('cursor', 'auto');

			resizer.remove();
		};

		isResizing = this.isResizing = function() {
			return resizing;
		};
	}

	function clearPillarsCache(evt) {
		let target = evt.data.getTarget();

		if (evt.name === 'mouseout') {
			// Bypass interal mouse move.
			if (!target.is('table')) {
				return;
			}

			let dest = new CKEDITOR.dom.element(
				evt.data.$.relatedTarget || evt.data.$.toElement
			);
			while (dest && dest.$ && !dest.equals(target) && !dest.is('body')) {
				dest = dest.getParent();
			}
			if (!dest || dest.equals(target)) {
				return;
			}
		}

		target.getAscendant('table', 1).removeCustomData('_cke_table_pillars');
		evt.removeListener();
	}

	CKEDITOR.plugins.add('ae_tableresize', {
		requires: 'ae_tabletools',

		init: function(editor) {
			editor.on('contentDom', function() {
				let resizer;

				let editable = editor.editable();

				// In Classic editor it is better to use document
				// instead of editable so event will work below body.
				editable.attachListener(
					editable.isInline() ? editable : editor.document,
					'mousemove',
					function(evt) {
						evt = evt.data;

						let target = evt.getTarget();

						// FF may return document and IE8 some UFO (object with no nodeType property...)
						// instead of an element (#11823).
						if (target.type !== CKEDITOR.NODE_ELEMENT) {
							return;
						}

						let pageX = evt.getPageOffset().x;

						// If we're already attached to a pillar, simply move the
						// resizer.
						if (resizer) {
							if (resizer.isResizing()) {
								resizer.move(pageX);

								cancel(evt);

								return;
							} else {
								resizer.destroy();

								resizer = null;
							}
						}

						// Considering table, tr, td, tbody but nothing else.
						let table;
						let pillars;

						if (
							!target.is('table') &&
							!target.getAscendant('tbody', 1)
						) {
							return;
						}

						table = target.getAscendant('table', 1);

						// Make sure the table we found is inside the container
						// (eg. we should not use tables the editor is embedded within)
						if (!editor.editable().contains(table)) {
							return;
						}

						if (
							!(pillars = table.getCustomData(
								'_cke_table_pillars'
							))
						) {
							// Cache table pillars calculation result.
							table.setCustomData(
								'_cke_table_pillars',
								(pillars = buildTableColumnPillars(table))
							);
							table.on('mouseout', clearPillarsCache);
							table.on('mousedown', clearPillarsCache);
						}

						let pillar = getPillarAtPosition(pillars, pageX);

						if (pillar) {
							resizer = new ColumnResizer(editor, pillar);
						}
					}
				);
			});
		},
	});
})();
