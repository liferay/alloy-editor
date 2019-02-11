---
description: For that not-so-important content, use this button to turn text into a 2nd level heading.
layout: feature
title: Heading 2
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-h2.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['h2'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```