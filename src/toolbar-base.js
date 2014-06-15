YUI.add('toolbar-base', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array;

    function ToolbarBase() {}

    ToolbarBase.prototype = {
        initializer: function() {
            var instance = this;

            instance._editorNode = Y.one(instance.get('editor').element.$);

            YArray.each(
                instance.get('buttons'),
                function(item) {
                    var instanceName;

                    instanceName = instance._getButtonInstanceName(item);

                    item = Lang.isObject(item) ? item : {};

                    instance.plug(Y[instanceName], item);
                }
            );

            Y.on('editorInteraction', instance._onEditorInteraction, instance);
        },

        _getButtonsContainer: function() {
            return this._buttonsContainer;
        },

        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        },

        _onEditorInteraction: function(event) {
            debugger;
        }
    };

    ToolbarBase.ATTRS = {
        editor: {
            validator: Lang.isObject
        }
    };

    Y.ToolbarBase = ToolbarBase;

},'', {
    requires: ['plugin', 'node-base']
});