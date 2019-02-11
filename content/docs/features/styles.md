---
description: Use this button to highlight important content.
layout: feature
title: Styles
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-styles.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: [{
						name: 'styles',
						cfg: {
							styles: [
								{
									name: 'Head 1',
									style: { element: 'h1' }
								},
								{
									name: 'Head 2',
									style: { element: 'h2' }
								},
								{
									name: 'Big',
									style: { element: 'big' }
								},
								{
									name: 'Small',
									style: { element: 'small' }
								},
								{
									name: 'Code',
									style: { element: 'code' }
								}
							]
						}
					}],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```