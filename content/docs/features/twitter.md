---
description: Did you just write the latest Trending Topic? You can use this button to let your readers share your thoughts on Twitter.
layout: feature
title: Twitter
---
###### Did you just write the latest Trending Topic? You can use this button to let your readers share your thoughts on Twitter.

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