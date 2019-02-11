---
description: Wondering how to indent and outdent a block of content? There are two buttons for that purpose, just include them to the text configuration and enjoy!
layout: feature
title: Indent and outdent block content
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-indent-outdent.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('editable', {
    toolbars: {
        styles: {
            selections: [
                {
                    name: 'text',
                    buttons: ['indentBlock', 'outdentBlock'],
                    test: AlloyEditor.SelectionTest.text
                }
            ]
        }
    }
});
```