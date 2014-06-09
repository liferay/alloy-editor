YUI.add('toolbar-base', function (Y) {
    var Lang = Y.Lang,
    	YArray = Y.Array,
    	YNode = Y.Node,

    ToolbarBase = Y.Base.create('toolbarbase', Y.Widget, [Y.WidgetPosition], {
    	initializer: function() {
    		this._editorNode = Y.one(this.get('editor').element.$);
    	},

    	_createButton: function(buttonConfig, buttonsContainer) {
            var button,
                contentBox;

            contentBox = this.get('contentBox');

            if (Lang.isString(buttonConfig)) {
                button = this._createDefaultButton(buttonConfig, buttonsContainer);
            }
            else {
                button = this._createCustomButton(buttonConfig, buttonsContainer);
            }

            return button;
        },

    	_createCustomButton: function(buttonConfig, buttonsContainer) {
            var btnSrcNode,
                button;

            if (buttonConfig.html) {
                btnSrcNode = YNode.create(buttonConfig.html);
            }
            else {
                btnSrcNode = YNode.create(
                    Lang.sub(this.TPL_BUTTON, {
                        content: buttonConfig.content
                    })
                );
            }

            button = new Y.ToggleButton({
                srcNode: btnSrcNode,
                on: buttonConfig.on,
                render: buttonsContainer
            });

            buttonsContainer.appendChild(btnSrcNode);

            return button;
        },

        _createDefaultButton: function(buttonName, buttonsContainer) {
            var btnSrcNode,
                button,
                buttonsContent,
                func;

            func = this.BUTTONS_ACTIONS[buttonName];

            if (Lang.isString(func)) {
                func = Y.rbind(this[func], this, {
                    button: buttonName
                });
            }

            buttonsContent = this.get('buttonsContent');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: buttonsContent[buttonName],
                    type: buttonName
                })
            );

            button = new Y.ToggleButton({
                srcNode: btnSrcNode,
                on: {
                    click: func
                },
                render: buttonsContainer
            });

            return button;
        },

        _renderButtons: function(container) {
            var instance = this,
                buttons,
                buttonsConfig;

            buttonsConfig = instance.get('buttons');

            buttons = {};

            YArray.each(
                buttonsConfig,
                function(item) {
                    var button = instance._createButton(item, container);

                    buttons[item] = button;
                }
            );

            this._buttons = buttons;
        }
    }, {
        ATTRS: {
        	editor: {
                validator: Lang.isObject
            }
		}
	});

    Y.ToolbarBase = ToolbarBase;
},'', {
    requires: ['widget', 'widget-position']
});
