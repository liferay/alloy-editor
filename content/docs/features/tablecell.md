---
description: Use this button to work with table cells (add, remove, merge, split...).
layout: feature
title: Table - Cells
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-tablecell.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'table',
					buttons: ['tableCell'],
					test: AlloyEditor.SelectionTest.table
				}
			]
		}
	}
});
```