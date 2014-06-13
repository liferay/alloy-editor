YUI.add('toolbar-styles', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
    	YNode = Y.Node,

    ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition, Y.WidgetAutohide], {
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
    	},

        renderUI: function() {
            var instance = this,
                buttonsContainer,
                contentBox;

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            contentBox = this.get('contentBox');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;
        },

        showAtPoint: function(left, top, direction) {
            var xy;

            this.show();

            xy = this._getToolbarXYPoint(left, top, direction);

            this.set('xy', xy);
        },

        _getButtonsContainer: function() {
            return this._buttonsContainer;
        },

        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        },

        _getToolbarXYPoint: function(left, top, direction) {
            var bbDOMNode,
                offsetFromSel;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            left = left - bbDOMNode.offsetWidth / 2;

            offsetFromSel = this.get('offsetFromSel');

            if (direction === 0) { // top to bottom
                top = top + offsetFromSel.topToBottom;
            }
            else {
                top = top - bbDOMNode.offsetHeight - offsetFromSel.bottomToTop;
            }

            return [left, top];
        },

        TPL_BUTTON_CONTAINER: '<div class="btn-group btn-container"></div>'
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['strong', 'em', 'u', 'h1', 'h2', 'a']
            },

            buttonsContainer: {
                getter: '_getButtonsContainer',
                readOnly: true
            },

        	editor: {
                validator: Lang.isObject
            },

            gutter: {
                validator: Lang.isArray,
                value: {
                    left: 10,
                    top: 0
                }
            },

            offsetFromSel: {
                value: {
                    topToBottom: 5,
                    bottomToTop: 5
                }
            }
		}
	});

    Y.ToolbarStyles = ToolbarStyles;
},'', {
    requires: ['widget', 'widget-position', 'widget-autohide']
});
