YUI.add('toolbar-add', function (Y) {
    var Lang = Y.Lang,
        YNode = Y.Node,

    ToolbarAdd = Y.Base.create('toolbaradd', Y.Widget, [Y.WidgetPosition], {
        initializer: function() {
            var instance = this;

            instance._editorNode = Y.one(instance.get('editor').element.$);
        },

        bindUI: function() {
            Y.one('#add-wrapper').on('mouseleave', function(event) {
                setContentTimeout();
            });

            Y.one('#add-content').on('mouseleave', function(event) {
                setContentTimeout();
            });

            Y.one('#add-content').on('mouseenter', function(event) {
                window.clearTimeout(window.leaveTimeout);
            });
        },

        destructor: function() {
            this._addOverlay.destroy();

            clearTimeout(instance._leaveTimeout);
        },

        renderUI: function() {
            var addOverlay,
                addNode;

            addNode = YNode.create(this.TPL_ADD);

            addOverlay = new Y.Overlay({
                srcNode: addNode,
                visible: false
            }).render();

            Y.one('body').appendChild(addNode);

            this._addOverlay = addOverlay;
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

        _showAtPoint: function(x, y) {
            this.set('xy', [x, y]);

            this.show();
        },

        TPL_ADD:
            '<div class="add-content">' +
              '<div class="btn-group btn-group-vertical">' +
                    '<button type="button" class="btn btn-default add-image"><i class="icon-picture"></i></button>' +
                    '<button type="button" class="btn btn-default add-code"><i class="icon-file-text-alt"></i></button>' +
              '</div>' +
            '</div>'
    }, {
        ATTRS: {
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
    requires: ['array-extras', 'button', 'widget', 'widget-position']
});
