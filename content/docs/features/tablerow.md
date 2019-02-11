---
description: Easily add and remove rows inside a table with this button.
layout: feature
title: Table - Rows
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-tablerow.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'table',
					buttons: ['tableRow'],
					test: AlloyEditor.SelectionTest.table
				}
			]
		}
	}
});
```