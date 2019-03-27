import '../../lib/ckeditor/ckeditor';

import * as AlloyEditor from '../../src/adapter/main';
import React from 'react';

if (typeof window !== 'undefined') {
	window.CKEDITOR.disableAutoInline = true;
	window.AlloyEditor = AlloyEditor;
	window.AlloyEditor.React = React;
}

export {AlloyEditor, React};
export default AlloyEditor;
