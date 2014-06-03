function mixCKEditor(editor) {
	Y.mix(this.editor, Y.LAOEditorBase, false, null, 2);

	
}

Y.LAOEditor = CKEDITOR;

Y.Do.after(mixCKEditor, CKEDITOR, 'inline', CKEDITOR);