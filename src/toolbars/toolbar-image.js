YUI.add('toolbar-image', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

    ToolbarImage = Y.Base.create('toolbarimage', Y.Widget, [Y.WidgetPosition, Y.WidgetAutohide, Y.ToolbarBase], {
        renderUI: function() {
            var instance = this,
                buttonsContainer,
                contentBox;

            buttonsContainer = YNode.create(instance.TPL_BUTTON_CONTAINER);

            this.get('boundingBox').addClass('arrow-box arrow-box-bottom');

            contentBox = this.get('contentBox');

            contentBox.addClass('btn-toolbar');

            contentBox.appendChild(buttonsContainer);

            instance._buttonsContainer = buttonsContainer;
        },

        bindUI: function() {
            this.on('actionPerformed', this._onActionPerformed, this);
        },

        showAtPoint: function(left, top, direction) {
            var xy;

            if (!this.get('visible')) {
                this.show();
            }

            xy = this._getToolbarXYPoint(left, top, direction);

            this.set('xy', xy);
        },

        _getToolbarXYPoint: function(left, top) {
            var bbDOMNode,
                gutter;

            bbDOMNode = this.get('boundingBox').getDOMNode();

            left = left - bbDOMNode.offsetWidth / 2;

            gutter = this.get('gutter');

            top = top - bbDOMNode.offsetHeight - gutter.top;

            return [left, top];
        },

        _onActionPerformed: function() {
            var editor,
                element;

            editor = this.get('editor');

            element = editor.getSelection().getSelectedElement();

            this._updateUI(element);
        },

        _onEditorInteraction: function(event) {
            var element,
                name,
                selectionData;

            selectionData = event.selectionData;

            element = selectionData.element;

            name = element ? element.getName() : null;

            if (name === 'img') {
                this._updateUI(element);
            }
            else {
                this.hide();
            }
        },

        _updateUI: function(element) {
            var region;

            if (element) {
                region = Y.DOM.region(element.$);

                this.showAtPoint(region.left + (region.right - region.left)/2, region.top);
            }
        },

        TPL_BUTTON_CONTAINER: '<div class="btn-group toolbar-image"></div>'
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['left', 'right']
            },

            gutter: {
                validator: Lang.isObject,
                value: {
                    left: 0,
                    top: 10
                }
            }
		}
	});

    Y.ToolbarImage = ToolbarImage;
},'', {
    requires: ['dom-screen', 'widget-base', 'widget-position', 'widget-autohide', 'toolbar-base']
});
