---
description: Got any important text? Turn it into a big header with this button!
layout: feature
title: Heading 1
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-h1.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['h1'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```