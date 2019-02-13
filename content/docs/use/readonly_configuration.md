---
title: Read only mode
description: AlloyEditor might be set to work in "read only" mode. In read only mode, changing the content will be not possible and clicking on a link will navigate to its URL instead to open a dialog for editing it.
order: 8
---

###### AlloyEditor might be set to work in "read only" mode. In read only mode, changing the content will be not possible and clicking on a link will navigate to its URL instead to open a dialog for editing it.

<article id="article1">

## Passing "readOnly" configuration property to the editor

<p>
	The read only mode can be set by passing the <strong>readOnly</strong> property to the editor with value `true`:
</p>

```javascript
var editor = AlloyEditor.editable('editable', {
	readOnly: true
});
```

<p>
	The value of the <code>readOnly</code> property might be `true` or `false`. If set to <code>true</code> this means changes to the content won't be possible and clicking on a link will navigate to its URL instead to open a dialog for changing it.
</p>

<p>
	This behavior might be changed any time using the following code:
</p>

```javascript
var nativeEditor = editor.get('nativeEditor');
nativeEditor.setReadOnly(false);
```
<p>
	This will make the content editable again.
</p>

</article>