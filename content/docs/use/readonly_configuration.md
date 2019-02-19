---
title: Read only mode
description: AlloyEditor might be set to work in "read only" mode. In read only mode, changing the content will be not possible and clicking on a link will navigate to its URL instead to open a dialog for editing it.
order: 8
---

###### AlloyEditor might be set to work in "read only" mode. In read only mode, changing the content will be not possible and clicking on a link will navigate to its URL instead to open a dialog for editing it.

<article id="article1">

## Passing "readOnly" configuration property to the editor

The read only mode can be set by passing the <strong>readOnly</strong> property to the editor with value `true`:

```javascript
var editor = AlloyEditor.editable('editable', {
	readOnly: true
});
```

The value of the <code>readOnly</code> property might be `true` or `false`. If set to <code>true</code> this means changes to the content won't be possible and clicking on a link will navigate to its URL instead to open a dialog for changing it.

This behavior might be changed any time using the following code:

```javascript
var nativeEditor = editor.get('nativeEditor');
nativeEditor.setReadOnly(false);
```
This will make the content editable again.

</article>