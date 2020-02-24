/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const _isRangeAtElementEnd = function(range, element) {
	// Finding if a range is at the end of an element is somewhat tricky
	// due to how CKEditor handles ranges. It might depend on whether a
	// source node inside the element is selected or not. For now, we
	// need to cover the following cases:
	//
	// - The text length of the element is the same as the endOffset of
	//   the range.
	// - Both start and end containers match the element and the start
	//   and end offsets are 1.

	return (
		element.getText().length === range.endOffset ||
		(element.equals(range.startContainer) &&
			element.equals(range.endContainer) &&
			range.startOffset === range.endOffset &&
			range.endOffset === 1)
	);
};

const embedSelectionTest = function(payload) {
	const selectionData = payload.data.selectionData;

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

const linkSelectionTest = function(payload) {
	const nativeEditor = payload.editor.get('nativeEditor');
	const range = nativeEditor.getSelection().getRanges()[0];
	const selectionData = payload.data.selectionData;

	const element = new CKEDITOR.Link(nativeEditor).getFromSelection();
	const isSelectionEmpty = nativeEditor.isSelectionEmpty();
	const elementIsNotImage = selectionData.element
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

const imageSelectionTest = function(payload) {
	const selectionData = payload.data.selectionData;
	const element = selectionData.element;
	const hasImage = !!element && !!element.findOne('img');
	const isImage = !!element && element.getName() === 'img';

	return !!(element && (hasImage || isImage));
};

const textSelectionTest = function(payload) {
	const nativeEditor = payload.editor.get('nativeEditor');

	const selectionEmpty = nativeEditor.isSelectionEmpty();

	const selectionData = payload.data.selectionData;

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

const tableSelectionTest = function(payload) {
	const nativeEditor = payload.editor.get('nativeEditor');

	const table = new CKEDITOR.Table(nativeEditor);
	const element = table.getFromSelection();

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
