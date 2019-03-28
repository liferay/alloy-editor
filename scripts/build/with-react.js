import * as AlloyEditor from '../../src/adapter/main';
import React from 'react';

if (typeof window !== 'undefined') {
	window.CKEDITOR.disableAutoInline = true;
	window.AlloyEditor = AlloyEditor;
	AlloyEditor.React = React;
}

export {AlloyEditor};
