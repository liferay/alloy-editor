---
description: You ought to be a chemist if you need this button to specify the number of atoms in a chemical formula!
layout: feature
title: Subscript
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-subscript.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['subscript'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```