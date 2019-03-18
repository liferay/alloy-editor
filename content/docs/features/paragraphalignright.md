---
description: Are you feeling adventurous, or is there an address you want to show? Use this button to align text to the right!
layout: feature
title: Text Alignment - Right
---
###### Are you feeling adventurous, or is there an address you want to show? Use this button to align text to the right!

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-paragraphalignright.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['paragraphRight'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```