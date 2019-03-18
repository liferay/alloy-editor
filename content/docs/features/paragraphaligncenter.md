---
description: Use this button to center your headers or footers in the document.
layout: feature
title: Text Alignment - Centered
---
###### Use this button to center your headers or footers in the document.

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