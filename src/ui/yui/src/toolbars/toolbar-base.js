YUI.add('toolbar-base', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array;

    function ToolbarBase() {}

    ToolbarBase.prototype = {
        initializer: function() {
            var instance = this,
                editor;

            editor = instance.get('editor');

            instance._editorNode = Y.one(editor.element.$);

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

            editor.on('editorInteraction', instance._onEditorInteraction, instance);
        },

        _afterActionPerformed: function(event) {
            this.fire('actionPerformed', event);
        },

        _getButtonsContainer: function() {
            return this._buttonsContainer;
        },

        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        },

        _moveToPoint: function(xy, direction) {
            var boundingBox,
                boundingBoxNode,
                height,
                transition,
                y;

            boundingBox = this.get('boundingBox');

            boundingBox.setStyle('visibility', 'hidden');

            transition = this.get('transition');

            if (transition) {
                boundingBoxNode = boundingBox.getDOMNode();

                height = boundingBoxNode.offsetHeight;

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    y = xy[1] - height;
                }
                else {
                    y = xy[1] + height;
                }

                this.set('xy', [xy[0], y]);

                transition.left = xy[0] + 'px';
                transition.top = xy[1] + 'px';

                boundingBox.setStyle('visibility', 'visible');

                boundingBox.transition(transition);
            }
            else {
                boundingBox.setStyle('visibility', 'visible');

                this.set('xy', xy);
            }
        },
    };

    ToolbarBase.ATTRS = {
        buttonsContainer: {
            getter: '_getButtonsContainer',
            readOnly: true
        },

        editor: {
            validator: Lang.isObject
        },

        transition: {
            value: {
                easing: 'ease-out',
                duration: 0.1
            }
        }
    };

    Y.ToolbarBase = ToolbarBase;

},'', {
    requires: ['plugin', 'node-base']
});