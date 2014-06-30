YUI.add('toolbar-add', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,
        UITools = CKEDITOR.plugins.UITools,

    ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.ToolbarBase, Y.WidgetPosition, Y.WidgetAutohide], {
        initializer: function () {
            var editorNode;

            editorNode = Y.one(this.get('editor').element.$);

            this._hideButtonsContainerFn = UITools.debounce(this._hideButtonsContainer, this.get('hideTimeout'));

            this._editorDOMNode = editorNode.getDOMNode();
        },

        bindUI: function() {
            var boundingBox,
                buttonsBoundingBox;

            this._addButton.on(['click', 'mouseenter'], this._showButtonsContainer, this);

            boundingBox = this.get('boundingBox');
            buttonsBoundingBox = this._buttonsOverlay.get('boundingBox');

            boundingBox.on('mouseleave', this._handleMouseLeave, this);
            buttonsBoundingBox.on('mouseleave', this._handleMouseLeave, this);

            boundingBox.on('mouseenter', this._handleMouseEnter, this);
            buttonsBoundingBox.on('mouseenter', this._handleMouseEnter, this);
        },

        destructor: function() {
            this._addButton.destroy();

            this._buttonsOverlay.destroy();

            this._hideButtonsContainerFn.cancel();
        },

        renderUI: function() {
            this._renderAddNode();

            this._renderButtonsOverlay();
        },

        showAtPoint: function(x, y) {
            var addContentWrapperNode,
                gutter;

            this._hideButtonsContainer();

            this.show();

            addContentWrapperNode = this._addContentWrapper.getDOMNode();

            gutter = this.get('gutter');

            this.set('xy', [x - addContentWrapperNode.offsetWidth - gutter.left, y - gutter.top - addContentWrapperNode.offsetHeight/2]);
        },

        _alignButtonsContainer: function() {
            this._buttonsOverlay.align(this._addContentWrapper,
                [Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TR]);
        },

        _handleMouseEnter: function() {
            this._hideButtonsContainerFn.cancel();
        },

        _handleMouseLeave: function() {
            this._hideButtonsContainerFn.cancel();

            this._hideButtonsContainerFn();
        },

        _hideButtonsContainer: function() {
            this._buttonsOverlay.hide();
        },

        _onEditorInteraction: function(event) {
            var editorX,
                selectionData,
                startRect;

            selectionData = event.selectionData;

            if (selectionData.region) {
                startRect = selectionData.region.startRect || selectionData.region;

                editorX = this._editorNode.getX();

                this.showAtPoint(editorX, selectionData.region.top + startRect.height/2);
            }
            else {
                this.hide();
            }
        },

        _renderAddNode: function() {
            var addButton,
                addNode,
                contentBox;

            addNode = YNode.create(Lang.sub(
                this.TPL_ADD, {
                    content: this.TPL_ADD_CONTENT
            }));

            addButton = new Y.Button({
                srcNode: addNode.one('.btn-add')
            }).render(addNode);

            contentBox = this.get('contentBox');

            contentBox.appendChild(addNode);

            this._addButton = addButton;

            this._addContentWrapper = this.get('contentBox').one('.add-content-wrapper');
        },

        _renderButtonsOverlay: function() {
            var buttonsContainer;

            buttonsContainer = YNode.create(this.TPL_BUTTON_CONTAINER);

            this._buttonsOverlay = new Y.Overlay({
                srcNode: buttonsContainer,
                visible: false,
                zIndex: 1
            }).render();

            this._buttonsContainer = buttonsContainer;
        },

        _showButtonsContainer: function() {
            this._buttonsOverlay.show();

            this._alignButtonsContainer();
        },

        TPL_ADD:
            '<div class="add-content-wrapper">' +
              '<button type="button" class="btn-add">{content}</button>' +
            '</div>',

        TPL_ADD_CONTENT: '<i class="icon-add"></i>',

        TPL_BUTTON_CONTAINER:
          '<div class="btn-group-vertical yui3-toolbaradd-buttons"></div>'
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['image', 'code']
            },

            gutter: {
                validator: Lang.isObject,
                value: {
                    left: 5,
                    top: 0
                }
            },

            hideTimeout: {
                validator: Lang.isNumber,
                value: 1000
            }
        }
    });

    Y.ToolbarAdd = ToolbarAdd;
},'0.1', {
    requires: ['widget-base', 'widget-position', 'widget-autohide', 'toolbar-base']
});
