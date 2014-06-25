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

                    item = Lang.isObject(item) ? item : null;

                    instance.plug(Y[instanceName], item);

                    // Each button will fire actionPerformed when user interacts with it. Here we will
                    // re-fire this event to the other buttons so they will be able to update their UI too.
                    instance[Y[instanceName].NS].after('actionPerformed', instance._afterActionPerformed, instance);
                }
            );

            Y.on('editorInteraction', instance._onEditorInteraction, instance);
        },

        _afterActionPerformed: function(event) {
            this.fire('actionPerformed', event);
        },

        _getButtonsContainer: function() {
            return this._buttonsContainer;
        },

        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        }
    };

    ToolbarBase.ATTRS = {
        buttonsContainer: {
            getter: '_getButtonsContainer',
            readOnly: true
        },

        editor: {
            validator: Lang.isObject
        }
    };

    Y.ToolbarBase = ToolbarBase;

},'', {
    requires: ['plugin', 'node-base']
});