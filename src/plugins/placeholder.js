(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_placeholder')) {
        return;
    }

    /**
     * List of visual elements that must cause the placeholder text to disapper
     * @property
     * @type {array}
     */
    var noPlaceHolderElements = [
        'img',
        'hr',
        'pre',
        'table'
    ];

    /**
     * CKEDITOR enterMode config set the behavior of paragraphs
     * When the content is empty CKEDITOR keeps the enterMode string
     * into the content
     * @property
     * @type {string}
     */
    var brFiller = CKEDITOR.env.needsBrFiller ? '<br>' : '';

    /**
     * CKEditor plugin which allows adding a placeholder to the editor. In this case, if there
     * is no content to the editor, there will be hint to the user.
     *
     * @class CKEDITOR.plugins.ae_placeholder
     */

    /**
     * Specifies the placeholder class which have to be aded to editor when editor is not focused.
     *
     * @attribute placeholderClass
     * @default ae_placeholder
     * @type String
     */

    CKEDITOR.plugins.add(
        'ae_placeholder', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'blur' and 'contentDom' event listeners.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.on('blur', this._checkEmptyData, this);
                editor.on('change', this._checkEmptyData, this);
                editor.on('focus', this._removePlaceholderClass, this);
                editor.once('contentDom', this._checkEmptyData, this);
            },

            /**
             * Removes any data from the content and adds a class,
             * specified by the "placeholderClass" config attribute.
             *
             * @protected
             * @method _checkEmptyData
             * @param {CKEDITOR.dom.event} editor event, fired from CKEditor
             */
            _checkEmptyData: function(event) {
                var editor = event.editor;

                var editableNode = editor.editable();
                var editableElm = editableNode.$;
                var isEmpty = this._isElementEmpty(editableElm);

                if (isEmpty) {
                    editableNode.addClass(editor.config.placeholderClass);
                } else {
                    editableNode.removeClass(editor.config.placeholderClass);
                }
            },

            /**
             * Checks whether the given element is empty. 
             * The defenition of empty is if the element does not contain any non-visual 
             * element with non whitespace inner content
             * @param {DOMElement} elm
             * @return {boolean}
             */
            _isElementEmpty: function _isElementEmpty(elm) {
                var children;
                var innerHTML;
                
                if (!elm) return true;
                
                if (3 === elm.nodeType) {
                    innerHTML = elm.textContent;
                } else if (-1 !== noPlaceHolderElements.indexOf(elm.nodeName.toLowerCase())) {
                    return false;
                } else if (elm.innerHTML) {
                    innerHTML = elm.innerHTML.trim();
                }

                if (!innerHTML) return true;

                children = [].slice.call(elm.childNodes);

                if (0 === children.length) {
                    return 0 === innerHTML
                        .replace(/\s/g, '')
                        .replace(/\<br(\s)*\/?>/, '')
                        .length;
                }

                return children.map(function(child) {
                    return _isElementEmpty(child);
                })
                .every(function(isEmpty) { 
                    return isEmpty;
                });
            },

            /**
             * Remove placeholder class when input is focused
             *
             * @protected
             * @method _removePlaceholderClass
             + @param {CKEDITOR.dom.event} editor event, fired from CKEditor
             */
            _removePlaceholderClass: function(event) {
                var editor = event.editor;

                var editorNode = new CKEDITOR.dom.element(editor.element.$);

                editorNode.removeClass(editor.config.placeholderClass);
            }
        }
    );
}());