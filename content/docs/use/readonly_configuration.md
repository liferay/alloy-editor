---
title: Read only mode
description: You can set AlloyEditor to "read only" mode. In read only mode, you can not edit content and links navigate to their URL instead of opening a dialog for editing them.
order: 8
---

###### You can set AlloyEditor to "read only" mode. In read only mode, you can not edit content and links navigate to their URL instead of opening a dialog for editing them.

<article id="article1">

## Passing "readOnly" configuration property to the editor

Read only mode can be set by passing the <strong>readOnly</strong> property to the editor with the value `true`:

```javascript
var editor = AlloyEditor.editable('editable', {
	readOnly: true
});
```

This behavior can be changed any time by setting the nativeEditor's read only property to <code>false</code>:

```javascript
var nativeEditor = editor.get('nativeEditor');
nativeEditor.setReadOnly(false);
```
This makes the content editable again.

</article>