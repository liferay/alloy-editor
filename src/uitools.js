;(function() {
    'use strict';

    var UITools = {
        debounce: function(callback, timeout, context, args) {
            var callFn,
                debounceHandle;

            callFn = function() {
                var callContext,
                    calArgs;

                callContext = context || this;
                calArgs = args || arguments;

                clearTimeout(debounceHandle);

                debounceHandle = setTimeout(function() {
                    callback.apply(callContext, calArgs);
                }, timeout);
            };

            callFn.cancel = function() {
                clearTimeout(debounceHandle);
            };

            return callFn;
        },

        merge: function () {
            var i = 0,
                key,
                len = arguments.length,
                obj,
                result = {};

            for (; i < len; ++i) {
                obj = arguments[i];

                for (key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        result[key] = obj[key];
                    }
                }
           }

            return result;
        }
    };

    CKEDITOR.plugins.UITools = UITools;


    /**
     * Link utilities
     */

    function Link(editor) {
        this._editor = editor;
    }

    Link.prototype = {
        constructor: Link,

        create: function(URI, attrs) {
            var linkAttrs,
                range,
                selection,
                style,
                text;

            selection = this._editor.getSelection();

            range = selection.getRanges()[0];

            if (range.collapsed) {
                text = new CKEDITOR.dom.text(URI, this._editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

            linkAttrs = UITools.merge({
                'data-cke-saved-href': URI,
                href: URI
            }, attrs);

            style = new CKEDITOR.style({
                attributes: linkAttrs,
                element: 'a'
            });

            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, this._editor);
            range.select();
        },

        getFromSelection: function() {
            var range,
                selection,
                selectedElement;

            selection = this._editor.getSelection();

            selectedElement = selection.getSelectedElement();

            if (selectedElement && selectedElement.is('a')) {
                return selectedElement;
            }

            range = selection.getRanges()[0];

            if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);

                return this._editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }

            return null;
        },

        remove: function(link) {
            var style;

            style = link || new CKEDITOR.style({
                alwaysRemoveElement: 1,
                element: 'a',
                type: CKEDITOR.STYLE_INLINE
            });

            this._editor.removeStyle(style);
        },

        update: function(URI, link) {
            var style;

            style = link || this.getFromSelection();

            style.setAttributes({
                'data-cke-saved-href': URI,
                href: URI
            });
        }
    };

    /**
     * Add UITools plugin to CKEditor
     */

    CKEDITOR.plugins.add(
        'uitools',
        {
            init: function(editor) {
                CKEDITOR.plugins.UITools.Link = new Link(editor);
            }
        }
    );
}());