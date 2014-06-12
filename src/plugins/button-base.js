YUI.add('button-base', function (Y) {
    var Lang = Y.Lang,
        YNode = Y.Node;

    function ButtonBase() {}

    ButtonBase.prototype = {
        initializer: function() {
            this._style = new CKEDITOR.style({
                element: this.get('element')
            });

            this.afterHostMethod('renderUI', this.renderUI, this);
            this.afterHostMethod('bindUI', this.bindUI, this);
            this.afterHostEvent('visibleChange', this.updateUI, this);
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

            result = this._style.checkActive(elementPath, editor);

            this._button.set('pressed', !!result);
        },

        _onClick: function() {
            var editor;

            editor = this.get('host').get('editor');

            if (this._button.get('pressed')) {
                editor.applyStyle(this._style);
            }
            else {
                editor.removeStyle(this._style);
            }
        },

        _renderButtonUI: function() {
            var buttonsContainer,
                btnSrcNode;

            buttonsContainer = this.get('host').get('buttonsContainer');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: this.TPL_CONTENT
                })
            );

            this._button = new Y.ToggleButton({
                srcNode: btnSrcNode,
                on: {
                    click: Y.bind(this._onClick, this)
                },
                render: buttonsContainer
            });
        },

        TPL_BUTTON: '<button class="btn">{content}</button>'
    };

    Y.ButtonBase = ButtonBase;

},'', {
    requires: ['base-build', 'plugin', 'button']
});