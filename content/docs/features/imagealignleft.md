---
description: Use this button if you need to align an image to the left on the text.
layout: feature
title: Image Alignment - Left
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-imagealignleft.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'image',
					buttons: ['imageLeft'],
					test: AlloyEditor.SelectionTest.image
				}
			]
		}
	}
});
```