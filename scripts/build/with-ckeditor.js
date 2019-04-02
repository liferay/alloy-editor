import '../../lib/ckeditor/ckeditor';

import * as AlloyEditor from '../../src/adapter/main';

if (typeof window !== 'undefined') {
	window.CKEDITOR.disableAutoInline = true;
	window.AlloyEditor = AlloyEditor;
	AlloyEditor.VERSION = require('./version');
}

export {AlloyEditor};
