---
description: Got pictures to share? Use this button to browse your device and attach awesome images to your document.
layout: feature
title: Image
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-image.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('myContentEditable', {
	toolbars: {
		add: {
			buttons: ['image']
		}
	}
});
```