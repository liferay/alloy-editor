import ReactDOM from 'react-dom';

// Default gutter value for toolbar positioning
let DEFAULT_GUTTER = {
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
let centerToolbar = function(toolbar, rect) {
	let toolbarNode = ReactDOM.findDOMNode(toolbar);

	let nativeEditor = toolbar.context.editor.get('nativeEditor');
	let uiNode = nativeEditor.config.uiNode || document.body;
	let uiNodeStyle = getComputedStyle(uiNode);
	let uiNodeMarginLeft = parseInt(
		uiNodeStyle.getPropertyValue('margin-left'),
		10
	);
	let uiNodeMarginRight = parseInt(
		uiNodeStyle.getPropertyValue('margin-right'),
		10
	);
	let totalWidth = uiNodeMarginLeft + uiNode.clientWidth + uiNodeMarginRight;

	let halfNodeWidth = toolbarNode.offsetWidth / 2;
	let scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();

	let gutter = toolbar.props.gutter || DEFAULT_GUTTER;

	let widgetXY = toolbar.getWidgetXYPoint(
		rect.left + rect.width / 2 - scrollPosition.x,
		rect.top + scrollPosition.y,
		CKEDITOR.SELECTION_BOTTOM_TO_TOP
	);

	let endPosition = [
		rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x,
		rect.top - toolbarNode.offsetHeight + scrollPosition.y - gutter.top,
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
let imageSelectionSetPosition = function(payload) {
	let selectionData = payload.selectionData
		? payload.selectionData
		: payload.editorEvent
		? payload.editorEvent.data.selectionData
		: null;

	if (selectionData && selectionData.element) {
		centerToolbar(this, selectionData.element.getClientRect());

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
let tableSelectionSetPosition = function(payload) {
	let nativeEditor = payload.editor.get('nativeEditor');
	let uiNode = nativeEditor.config.uiNode;

	let scrollTop = uiNode ? uiNode.scrollTop : 0;

	let table = new CKEDITOR.Table(nativeEditor).getFromSelection();
	let rect = table.getClientRect();
	rect.top += scrollTop;

	centerToolbar(this, rect);

	return true;
};

const SelectionSetPosition = {
	image: imageSelectionSetPosition,
	table: tableSelectionSetPosition,
};

export default SelectionSetPosition;
