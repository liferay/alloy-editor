---
description: Easily add and remove columns inside a table with this button.
layout: feature
title: Table - Columns
---
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