---
intro: Use this button to highlight important content.
layout: feature
title: Link
---
###### Use this button to highlight important content.

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-link.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'link',
					buttons: ['linkEdit'],
					test: AlloyEditor.SelectionTest.link
				}
			]
		}
	}
});
```