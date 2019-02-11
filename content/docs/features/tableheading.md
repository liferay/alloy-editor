---
description: Give structure and meaning to your data using the proper heading style.
layout: feature
title: Table - Heading
---
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