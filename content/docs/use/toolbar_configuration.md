---
description: AlloyEditor allows you to configure the Toolbars in the way you prefer. You will be able to remove some of the existing Toolbars, to add your own or to reorder the buttons in each Toolbar
title: Toolbar configuration
layout: guide
order: 60
---

###### AlloyEditor allows you to configure the Toolbars in the way you prefer. You will be able to remove some of the existing Toolbars, to add your own or to reorder the buttons in each Toolbar

<article id="article1">

## Default Configuration

<p>
    This is the default editor toolbars configuration
</p>

```javascript
var toolbars = {
  add: {
    buttons: ['image', 'camera', 'hline', 'table'],
    tabIndex: 2
  },
  styles: {
    selections: AlloyEditor.Selections,
    tabIndex: 1
  }
};
```
<p>
  where <code>AlloyEditor.Selections</code> is
</p>

```javascript
var Selections = [{
  name: 'link',
  buttons: ['linkEdit'],
  test: AlloyEditor.SelectionTest.link
}, {
  name: 'image',
  buttons: ['imageLeft', 'imageRight'],
  test: AlloyEditor.SelectionTest.image
}, {
  name: 'text',
  buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
  test: AlloyEditor.SelectionTest.text
}, {
  name: 'table',
  buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
  getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
  setPosition: AlloyEditor.SelectionSetPosition.table,
  test: AlloyEditor.SelectionTest.table
}];
```

<p>
  The configuration above represents two toolbars - for adding content (images, code, etc.) and modify content based on the current selection type. You may remove any of those and the toolbar won't be shown when user makes the corresponding selection.
</p>

<p>
  To remove the toolbar for adding content, just <strong>remove</strong> the property <em>add</em>
</p>

```javascript
var toolbars = {
  styles: {
    selections: AlloyEditor.Selections,
    tabIndex: 1
  }
};
```

</article>

<article id="article2">

## Configuring Buttons

<p>
  In the default UI, which uses React, some of the buttons accept configuration parameters so you can tailor them to suit your needs.
</p>

<p>
  Here is an example of a custom configuration for the <em>Styles</em> button inside a text selection
</p>

```javascript
var Selections = [{
  name: 'text',
  buttons: [
    {
      name: 'styles',
      cfg: {
          styles: [...]
      }
    },
    'bold', 'italic', 'underline', 'link', 'twitter'
  ],
  test: AlloyEditor.SelectionTest.text
}];
```
<p>
  In this case a different array of styles is passed to the Styles button, so they will be shown when user selects a text instead of the default ones.
</p>

</article>

<article id="article3">

## Reordering Buttons

<p>
  If you are not happy with the order of the buttons, you can just reorder them in the toolbar configuration. They will follow the order in which you specify them. For example, if you want the <em>table</em> button to appear before the <em>hline</em> button in the <em>Add</em> toolbar, you just need to do the following:
</p>

```javascript
var toolbars = {
    add: {
        buttons: ['table', 'hline', 'image', 'camera'],
        tabIndex: 2
    }
};
```

<p>
  If you remove a button from the buttons property of a toolbar, or from the selections in Styles toolbar, then this button won't be available when the toolbar gets visible.
</p>

</article>
