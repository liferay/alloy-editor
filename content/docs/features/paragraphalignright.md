---
description: Are you feeling adventurous? Or is that an address you want to show? Align any text you want to the right with this button!
layout: feature
title: Text Alignment - Right
---
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