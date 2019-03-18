---
title: Basic use
description: Develop description.
order: 1
---

###### The section below assumes that you are using the default UI built on React. The AlloyEditor core is fully separated from the UI, so creating a UI based on another framework is very easy.

<article id="article1">

## Download AlloyEditor

Option 1) Download AlloyEditor from <a>here</a>, then unzip it.

Option 2) Install AlloyEditor via Bower (<code>bower install alloyeditor</code>)

Option 3) Install AlloyEditor via NPM (<code>npm install alloyeditor</code>)
</article>

<article id="article2">

## Copy and Paste

If you downloaded the zip file:

```text/html
<link href="alloy-editor/assets/alloy-editor-ocean-min.css" rel="stylesheet">
<script src="alloy-editor/alloy-editor-all-min.js"></script>
```

If you downloaded it via Bower:

```text/html
<link href="bower_components/alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean-min.css" rel="stylesheet">
<script src="bower_components/alloyeditor/dist/alloy-editor/alloy-editor-all-min.js"></script>
```

</article>

<article id="article3">

## Use AlloyEditor

<span class="code-header">Invoke the <code>editable</code> static method on AlloyEditor, passing the ID of the node you want to edit:</span>

```javascript
AlloyEditor.editable('myContentEditable');
```

That's everything you need to get started!

</article>