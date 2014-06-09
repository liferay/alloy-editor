YUI.add('toolbar-add', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
        YNode = Y.Node,

    ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.WidgetPosition], {
        initializer: function() {
            var instance = this;

            instance._editorNode = Y.one(instance.get('editor').element.$);

            this._hideButtonsContainerFn = Y.debounce(this._hideButtonsContainer, this.get('hideTimeout'));
        },

        bindUI: function() {
            var boundingBox,
                buttonsBoundingBox;

            this._addButton.on(['click', 'mouseenter'], this._showButtonsContainer, this);

            boundingBox = this.get('boundingBox');
            buttonsBoundingBox = this._buttonsOverlay.get('boundingBox');

            buttonsBoundingBox.on('mouseleave', this._handleMouseLeave, this);
            boundingBox.on('mouseleave', this._handleMouseLeave, this);

            boundingBox.on('mouseenter', this._handleMouseEnter, this);
            buttonsBoundingBox.on('mouseenter', this._handleMouseEnter, this);
        },

        destructor: function() {
            YArray.invoke(this._buttons, 'destroy');

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

        _createButton: function(buttonType, container) {
            var btnSrcNode,
                button,
                buttonsContent,
                fun;

            buttonsContent = this.get('buttonsContent');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: buttonsContent[buttonType],
                    type: buttonType
                })
            );

            fun = this.BUTTONS_ACTIONS[buttonType];

            if (Lang.isString(fun)) {
                fun = Y.rbind(this[fun], this, {
                    button: buttonType
                });
            }

            button = new Y.Button({
                srcNode: btnSrcNode,
                on: {
                    'click': fun
                },
                render: container
            });

            return button;
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

        _renderAddNode: function() {
            var addButton,
                addNode,
                buttonsContent,
                contentBox;

            buttonsContent = this.get('buttonsContent');

            addNode = YNode.create(Lang.sub(
                this.TPL_ADD, {
                    content: buttonsContent.add
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
            var buttonsNode;

            buttonsNode = YNode.create(this.TPL_BUTTONS);

            this._renderButtons(buttonsNode);

            this._buttonsOverlay = new Y.Overlay({
                visible: false,
                srcNode: buttonsNode
            }).render();
        },

        _renderButtons: function(container) {
            var instance = this,
                buttons,
                buttonsConfig;

            buttonsConfig = instance.get('buttons');

            buttons = [];

            YArray.each(
                buttonsConfig,
                function(item) {
                    buttons.push(instance._createButton(item, container));
                }
            );

            this._buttons = buttons;
        },

        _setLeaveTimeout: function() {
            var instance = this;

            instance._leaveTimeout = setTimeout(
                function() {
                    instance.hide();
                },
                instance.get('hideTimeout')
            );
        },

        _showButtonsContainer: function() {
            this._buttonsOverlay.show();

            this._alignButtonsContainer();
        },

        BUTTONS_ACTIONS: {
            'image': '_handleImage',
            'code': '_handleCode'
        },

        TPL_ADD:
            '<div class="btn-group add-content-wrapper">' +
              '<button type="button" class="btn btn-default btn-add">{content}</button>' +
            '</div>',

        TPL_BUTTON: '<button type="button" class="btn btn-default btn-add-{type}">{content}</i></button>',

        TPL_BUTTONS:
          '<div class="btn-group btn-group-vertical add-content">' +
          '</div>'
    }, {
        ATTRS: {
            buttons: {
                validator: Lang.isArray,
                value: ['image', 'code']
            },

            buttonsContent: {
                validator: Lang.isObject,
                value: {
                    add: '<i class="icon-plus-sign"></i>',
                    image: '<i class="icon-picture"></i>',
                    code: '<i class="icon-code"></i>'
                }
            },

            gutter: {
                value: {
                    left: 5,
                    top: 0
                }
            },

            editor: {
                validator: Lang.isObject
            },

            hideTimeout: {
                validator: Lang.isNumber,
                value: 1000
            }
        }
    });

    Y.ToolbarAdd = ToolbarAdd;
},'0.1', {
    requires: ['array-extras', 'array-invoke', 'button', 'widget', 'widget-position', 'aui-debounce']
});
