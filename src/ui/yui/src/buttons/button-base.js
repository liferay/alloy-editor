YUI.add('button-base', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node;

    function ButtonBase() {}

    ButtonBase.prototype = {
        initializer: function() {
            var element;

            element = this.get('element');

            if (element) {
                this._style = new CKEDITOR.style({
                    element: this.get('element')
                });
            }

            this.afterHostMethod('renderUI', this.renderUI, this);
            this.afterHostMethod('bindUI', this.bindUI, this);
            this.afterHostEvent(['visibleChange', 'actionPerformed'], this.updateUI, this);
        },

        destructor: function() {
            this._button.destroy();
        },

        renderUI: function() {
            this._renderButtonUI();
        },

        bindUI: function() {
            // NOP, buttons should override it
        },

        updateUI: function() {
            var editor,
                elementPath,
                result;

            editor = this.get('host').get('editor');

            elementPath = editor.elementPath();

            if (this._style) {
                result = this._style.checkActive(elementPath, editor);

                this._button.set('pressed', !!result);
            }
        },

        _onClick: function() {
            var editor;

            if (this._style) {
                editor = this.get('host').get('editor');

                if (this._button.get('pressed')) {
                    editor.applyStyle(this._style);
                }
                else {
                    editor.removeStyle(this._style);
                }
            }
        },

        _afterClick: function() {
            this.fire('actionPerformed', {
                style: this._style
            });
        },

        _renderButtonUI: function() {
            var btnInst,
                btnSrcNode,
                buttonsContainer;

            buttonsContainer = this.get('host').get('buttonsContainer');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: this.TPL_CONTENT
                })
            );

            btnInst = this.get('toggle') ? 'ToggleButton' : 'Button';

            this._button = new Y[btnInst]({
                after: {
                    click: Y.bind(this._afterClick, this)
                },
                on: {
                    click: Y.bind(this._onClick, this)
                },
                render: buttonsContainer,
                srcNode: btnSrcNode
            });
        },

        TPL_BUTTON: '<button class="alloy-editor-button btn">{content}</button>'
    };

    ButtonBase.ATTRS = {
        toggle: {
            validator: Lang.isBoolean,
            value: true,
            writeOnce: 'initOnly'
        }
    };

    Y.ButtonBase = ButtonBase;

},'', {
    requires: ['base-build', 'plugin', 'button']
});