---
description: Use this button to turn paragraphs into unordered list items.
layout: feature
title: Lists (Bulleted)
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-ul.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['ul'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```