---
description: Keep your inner geek happy using this button to show preformatted text.
layout: feature
title: Code
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-code.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['code'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```