---
description: Use this button to underline important content.
layout: feature
title: Underline
---
###### Use this button to underline important content.

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-underline.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['underline'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```