let _isRangeAtElementEnd = function(range, element) {
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

let embedSelectionTest = function(payload) {
	let selectionData = payload.data.selectionData;

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

let linkSelectionTest = function(payload) {
	let nativeEditor = payload.editor.get('nativeEditor');
	let range = nativeEditor.getSelection().getRanges()[0];
	let selectionData = payload.data.selectionData;

	let element = new CKEDITOR.Link(nativeEditor).getFromSelection();
	let isSelectionEmpty = nativeEditor.isSelectionEmpty();
	let elementIsNotImage = selectionData.element
		? selectionData.element.getName() !== 'img'
		: true;

	return !!(
		isSelectionEmpty &&
		elementIsNotImage &&
		element &&
		element.getText().length !== range.endOffset &&
		element &&
		!element.isReadOnly() &&
		!_isRangeAtElementEnd(range, element)
	);
};

let imageSelectionTest = function(payload) {
	let selectionData = payload.data.selectionData;

	return !!(
		selectionData.element &&
		selectionData.element.getName() === 'img' &&
		!selectionData.element.isReadOnly()
	);
};

let textSelectionTest = function(payload) {
	let nativeEditor = payload.editor.get('nativeEditor');

	let selectionEmpty = nativeEditor.isSelectionEmpty();

	let selectionData = payload.data.selectionData;

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

let tableSelectionTest = function(payload) {
	let nativeEditor = payload.editor.get('nativeEditor');

	let table = new CKEDITOR.Table(nativeEditor);
	let element = table.getFromSelection();

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
