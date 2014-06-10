YUI.add('toolbar-add', function (Y) {
    var Lang = Y.Lang,
        YArray = Y.Array,
        YNode = Y.Node,
        YObject = Y.Object,

    ToolbarAdd = Y.Base.create('toolbaradd', Y.ToolbarBase, [], {
        initializer: function() {
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

            this._buttonsOverlay.on('visibleChange', this._onButtonsOverlayVisibleChange, this);
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

        _getInputFile: function() {
            var id,
                inputFile;

            inputFile = this._inputFile;

            if (!inputFile) {
                id = Y.guid();

                Y.one('body').prepend('<input type="file" id="' + id + '"  style="display: none;"></input>');

                inputFile = Y.one('#' + id);

                inputFile.on('change', function() {
                    console.log(inputFile.get('value'));

                    inputFile.set('value', '');
                });

                this._inputFile = inputFile;
            }

            return inputFile;
        },

        _handleCode: function(event) {

        },

        _handleImage: function(event) {
            var inputFile = this._getInputFile();

            inputFile.simulate('click');
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

        _onButtonsOverlayVisibleChange: function(event) {
            if (!event.newVal) {
                YObject.each(
                    this._buttons,
                    function(item) {
                        item.set('pressed', false);
                    }
                );
            }
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
            var buttonsContainer;

            buttonsContainer = YNode.create(this.TPL_BUTTON_CONTAINER);

            this._renderButtons(buttonsContainer);

            this._buttonsOverlay = new Y.Overlay({
                visible: false,
                srcNode: buttonsContainer,
                zIndex: 1
            }).render();
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
              '<button type="button" class="btn btn-add">{content}</button>' +
            '</div>',

        TPL_BUTTON: '<button type="button" class="btn btn-add-{type}">{content}</i></button>',

        TPL_BUTTON_CONTAINER:
          '<div class="btn-group btn-group-vertical add-content"></div>'
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

            hideTimeout: {
                validator: Lang.isNumber,
                value: 1000
            }
        }
    });

    Y.ToolbarAdd = ToolbarAdd;
},'0.1', {
    requires: ['array-has', 'array-invoke', 'button', 'node-event-simulate', 'toolbar-base', 'aui-debounce']
});
