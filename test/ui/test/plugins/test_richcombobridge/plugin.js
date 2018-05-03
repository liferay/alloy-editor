CKEDITOR.plugins.add('test_richcombobridge', {
	init: function(editor) {
		if (editor.ui.addRichCombo) {
			var richComboentries = ['entry1', 'entry2', 'entry3'];

			editor.ui.addRichCombo('ButtonRichCombo', {
				label: 'Button 1',
				init: function() {
					this.startGroup('test_richcombo_group');

					for (var i = 0; i < richComboentries.length; i++) {
						var entryName = richComboentries[i];

						this.add(entryName, '<span>' + entryName + '</span>', entryName);
					}

					editor.fire('richComboInit');
				},
				onClick: function(value) {
					editor.fire('richComboClick', value);
				},
				onRender: function() {
					editor.fire('richComboRender');
				}
			});
		}
	}
});