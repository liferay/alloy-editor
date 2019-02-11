---
description: "Develop description."
layout: "guide"
title: "Use"
order: 1
---

###### The section below assumes that you are using the default UI, which is built using React. The AlloyEditor core is fully separated from the UI and creating another one based on any other framework is very easy.

<article id="article1">

## Download AlloyEditor

<p>Option 1) Download AlloyEditor from <a>here</a>, then unzip it.</p>

<p>Option 2) Install AlloyEditor via Bower (<code>bower install alloyeditor</code>)</p>

<p>Option 3) Install AlloyEditor via NPM (<code>npm install alloyeditor</code>)</p>
</article>

<article id="article2">

## Copy and Paste

<p>If you downloaded the zip file:</p>

```text/html
<link href="alloy-editor/assets/alloy-editor-ocean-min.css" rel="stylesheet">
<script src="alloy-editor/alloy-editor-all-min.js"></script>
```

<p>If you downloaded it via Bower:</p>

```text/html
<link href="bower_components/alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean-min.css" rel="stylesheet">
<script src="bower_components/alloyeditor/dist/alloy-editor/alloy-editor-all-min.js"></script>
```

</article>

<article id="article3">

## Use AlloyEditor

<span class="code-header">Invoke the <code>editable</code> static method on AlloyEditor passing the ID of the node you want to edit</span>

```javascript
AlloyEditor.editable('myContentEditable');
```

<p class="guide-note">And that is everything you need to get started!</p>

</article>