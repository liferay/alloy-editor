CKEDITOR.plugins.add('test_menubuttonbridge', {
	init: function(editor) {
		var items = {
			item1: {
				command: 'item1',
				group: 'test_menubuttonbridge',
				label: 'item1'
			},
			item2: {
				group: 'test_menubuttonbridge',
				label: 'item2',
				onClick: function() {
					editor.execCommand('item2');
				}
			},
			item3: {
				group: 'unknown',
				label: 'item3'
			}
		};

		editor.addMenuGroup('test_menubuttonbridge', 1);
		editor.addMenuItems(items);

		if (editor.ui.addMenuButton) {
			editor.ui.addMenuButton('ButtonMenuButton', {
				onMenu: function() {
					return items;
				}
			});
		}
	}
});