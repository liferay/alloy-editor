---
intro: Use this button to emphasize an important content.
layout: feature
title: Italic
---
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