---
title: Button configuration
description: You can pass configuration attributes to a button to change its default behavior, without affecting its position in the toolbar. You can combine this with a custom toolbar configuration to have maximum flexibility in your configuration.
order: 7
---

###### You can pass configuration attributes to a button to change its default behavior, without affecting its position in the toolbar. You can combine this with a custom toolbar configuration to have maximum flexibility in your configuration.

<article id="article1">

## Passing configuration options to the buttons

Buttons are configured via a common <strong>buttonCfg</strong> property, like this:

```javascript
var editor = AlloyEditor.editable('editable', {
	buttonCfg: {
	    bold: {
	        tabIndex: 1
	    }
	}
});
```

The example above creates a configuration for a button named <code>bold</code> with a <code>tabIndex</code> property set to 1 (default 0). You must pass the button's static <strong>key</strong> property (the button's name) in the configuration.

</article>