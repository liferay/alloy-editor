YUI.add('button-right', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var Right = Y.Base.create('right', Y.Plugin.Base, [Y.ButtonBase], {
        updateUI: function() {
            var editor,
                element,
                styleFloat;

            editor = this.get('host').get('editor');

            element = editor.getSelection().getSelectedElement();

            if (element && element.getName() === 'img') {
                styleFloat = element.getStyle('float');

                this._button.set('pressed', styleFloat === 'right');
            }
        },

        _onClick: function(event) {
            var instance = this,
                btnInst,
                editor,
                element;

            btnInst = event.target;

            editor = instance.get('host').get('editor');

            element = editor.getSelection().getSelectedElement();

            if (btnInst.get('pressed')) {
                element.setStyle('float', 'right');
            }
            else {
                element.removeStyle('float');
            }
        },

        TPL_CONTENT: '<i class="alloy-editor-icon-align-right"></i>'
    }, {
        NAME: 'right',

        NS: 'right',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'right'
            }
        }
    });

    Y.ButtonRight = Right;

},'', {
    requires: ['button-base']
});