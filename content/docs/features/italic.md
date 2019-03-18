---
intro: Use this button to emphasize important content.
layout: feature
title: Italic
---
###### Use this button to emphasize important content.

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-bold.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['italic'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```