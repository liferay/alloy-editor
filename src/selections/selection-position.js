/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import ReactDOM from 'react-dom';

// Default gutter value for toolbar positioning

const DEFAULT_GUTTER = {
	left: 0,
	top: 0,
};

/**
 * Centers a Toolbar according to given rectangle
 *
 * @method centerToolbar
 * @param {Object} toolbar The toolbar to be centered
 * @param {Object} rect The rectangle according to which the Toolbar will be centered
 */
const centerToolbar = function(toolbar, rect) {
	const toolbarNode = ReactDOM.findDOMNode(toolbar);

	const nativeEditor = toolbar.context.editor.get('nativeEditor');
	const uiNode = nativeEditor.config.uiNode || document.body;
	const uiNodeStyle = getComputedStyle(uiNode);
	const uiNodeMarginLeft = parseInt(
		uiNodeStyle.getPropertyValue('margin-left'),
		10
	);
	const uiNodeMarginRight = parseInt(
		uiNodeStyle.getPropertyValue('margin-right'),
		10
	);
	const totalWidth =
		uiNodeMarginLeft + uiNode.clientWidth + uiNodeMarginRight;

	const halfNodeWidth = toolbarNode.offsetWidth / 2;
	const scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();

	const gutter = toolbar.props.gutter || DEFAULT_GUTTER;

	const widgetXY = toolbar.getWidgetXYPoint(
		rect.left + rect.width / 2 - scrollPosition.x,
		rect.top + scrollPosition.y,
		CKEDITOR.SELECTION_BOTTOM_TO_TOP
	);

	const caretPosition = nativeEditor.getSelection();
	const ranges = caretPosition.getRanges();
	let offsetHeight = 0;

	if (ranges && ranges.length === 1) {
		let startContainer = ranges[0].startContainer;
		if (startContainer.$.nodeType !== Node.ELEMENT_NODE) {
			startContainer = startContainer.getParent();
		}
		if (startContainer) {
			const startContainerClientRect = startContainer.getClientRect();
			offsetHeight = startContainerClientRect.y - rect.top;
		}
	}

	const scrollTop = uiNode ? uiNode.scrollTop : 0;

	const endPosition = [
		rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x,
		rect.top +
			offsetHeight -
			toolbarNode.offsetHeight +
			scrollPosition.y -
			gutter.top +
			scrollTop,
	];

	if (endPosition[0] < 0) {
		endPosition[0] = 0;
	} else if (endPosition[0] > totalWidth - toolbarNode.offsetWidth) {
		endPosition[0] = totalWidth - toolbarNode.offsetWidth;
	}

	toolbar.moveToPoint(widgetXY, endPosition);
};

/**
 * Sets the position of a toolbar according to the position of the selected image
 *
 * @method imageSelectionSetPosition
 * @param {Object} payload Payload, should contain the selection data for retrieving the
 * client rectangle of the selected image
 * @return {Boolean} True, in all cases
 */
const imageSelectionSetPosition = function(payload) {
	const selectionData = payload.selectionData
		? payload.selectionData
		: payload.editorEvent
		? payload.editorEvent.data.selectionData
		: null;

	if (selectionData && selectionData.element) {
		const nativeEditor = payload.editor.get('nativeEditor');
		const uiNode = nativeEditor.config.uiNode;

		const scrollTop = uiNode ? uiNode.scrollTop : 0;

		const rect = selectionData.element.getClientRect();
		rect.top += scrollTop;

		centerToolbar(this, rect);

		return true;
	}
};

/**
 * Sets the position of a toolbar according to the position of the selected image
 *
 * @method tableSelectionSetPosition
 * @param {Object} payload Object, which contains the selection data for retrieving the
 * client rectangle of the selected table
 * @return {Boolean} True, in all cases
 */
const tableSelectionSetPosition = function(payload) {
	const nativeEditor = payload.editor.get('nativeEditor');
	const uiNode = nativeEditor.config.uiNode;

	const scrollTop = uiNode ? uiNode.scrollTop : 0;

	const table = new CKEDITOR.Table(nativeEditor).getFromSelection();
	const rect = table.getClientRect();
	rect.top += scrollTop;

	centerToolbar(this, rect);

	return true;
};

const SelectionSetPosition = {
	image: imageSelectionSetPosition,
	table: tableSelectionSetPosition,
};

export default SelectionSetPosition;
