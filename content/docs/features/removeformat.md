---
description: If you're a minimalist, you can use this button to strip any styling from your content
layout: feature
title: Remove Format
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-removeformat.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['removeFormat'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```