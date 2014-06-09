YUI.add('toolbar-styles', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
        YObject = Y.Object,
        YNode = Y.Node,

    ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition], {
        initializer: function() {
            var styles;

            this._editorNode = Y.one(this.get('editor').element.$);

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
            var instance = this,
                contentBox;

            contentBox = instance.get('contentBox');

            instance.on('visibleChange', function(event) {
                if (event.newVal) {
                    instance._updateUI();
                }
                else {
                    if (instance._linkContainer) {
                        instance._linkContainer.addClass('hide');
                        instance._buttonsContainer.removeClass('hide');
                    }
                }
            });
        },

        destructor: function() {
            (new Y.EventHandle(this._buttons)).destroy();
        },

        renderUI: function() {
            var instance = this,
                buttons,
                buttonsConfig,
                buttonsContainer,
                contentBox,
                linkContainer;

            buttons = {};

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            buttonsContainer.addClass('btn-group');

            buttonsConfig = instance.get('buttons');

            YArray.each(
                buttonsConfig,
                function(item) {
                    var button = instance._createButton(item, buttonsContainer);

                    buttons[item] = button;
                }
            );

            contentBox = this.get('contentBox');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;

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
            }

            instance._buttons = buttons;
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

            style = this._styles[params.style].style;

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

        _createButton: function(buttonConfig, buttonsContainer) {
            var button,
                contentBox;

            contentBox = this.get('contentBox');

            if (Lang.isString(buttonConfig)) {
                button = this._createDefaultButton(buttonConfig, buttonsContainer);
            }
            else {
                button = this._createCustomButton(buttonConfig, buttonsContainer);
            }

            return button;
        },

        _createCustomButton: function(buttonConfig, buttonsContainer) {
            var btnSrcNode,
                button;

            if (buttonConfig.html) {
                btnSrcNode = YNode.create(buttonConfig.html);
            }
            else {
                btnSrcNode = YNode.create(
                    Lang.sub(this.TPL_BUTTON, {
                        content: buttonConfig.content
                    })
                );
            }

            button = new Y.ToggleButton({
                srcNode: btnSrcNode,
                on: buttonConfig.on,
                render: buttonsContainer
            });

            buttonsContainer.appendChild(btnSrcNode);

            return button;
        },

        _createDefaultButton: function(buttonConfig, buttonsContainer) {
            var btnSrcNode,
                button,
                buttonsContent,
                fun;

            fun = this.BUTTONS_ACTIONS[buttonConfig];

            if (Lang.isString(fun)) {
                fun = Y.rbind(this[fun], this, {
                    button: buttonConfig,
                    style: buttonConfig
                });
            }

            buttonsContent = this.get('buttonsContent');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: buttonsContent[buttonConfig]
                })
            );

            button = new Y.ToggleButton({
                srcNode: btnSrcNode,
                on: {
                    'click': fun
                },
                render: buttonsContainer
            });

            buttonsContainer.appendChild(btnSrcNode);

            return button;
        },

        _getToolbarXYPoint: function(left, top, direction) {
            var bbDOMNode,
                offsetSel;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            left = left - bbDOMNode.offsetWidth / 2;

            offsetSel = this.get('offsetSel');

            if (direction === 0) { // top to bottom
                top = top + offsetSel.topToBottom;
            }
            else {
                top = top - bbDOMNode.offsetHeight - offsetSel.bottomToTop;
            }

            return [left, top];
        },

        _getToolbarXYRegion: function(selectionData) {
            var boundingBox,
                bbDOMNode,
                halfSelectionWidth,
                left,
                top;

            boundingBox = this.get('boundingBox');

            bbDOMNode = boundingBox.getDOMNode();

            halfSelectionWidth = (selectionData.region.right - selectionData.region.left) / 2;

            left = this._editorNode.get('docScrollX') + this.get('offsetLeft') + selectionData.region.left - bbDOMNode.offsetWidth / 2;

            top = selectionData.region.top + this._editorNode.get('docScrollY') - bbDOMNode.offsetHeight;

            return [left + halfSelectionWidth, top];
        },

        _handleLink: function(event) {
            var instance = this,
                btnInst,
                editor,
                keypressHandler,
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

                linkInput = instance._linkContainer.one('input');
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

                keypressHandler = linkInput.on('keypress', function(event) {
                    if (event.charCode === 13) {
                        keypressHandler.detach();

                        instance.hide();
                    }
                });
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

        TPL_BUTTON_CONTAINER: '<div class="btn-container"></div>',

        TPL_BUTTON: '<button>{content}</button>',

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

            editor: {
                validator: Lang.isObject
            },

            offsetLeft: {
                validator: Lang.isNumber,
                value: 10
            },

            offsetSel: {
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
    requires: ['array-extras', 'button', 'widget', 'widget-position']
});