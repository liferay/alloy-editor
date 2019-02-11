---
description: No longer need this table? Get rid of it with this button in just one click!
layout: feature
title: Table - Remove
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-tableremove.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'table',
					buttons: ['tableRemove'],
					test: AlloyEditor.SelectionTest.table
				}
			]
		}
	}
});
```