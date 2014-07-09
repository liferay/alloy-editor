YUI.add('button-image', function (Y) {
    'use strict';

    var Lang = Y.Lang;

    var BtnImage = Y.Base.create('image', Y.Plugin.Base, [Y.ButtonBase], {
    	_getInputFile: function() {
            var instance = this,
                id,
                inputFile;

            inputFile = this._inputFile;

            if (!inputFile) {
                id = Y.guid();

                Y.one('body').prepend('<input type="file" id="' + id + '"  style="display: none;"></input>');

                inputFile = Y.one('#' + id);

                inputFile.on('change', function() {
                    var el,
                        reader;

                    reader = new FileReader();

                    reader.onload = function (event) {
                        el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                        instance.get('host').get('editor').insertElement(el);
                    };

                    reader.readAsDataURL(inputFile.getDOMNode().files[0]);

                    inputFile.set('value', '');
                });

                this._inputFile = inputFile;
            }

            return inputFile;
        },

    	_onClick: function() {
            var inputFile = this._getInputFile();

            inputFile.simulate('click');
        },

        TPL_CONTENT: '<i class="alloy-editor-icon-image"></i>'
    }, {
        NAME: 'image',

        NS: 'image',

        ATTRS: {
            toggle: {
                validator: Lang.isBoolean,
                value: false,
                writeOnce: 'initOnly'
            }
        }
    });

    Y.ButtonImage = BtnImage;

},'', {
    requires: ['button-base', 'node-event-simulate']
});