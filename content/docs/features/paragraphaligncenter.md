---
description: For those headers or footers of yours... use this button to center them in the document.
layout: feature
title: Text Alignment - Centered
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-bold.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['paragraphCenter'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```