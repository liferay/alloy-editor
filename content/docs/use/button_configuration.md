---
description: Changing the default configuration of the buttons is possible by passing configuration attributes to them and it will affect only the button behavior, without affecting their position in the Toolbars. Both configuring the Toolbars and the buttons can be used giving maximum flexibility.
layout: guide
title: Button configuration
order: 2
---

###### Changing the default configuration of the buttons is possible by passing configuration attributes to them and it will affect only the button behavior, without affecting their position in the Toolbars. Both configuring the Toolbars and the buttons can be used giving maximum flexibility.

<article id="article1">

## Passing configuration options to the buttons

<p>
	The buttons are configured via a common <strong>buttonCfg</strong> property, like this:
</p>

```javascript
var editor = AlloyEditor.editable('editable', {
	buttonCfg: {
	    bold: {
	        tabIndex: 1
	    }
	}
});
```

<p>
	The <code>buttonCfg</code> is the property which contains the configurations for the different buttons. In this example, <code>bold</code> is the name of the button, which has to be configured and <code>tabIndex</code> is the property with the new value of 1 (by default 0). Each button has a static property <strong>key</strong> which value is the button name as should be passed to the configuration.
</p>

</article>






