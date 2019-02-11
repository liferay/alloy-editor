---
description: Strike through those small judgement lapses with this button!
layout: feature
title: Strike
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-strike.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: ['strike'],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```