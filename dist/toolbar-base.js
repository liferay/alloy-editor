YUI.add('toolbar-styles', function (Y) {
    var Lang = Y.Lang,
    	YNode = Y.Node,

    ToolbarButtons = Y.Base.create('toolbarbuttons', Y.Widget, [Y.WidgetPosition], {
    	initializer: function() {
    		this._editorNode = Y.one(this.get('editor').element.$);
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
