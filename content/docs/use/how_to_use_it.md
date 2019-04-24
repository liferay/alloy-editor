---
title: How to use it?
description: The section below assumes that you are using the default UI built on React. If you're using your own custom UI, these steps will be different.
order: 2
---

###### The section below assumes that you are using the default UI built on React. If you're using your own custom UI, these steps will be different.

<article id="add-css">

## Add AlloyEditor's CSS to the page

```text/html
<link href="alloy-editor/assets/alloy-editor-ocean-min.css" rel="stylesheet"></link>
```

</article>

<article id="add-js">

## Add AlloyEditor's JS to the page

There are a <strong>few ways</strong> to add the editor to the page:

<section>
  <span>Add the whole editor with all UI on the page:</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-all-min.js"></script>
  ```

  <span>Add it on the page, separating the CKEditor code from AlloyEditor. This is useful if you already use CKEditor in your project:</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-no-ckeditor-min.js"></script>
  ```

  <span>Add it on the page, separating the React code from AlloyEditor. This is useful if you already use React in your project:</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-no-react-min.js"></script>
  ```

  <span>If you use both React and CKEditor on your page, then just include AlloyEditor's core:</span>

  ```text/html
  <script src="alloy-editor/alloy-editor-core-min.js"></script>
  ```

</section>

</article>

<article id="polyfilling">

## Polyfilling older browsers

To work properly on older browsers such as IE11 you will need to ensure that you have the appropriate polyfills in your environment. These are:

- In order to correctly display icons, an SVG polyfill such as [svg4everybody](https://www.npmjs.com/package/svg4everybody).
- To provide `Symbol`, which is needed by React, a polyfill like [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill).

</article>

<article id="making-editable">

## Invoke the static editable method of AlloyEditor

```javascript
AlloyEditor.editable('myContentEditable');
```
</article>

<article id="getting-content">

## Retrieve the content from the editor

```javascript
var alloyEditor = AlloyEditor.editable('myContentEditable');

var content = alloyEditor.get('nativeEditor').getData();
```

</article>
