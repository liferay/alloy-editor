YUI.add('toolbar-styles', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
        YObject = Y.Object,
        YNode = Y.Node,

    ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition], {
        initializer: function() {
            var instance = this,
                styles;

            instance._editorNode = Y.one(instance.get('editor').element.$);

            styles = {};

            YArray.each(
                instance.STYLES,
                function(item) {
                    styles[item] = {
                        name: item,
                        style: new CKEDITOR.style({
                            element: item
                        })
                    };
                }
            );

            instance._styles = styles;
        },

        bindUI: function() {
            var instance = this,
                contentBox;

            contentBox = instance.get('contentBox');

            instance.on('visibleChange', function(event) {
                if (event.newVal) {
                    instance._updateUI();

                    // Y.one('#linkInput').set('value', '');
                }
                else {
                    // Y.one('#inputWrapper').addClass('hide');
                    contentBox.one('.btn-container').removeClass('hide');
                }
            });
        },

        destructor: function() {
            (new Y.EventHandle(this._buttons)).destroy();
        },

        renderUI: function() {
            var instance = this,
                buttons,
                buttonsContainer,
                buttonsContent,
                contentBox;

            buttons = {};

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            buttonsContent = instance.get('buttonsContent');
            contentBox = instance.get('contentBox');

            buttonsContainer.addClass('btn-group');

            YArray.each(
                instance.get('buttons'),
                function(item) {
                    var btnSrcNode,
                        fun;

                    fun = instance.BUTTONS_ACTIONS[item];

                    if (Lang.isString(fun)) {
                        fun = Y.rbind(instance[fun], instance, {
                            button: item,
                            style: item
                        });
                    }

                    btnSrcNode = YNode.create(
                        Lang.sub(instance.TPL_BUTTON, {
                            content: buttonsContent[item]
                        })
                    );

                    buttons[item] = new Y.ToggleButton({
                        srcNode: btnSrcNode,
                        on: {
                            'click': fun
                        },
                        render: buttonsContainer
                    });

                    buttonsContainer.appendChild(btnSrcNode);
                }
            );

            contentBox.appendChild(buttonsContainer);

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

        _getToolbarXYPoint: function(left, top, direction) {
            var bbDOMNode,
                offsetLeft;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            left = left - bbDOMNode.offsetWidth / 2;

            offsetLeft = this.get('offsetSel');

            if (direction === 0) { // top to bottom
                top = top + offsetLeft.topToBottom;
            }
            else {
                top = top - bbDOMNode.offsetHeight - offsetLeft.bottomToTop;
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

        TPL_BUTTON: '<button>{content}</button>'
    },
    {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['strong', 'em', 'u', 'a']
            },

            buttonsContent: {
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
            }
        }
    });

    Y.ToolbarStyles = ToolbarStyles;

},'0.1', {
    requires: ['array-extras', 'button', 'widget', 'widget-position']
});