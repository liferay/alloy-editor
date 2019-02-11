---
description: Did you just write the latest Trending Topic? You can use this button to allow your readers to share your thoughts via Twitter.
layout: feature
title: Twitter
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-twitter.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		styles: {
			selections: [
				{
					name: 'text',
					buttons: [{
						name: 'twitter',
						cfg: {
							url: 'www.alloyeditor.com/features/twitter',
							via: '@alloyeditor'
						}
					}],
					test: AlloyEditor.SelectionTest.text
				}
			]
		}
	}
});
```