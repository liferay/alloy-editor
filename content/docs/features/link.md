---
intro: Use this button to highlight an important content.
layout: feature
title: Link
---
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