---
description: For the vintage writers out there, this button gives you left text alignment... as it should be.
layout: feature
title: Text Alignment - Left
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-paragraphalignleft.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['paragraphLeft'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```