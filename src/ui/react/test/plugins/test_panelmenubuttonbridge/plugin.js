CKEDITOR.plugins.add('test_panelmenubuttonbridge', {
	init: function(editor) {
		editor.ui.addPanelMenuButton('ButtonPanelMenuButton', {
			onBlock: function(panel, block) {
				block.element.addClass('test_panelmenubuttonbridge');
				block.element.setHtml('<span>panelMenuContent</span>');
			}
		});
	}
});