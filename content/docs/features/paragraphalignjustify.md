---
description: Do you hate mismatching lines? Use this button to justify your text!
layout: feature
title: Text Alignment - Justified
---
###### Do you hate mismatching lines? Use this button to justify your text!

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-paragraphalignjustify.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['paragraphJustify'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```