CKEDITOR.plugins.add('test_buttonbridge', {
	init: function(editor) {
		editor.addCommand('buttonCommand', {
			exec: function() {
				editor.fire('buttonCommand');
			},
		});

		if (editor.ui.addButton) {
			var buttonClickName = editor.config.buttonClickName;

			editor.ui.addButton('ButtonCommand', {
				command: 'buttonCommand',
			});

			editor.ui.addButton(buttonClickName, {
				onClick: function() {
					editor.fire('buttonClick');
				},
			});

			// Duplicated buttons should not override existing ones
			editor.ui.addButton(buttonClickName, {
				onClick: function() {
					editor.fire('buttonClick2');
				},
			});

			editor.ui.addButton('PasteFromWord', {
				command: 'pastefromword',
				label: 'Paste From Word',
			});
		}
	},
});
