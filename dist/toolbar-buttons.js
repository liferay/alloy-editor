YUI.add('toolbar-styles', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
    	YNode = Y.Node,

    ToolbarButtons = Y.Base.create('toolbarbuttons', Y.Widget, [Y.WidgetPosition], {
    	initializer: function() {
            var instance = this,
                buttonInstances;

    		instance._editorNode = Y.one(instance.get('editor').element.$);

            buttonInstances = [];

            YArray.each(
                instance.get('buttons'),
                function(item) {
                    var instanceName;

                    instanceName = instance._getButtonInstanceName(item);

                    instance.plug(Y[instanceName]);

                    buttonInstances.push(instance[Y[instanceName].NS]);
                }
            );

            instance._buttonInstances = buttonInstances;
    	},

        bindUI: function() {
            var instance = this;

            YArray.each(
                instance._buttonInstances,
                function(item) {
                    if (Lang.isFunction(item.bindUI)) {
                        item.bindUI();
                    }
                }
            );

            instance.on('visibleChange', instance._onVisibleChange, instance);
        },

        renderUI: function() {
            var instance = this,
                buttonsContainer,
                contentBox;

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            this._renderButtons(buttonsContainer);

            contentBox = this.get('contentBox');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;
        },

        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        },

        _onVisibleChange: function(event) {
            if (event.newVal) {
                this._updateUI();
            }
        },

        _renderButtons: function(buttonsContainer) {
            var instance = this;

            YArray.each(
                instance._buttonInstances,
                function(item) {
                    item.renderUI(buttonsContainer);
                }
            );
        },

        _updateUI: function() {
            var instance = this;

            YArray.each(
                instance._buttonInstances,
                function(item) {
                    item.updateUI();
                }
            );
        }
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['strong', 'em', 'u', 'link']
            },

        	editor: {
                validator: Lang.isObject
            }
		}
	});

    Y.ToolbarButtons = ToolbarButtons;
},'', {
    requires: ['widget', 'widget-position']
});
