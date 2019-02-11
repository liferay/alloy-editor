---
description: Use this button if you need to center an image.
layout: feature
title: Image Alignment - Center
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-imagealigncenter.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'image',
					buttons: ['imageCenter'],
					test: AlloyEditor.SelectionTest.image
				}
			]
		}
	}
});
```