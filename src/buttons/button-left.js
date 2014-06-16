YUI.add('button-left', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var Left = Y.Base.create('left', Y.Plugin.Base, [Y.ButtonBase], {
        updateUI: function() {
            var editor,
                element,
                styleFloat;

            editor = this.get('host').get('editor');

            element = editor.getSelection().getSelectedElement();

            if (element && element.getName() === 'img') {
                styleFloat = element.getStyle('float');

                this._button.set('pressed', styleFloat === 'left');
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
                element.setStyle('float', 'left');
            }
            else {
                element.removeStyle('float');
            }
        },

        TPL_CONTENT: '<i class="icon-align-left"></i>'
    }, {
        NAME: 'left',

        NS: 'left',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'left'
            }
        }
    });

    Y.ButtonLeft = Left;

},'', {
    requires: ['button-base']
});