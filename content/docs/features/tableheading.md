---
description: Use this button to give structure and meaning to your data with the proper heading style.
layout: feature
title: Table - Heading
---
###### Use this button to give structure and meaning to your data with the proper heading style.

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-tableheading.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'table',
					buttons: ['tableHeading'],
					test: AlloyEditor.SelectionTest.table
				}
			]
		}
	}
});
```