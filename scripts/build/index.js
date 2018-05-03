import '../../lib/ckeditor/ckeditor.js';

import * as AlloyEditor from '../../src/adapter/main.js';

if (typeof window !== 'undefined') {
    window.CKEDITOR.disableAutoInline = true;
    window.AlloyEditor = AlloyEditor;
}

export { AlloyEditor };
export default AlloyEditor;
