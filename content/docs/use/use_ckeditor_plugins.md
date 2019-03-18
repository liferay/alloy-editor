---
title: How to use CKEditor Plugins?
description: Is there an existing CKEditor plugin you like? Chances are you will be able to use it with AlloyEditor as well!
order: 4
---

###### Some CKEDITOR plugins add buttons through their UI. This tutorial shows how to use this kind of plugin.

<article id="article1">

## 'font' Plugin example

<span class="code-header">Download <a alt="font plugin" href="http://ckeditor.com/addon/font">font plugin</a>, and paste it into the <strong>plugins folder</strong>:
</span>

> Note: Keep in mind, if this plugin has dependencies, you need to download and configure them as well.

</article>

<article id="article2">

## AlloyEditor Configuration

Our UI bridges make it easier for you to use CKEDITOR plugins. You just need to add the required plugins to the extraPlugins configuration and retrieve its buttons using <strong>AlloyEditor.getButtons(['PLUGIN_NAME', MORE_BUTTONS])</strong>:

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

If you want to add custom buttons to text selections, you can add them like this:

```javascript
  buttons: AlloyEditor.getButtons(['font', 'bold', 'italic', ...]),
```

If instead you want to add custom buttons with the existing buttons, you can add them like this:

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

AlloyEditor's UI Bridge is in its early stages, so there are still some uncovered areas. For example, dialogs are not converted and will still appear with CKEditor's default look and feel.

Use the new <strong>moono</strong> skin to close the gap between AlloyEditor's default look and feel and CKEditor's look and feel:

```text/html
  <link href="alloy-editor/assets/alloy-editor-moono-min.css" rel="stylesheet">
```

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/ckeditor_moono.gif"/>
</div>

</article>