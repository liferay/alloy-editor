---
description: Give credit to other authors by properly quoting their words with this button.
layout: feature
title: Quote
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-quote.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['quote'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```