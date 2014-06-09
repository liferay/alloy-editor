YUI.add('toolbar-styles', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
        YObject = Y.Object,
        YNode = Y.Node,

    ToolbarStyles = Y.Base.create('toolbarstyles', Y.ToolbarBase, [], {
        initializer: function() {
            var styles;

            styles = {};

            YArray.each(
                this.STYLES,
                function(item) {
                    styles[item] = {
                        name: item,
                        style: new CKEDITOR.style({
                            element: item
                        })
                    };
                }
            );

            this._styles = styles;
        },

        bindUI: function() {
            var contentBox;

            contentBox = this.get('contentBox');

            this.on('visibleChange', function(event) {
                if (event.newVal) {
                    this._updateUI();
                }
                else {
                    if (this._linkContainer) {
                        this._linkContainer.addClass('hide');
                        this._buttonsContainer.removeClass('hide');
                    }
                }
            });

            if (this._linkInput) {
                this._linkInput.on('keypress', function(event) {
                    if (event.charCode === 13) {
                        this.hide();
                    }
                });
            }
        },

        destructor: function() {
            (new Y.EventHandle(this._buttons)).destroy();
        },

        renderUI: function() {
            var instance = this,
                buttonsConfig,
                buttonsContainer,
                contentBox,
                linkContainer;

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            this._renderButtons(buttonsContainer);

            contentBox = this.get('contentBox');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;

            buttonsConfig = instance.get('buttons');

            if (YArray.indexOf(buttonsConfig, 'a') >= 0) {
                linkContainer = YNode.create(
                    Lang.sub(
                        instance.TPL_LINK_CONTAINER, {
                            placeholder: this.get('strings').linkPlaceholder
                        }
                    )
                );

                contentBox.appendChild(linkContainer);

                instance._linkContainer = linkContainer;

                instance._linkInput = linkContainer.one('input');
            }
        },

        showAtPoint: function(left, top, direction) {
            var xy;

            this.show();

            xy = this._getToolbarXYPoint(left, top, direction);

            this.set('xy', xy);

        },

        _applyStyle: function(event, params) {
            var btnInst = event.target,
                editor,
                style;

            style = this._styles[params.button].style;

            if (style) {
                editor = this.get('editor');

                if (btnInst.get('pressed')) {
                    editor.applyStyle(style);
                }
                else {
                    editor.removeStyle(style);
                }
            }
        },

        _getToolbarXYPoint: function(left, top, direction) {
            var bbDOMNode,
                offsetFromSel;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            left = left - bbDOMNode.offsetWidth / 2;

            offsetFromSel = this.get('offsetFromSel');

            if (direction === 0) { // top to bottom
                top = top + offsetFromSel.topToBottom;
            }
            else {
                top = top - bbDOMNode.offsetHeight - offsetFromSel.bottomToTop;
            }

            return [left, top];
        },

        _getToolbarXYRegion: function(selectionData) {
            var boundingBox,
                bbDOMNode,
                gutter,
                halfSelectionWidth,
                left,
                top;

            boundingBox = this.get('boundingBox');

            bbDOMNode = boundingBox.getDOMNode();

            halfSelectionWidth = (selectionData.region.right - selectionData.region.left) / 2;

            gutter = this.get('gutter');

            left = this._editorNode.get('docScrollX') + gutter.left + selectionData.region.left - bbDOMNode.offsetWidth / 2;

            top = selectionData.region.top + this._editorNode.get('docScrollY') - gutter.top + bbDOMNode.offsetHeight;

            return [left + halfSelectionWidth, top];
        },

        _handleLink: function(event) {
            var instance = this,
                btnInst,
                editor,
                link,
                linkInput,
                range,
                selection;

            btnInst = event.target;

            editor = instance.get('editor');

            if (btnInst.get('pressed')) {
                selection = editor.getSelection();

                instance._buttonsContainer.addClass('hide');
                instance._linkContainer.removeClass('hide');

                linkInput = instance._linkInput;

                linkInput.focus();

                instance._createLink('/');

                linkInput.once('blur', function() {
                    link = linkInput.get('value');

                    if (link) {
                        instance._updateLink(link);
                    }
                    else {
                        instance._removeLink();
                    }

                    range = editor.getSelection().getRanges()[0];

                    range.collapse();

                    range.select();

                    instance._linkContainer.one('input').set('value', '');
                });

                instance._linkContainer.one('.input-clear-container').once('click', instance.hide, this);
            }
            else {
                instance._removeLink();
            }
        },

        _getSelectedLink: function() {
            var editor,
                range,
                selection,
                selectedElement;

            editor = this.get('editor');

            selection = editor.getSelection();

            selectedElement = selection.getSelectedElement();

            if (selectedElement && selectedElement.is('a')) {
                return selectedElement;
            }

            range = selection.getRanges()[0];

            if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);

                return editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }

            return null;
        },

        _createLink: function(URI) {
            var editor,
                range,
                selection,
                style,
                text;

            editor = this.get('editor');

            selection = editor.getSelection();

            range = selection.getRanges()[0];

            if (range.collapsed) {
                text = new CKEDITOR.dom.text(URI, editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

            style = new CKEDITOR.style({
                element: 'a',
                attributes: {
                    href: URI,
                    'data-cke-saved-href': URI
                }
            });

            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, editor);
            range.select();
        },

        _removeLink: function() {
            var editor,
                style;

            style = new CKEDITOR.style({
                alwaysRemoveElement: 1,
                element: 'a',
                type: CKEDITOR.STYLE_INLINE
            });

            editor = this.get('editor');

            editor.removeStyle(style);
        },

        _updateLink: function(URI) {
            var editor,
                element;

            editor = this.get('editor');
            element = this._getSelectedLink(editor);

            element.setAttributes({
                href: URI,
                'data-cke-saved-href': URI
            });
        },

        _updateUI: function() {
            var instance = this,
                editor,
                path;

            editor = this.get('editor');
            path = editor.elementPath();

            YObject.each(
                this._styles,
                function(item) {
                    var btnInst,
                        result;

                    result = item.style.checkActive(path, editor);
                    btnInst = instance._buttons[item.name];

                    if (btnInst) {
                        btnInst.set('pressed', !!result);
                    }
                }
            );
        },

        STYLES: ['strong', 'em', 'u', 'a'],

        BUTTONS_ACTIONS: {
            'strong': '_applyStyle',
            'em': '_applyStyle',
            'u': '_applyStyle',
            'a': '_handleLink'
        },

        TPL_BUTTON_CONTAINER: '<div class="btn-group btn-container"></div>',

        TPL_BUTTON: '<button class="btn">{content}</button>',

        TPL_LINK_CONTAINER:
            '<div class="row input-wrapper hide">' +
                '<div class="span10 input-container">' +
                    '<input class="input-large" type="text" placeholder="{placeholder}">' +
                '</div>' +
                '<div class="span2 input-clear-container">' +
                    '<button class="btn"><i class="icon-remove"></i></button>' +
                '</div>' +
            '</div>'
    },
    {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['strong', 'em', 'u', 'a']
            },

            buttonsContent: {
                validator: Lang.isObject,
                value: {
                    strong: '<i class="icon-bold"></i>',
                    em: '<i class="icon-italic"></i>',
                    u: '<i class="icon-underline"></i>',
                    a: '<i class="icon-link"></i>'
                }
            },

            gutter: {
                validator: Lang.isArray,
                value: {
                    left: 10,
                    top: 0
                }
            },

            offsetFromSel: {
                value: {
                    topToBottom: 5,
                    bottomToTop: 5
                }
            },

            strings: {
                value: {
                    linkPlaceholder: 'Type or paste link here'
                }
            }
        }
    });

    Y.ToolbarStyles = ToolbarStyles;

},'0.1', {
    requires: ['array-extras', 'array-invoke', 'button', 'toolbar-base']
});