---
title: How to use it?
description: The section below assumes that you are using the default UI, which is built using React. The AlloyEditor core is fully separated from the UI and creating another one based on any other framework is very easy.
order: 2
---

###### The section below assumes that you are using the default UI, which is built using React. The AlloyEditor core is fully separated from the UI and creating another one based on any other framework is very easy.

<article id="article1">

## Add AlloyEditor's CSS to the page

```text/html
<link href="alloy-editor/assets/alloy-editor-ocean-min.css" rel="stylesheet"></link>
```

</article>

<article id="article2">

## Add AlloyEditor's JS to the page

There are a <strong>few ways</strong> to add the editor to the page:

<section>
  <span>Add the whole editor with all UI on the page</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-all-min.js"></script>
  ```

  <span>Add it on the page separating the CKEditor code from AlloyEditor. This is useful if in your project you already use CKEditor.</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-no-ckeditor-min.js"></script>
  ```

  <span>Add it on the page separating the React code from AlloyEditor. This is useful if you already use React in your project.</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-no-react-min.js"></script>
  ```

  <span>If you use both React and CKEditor on your page, then just include AlloyEditor's core</span>
  ```text/html
  <script src="alloy-editor/alloy-editor-core-min.js"></script>
  ```
</section>


</article>

<article id="article3">

## Invoke the static editable method of AlloyEditor

```javascript
AlloyEditor.editable('myContentEditable');
```
</article>

<article id="article4">

## Retrieve the content from the editor

```javascript
var alloyEditor = AlloyEditor.editable('myContentEditable');

var content = alloyEditor.get('nativeEditor').getData();
```

</article>