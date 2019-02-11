---
description: Is there an existing CKEditor plugin you like? Chances are you will be able to use it with AlloyEditor as well!
layout: "guide"
title: How to use CKEditor Plugins?
order: 40
---

###### There are some CKEDITOR plugins that it add button through their UI. This tutorial is about using this kind of plugins.

<article id="article1">

## Example to use 'font' Plugin

<span class="code-header">You can download <a alt="font plugin" href="http://ckeditor.com/addon/font">font plugin</a> and, after that,
you can paste it into <strong>plugins folder</strong>
</span>

> Note: Keep in mind, if this plugin has dependencies, we need to download and to configure them too.

</article>

<article id="article2">

## Configuration AlloyEditor
<p>
  Our UI bridges allow us to use CKEDITOR plugin easier, you only need to add appropriates plugins to extraPlugins configuration and to retrieve its buttons using <strong>AlloyEditor.getButtons(['PLUGIN_NAME', MORE_BUTTONS])</strong>
</p>

```javascript
  AlloyEditor.editable('MyEditable', {
    extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ',font',
      toolbars: {
        styles: {
          selections: [
            {
              name: 'text',
              buttons: AlloyEditor.getButtons(['font']), //['FontFamily', 'FontSize']
              test: AlloyEditor.SelectionTest.text
            }
          ]
        }
      }
    }
  );
```

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/ckeditor_plugins.gif"/>
</div>

<p>
  If you want to customize and to add other buttons to text selections you can add them like this:
</p>

```javascript
  buttons: AlloyEditor.getButtons(['font', 'bold', 'italic', ...]),
```

<p>
 Or if you prefer to keep previous buttons you can do:
</p>

```javascript
  var selections = AlloyEditor.Selections;
  var textButtons = selections[3].buttons; // ['styles', 'bold, 'italic', 'underline', 'link', twitter']
  var customButtons = textButtons.concat('font'); // ['styles', 'bold, 'italic', 'underline', 'link', twitter', 'FontFamily', 'FontSize']

  selections[3].buttons = AlloyEditor.getButtons(customButtons);

  AlloyEditor.editable('MyEditable', {
    extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ',font'
    }
  );
```

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/ckeditor_ui_richcombo.png"/>
</div>


</article>

<article id="article3">

## Use moono skin for visual compatibility

<p>
  AlloyEditor's UI Bridge is in its early stages, so there are still some uncovered areas. For example, dialogs are not converted and will still appear with CKEditor's default look and feel.
</p>

Use the new <strong>moono</strong> skin to close the gap between AlloyEditor default look and feel and CKEditor's.

```text/html
  <link href="alloy-editor/assets/alloy-editor-moono-min.css" rel="stylesheet">
```

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/ckeditor_moono.gif"/>
</div>


</article>