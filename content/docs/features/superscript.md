---
description: You're probably a mathematician eager to exponentiate a base if you need this button.
layout: feature
title: Superscript
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-superscript.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['superscript'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```