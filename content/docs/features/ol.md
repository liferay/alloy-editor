---
description: Need an ordered list? Easily turn paragraphs into list items with this button.
layout: feature
title: Lists (Numbered)
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-ol.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['ol'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```