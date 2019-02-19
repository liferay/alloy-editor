import * as AlloyEditor from '../../src/adapter/main';

import EditorContext from '../../src/adapter/editor-context';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

if (!window.EditorContext) {
	window.EditorContext = EditorContext;
}

if (!window.React) {
	window.React = React;
}

if (!window.ReactDOM) {
	window.ReactDOM = ReactDOM;
}

if (!window.ReactTestUtils) {
	window.ReactTestUtils = ReactTestUtils;
}

if (!window.AlloyEditor) {
	window.AlloyEditor = AlloyEditor;
	window.ALLOYEDITOR_BASEPATH = 'dist/alloy-editor/';
}
