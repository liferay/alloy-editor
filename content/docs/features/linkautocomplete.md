---
description: Add a link using autocomplete.
layout: feature
title: Link AutoComplete
---
<div class="thumbnail">
  <img class="img img-polaroid" src="/images/features/button-linkautocomplete.gif"/>
</div>

```javascript
var editor = AlloyEditor.editable('editable', {
    buttonCfg: {
        'linkEdit': {
            data: function(term) {
                return new Promise(function(resolve, reject) {
                    // Send request to the server and based on the `term`
                    // resolve the Promise with an array of items
                    // in the following format:
                    // [{title: 'Item1', url: 'http://liferay.com'}]
                });
            }
        }
    }
});
```