---
description: Use this button to highlight important content.
layout: feature
title: Bold
---

###### Use this button to highlight important content.

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
					buttons: ['bold'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```