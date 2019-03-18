---
description: Use this button to remove columns inside a table.
layout: feature
title: Table - Columns
---
###### Use this button to remove columns inside a table.

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-tablecol.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'table',
					buttons: ['tableColumn'],
					test: AlloyEditor.SelectionTest.table
				}
			]
		}
	}
});
```