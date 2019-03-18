---
title: Toolbar configuration
description: AlloyEditor's toolbars are completely configurable. You can remove some of the existing toolbars, add your own, and even reorder the buttons in each Toolbar.
order: 6
---

###### AlloyEditor's toolbars are completely configurable. You can remove some of the existing toolbars, add your own, and even reorder the buttons in each toolbar

<article id="article1">

## Default Configuration

This is the default configuration for the editor's toolbars:

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

<code>AlloyEditor.Selections</code> has the value below:

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

The configuration above represents two toolbars - one for adding content (images, code, etc.) and one for modifying content based on the current selection type. You can remove any of these features, and the toolbar won't be shown when a user makes the corresponding selection.

To remove the toolbar for adding content, <strong>remove</strong> the property <em>add</em>:

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

Some of the buttons in the default UI, which is built with React, accept configuration parameters that let you customize them.

Here is an example of a custom configuration for the <em>Styles</em> button inside a text selection:

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

In this case, a custom array of styles is passed to the Styles button, so they will be shown when a user selects text instead of the default ones.

</article>

<article id="article3">

## Reordering Buttons

If you are not happy with the order of the buttons, you can just reorder them in the toolbar configuration. They will follow the order in which you specify them. For example, if you want the <em>table</em> button to appear before the <em>hline</em> button in the <em>Add</em> toolbar, use the configuration below:

```javascript
var toolbars = {
    add: {
        buttons: ['table', 'hline', 'image', 'camera'],
        tabIndex: 2
    }
};
```

If you remove a button from the buttons property of a toolbar, or from the selections in Styles toolbar, the button won't be available when the toolbar is displayed.

</article>