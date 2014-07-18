YUI.add('toolbar-add', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        ToolbarAddItems,

    ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.ToolbarBase, Y.WidgetPosition, Y.WidgetPositionConstrain, Y.WidgetAutohide], {
        initializer: function () {
            var editorNode;

            editorNode = Y.one(this.get('editor').element.$);

            this._hideButtonsContainerFn = CKEDITOR.tools.debounce(this._hideButtonsContainer, this.get('hideTimeout'));

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
            var addContentBtnNode,
                gutter;

            this._hideButtonsContainer();

            if (!this.get('visible')) {
                this.show();
            }

            addContentBtnNode = this._addContentBtnContainer.getDOMNode();

            gutter = this.get('gutter');

            this.set('xy', this.getConstrainedXY([x - addContentBtnNode.offsetWidth - gutter.left, y - gutter.top - addContentBtnNode.offsetHeight/2]));
        },

        _alignButtonsOverlay: function() {
            this._buttonsOverlay.align(this._addContentBtnContainer,
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

            selectionData = event.data.selectionData;

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

            this._addContentBtnContainer = this.get('boundingBox').one('.alloy-editor-toolbar-buttons');
        },

        _renderButtonsOverlay: function() {
            var buttonsContainer;

            buttonsContainer = YNode.create(this.TPL_BUTTONS_CONTAINER);

            this._buttonsOverlay = new ToolbarAddItems({
                render: true,
                visible: false,
                zIndex: 1
            });

            this._buttonsOverlay.get('contentBox').appendChild(buttonsContainer);

            this._buttonsContainer = buttonsContainer;
        },

        _showButtonsContainer: function() {
            this._buttonsOverlay.show();

            this._alignButtonsOverlay();
        },

        BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-add"></div>',

        CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>',

        TPL_ADD:
            '<div class="alloy-editor-toolbar-buttons btn-group">' +
              '<button type="button" class="alloy-editor-button btn-add">{content}</button>' +
            '</div>',

        TPL_ADD_CONTENT: '<i class="alloy-editor-icon-add"></i>',

        TPL_BUTTONS_CONTAINER:
            '<div class="alloy-editor-toolbar-buttons btn-group btn-group-vertical"></div>'
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['image', 'code']
            },

            constrain: {
                validator: Lang.isBoolean,
                value: true
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


    // Create another class which will serve as container for the buttons.
    ToolbarAddItems = Y.Base.create('toolbaradditems', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionAlign, Y.WidgetAutohide], {
        BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-add-items"></div>',

        CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"></div>'
    }, {

    });
},'0.1', {
    requires: ['widget-base', 'widget-position', 'widget-position-constrain', 'widget-position-align', 'widget-autohide', 'toolbar-base']
});
