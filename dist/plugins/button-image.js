YUI.add('button-image', function (Y) {
    var Lang = Y.Lang;

    var BtnImage = Y.Base.create('image', Y.Plugin.Base, [Y.ButtonBase], {
    	_getInputFile: function() {
            var id,
                inputFile;

            inputFile = this._inputFile;

            if (!inputFile) {
                id = Y.guid();

                Y.one('body').prepend('<input type="file" id="' + id + '"  style="display: none;"></input>');

                inputFile = Y.one('#' + id);

                inputFile.on('change', function() {
                    console.log(inputFile.get('value'));

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

        TPL_CONTENT: '<i class="icon-picture"></i>'
    }, {
        NAME: 'image',

        NS: 'image',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'image'
            },

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