YUI.add('button-base', function (Y) {
    var Lang = Y.Lang,
        YNode = Y.Node;

    function ButtonBase() {}

    ButtonBase.NAME = 'buttonbase';
    ButtonBase.NS = 'buttonbase';

    Y.extend(ButtonBase, Y.Plugin.Base, {
        initializer: function() {
            this._style = new CKEDITOR.style({
                element: this.get('element')
            });
        },

        destructor: function() {
            this._button.destroy();
        },

        renderUI: function(container) {
            var btnSrcNode;

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
                render: container
            });
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

            editor = this.get('editor');

            if (this._button.get('pressed')) {
                editor.applyStyle(this._style);
            }
            else {
                editor.removeStyle(this._style);
            }
        },

        TPL_BUTTON: '<button class="btn">{content}</button>'
    });

    Y.ButtonBase = ButtonBase;

},'', {
    requires: ['plugin', 'button']
});