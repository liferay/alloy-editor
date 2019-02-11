---
description: Use this button if you need to align an image to the right on the text.
layout: feature
title: Image Alignment - Right
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-imagealignright.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'image',
					buttons: ['imageRight'],
					test: AlloyEditor.SelectionTest.image
				}
			]
		}
	}
});
```