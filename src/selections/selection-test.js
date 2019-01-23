var _isRangeAtElementEnd = function(range, element) {
	// Finding if a range is at the end of an element is somewhat tricky due to how CKEditor handles
	// ranges. It might depend on wether a source node inside the element is selected or not. For now,
	// we need to cover the following cases:
	//
	// - The text length of the element is the same as the endOffset of the range
	// - Both start and end containers match the element and the start and end offsets are 1

	return (
		element.getText().length === range.endOffset ||
		(element.equals(range.startContainer) &&
			element.equals(range.endContainer) &&
			range.startOffset === range.endOffset &&
			range.endOffset === 1)
	);
};

var embedSelectionTest = function(payload) {
	var selectionData = payload.data.selectionData;

	return !!(
		selectionData.element &&
		selectionData.element.getAttribute('data-widget') === 'ae_embed'
	);
};

const embedUrlSelectionTest = function(payload) {
	const selectionData = payload.data.selectionData;

	return !!(
		selectionData.element &&
		selectionData.element.getAttribute('data-widget') === 'embedurl'
	);
};

const headingTextSelectionTest = function(payload) {
	const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	const nativeEditor = payload.editor.get('nativeEditor');
	const selectionData = payload.data.selectionData;
	const selectionEmpty = nativeEditor.isSelectionEmpty();

	return !!(
		!selectionData.element &&
		selectionData.region &&
		!selectionEmpty &&
		!nativeEditor
			.getSelection()
			.getCommonAncestor()
			.isReadOnly() &&
		nativeEditor.elementPath().contains(headings)
	);
};

var linkSelectionTest = function(payload) {
	var nativeEditor = payload.editor.get('nativeEditor');
	var range = nativeEditor.getSelection().getRanges()[0];

	var element;

	return !!(
		nativeEditor.isSelectionEmpty() &&
		(element = new CKEDITOR.Link(nativeEditor).getFromSelection()) &&
		element.getText().length !== range.endOffset &&
		!element.isReadOnly() &&
		!_isRangeAtElementEnd(range, element)
	);
};

var imageSelectionTest = function(payload) {
	var selectionData = payload.data.selectionData;

	return !!(
		selectionData.element &&
		selectionData.element.getName() === 'img' &&
		!selectionData.element.isReadOnly()
	);
};

var textSelectionTest = function(payload) {
	var nativeEditor = payload.editor.get('nativeEditor');

	var selectionEmpty = nativeEditor.isSelectionEmpty();

	var selectionData = payload.data.selectionData;

	return !!(
		!selectionData.element &&
		selectionData.region &&
		!selectionEmpty &&
		!nativeEditor
			.getSelection()
			.getCommonAncestor()
			.isReadOnly()
	);
};

var tableSelectionTest = function(payload) {
	var nativeEditor = payload.editor.get('nativeEditor');

	var table = new CKEDITOR.Table(nativeEditor);
	var element = table.getFromSelection();

	return !!(element && table.isEditable(element));
};

const SelectionTest = {
	embed: embedSelectionTest,
	embedUrl: embedUrlSelectionTest,
	header: headingTextSelectionTest,
	image: imageSelectionTest,
	link: linkSelectionTest,
	table: tableSelectionTest,
	text: textSelectionTest,
};

export default SelectionTest;
