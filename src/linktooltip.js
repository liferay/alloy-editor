;(function() {
    'use strict';

    YUI.add('linktooltip', function (Y) {
        var Lang = Y.Lang,

        LinkTooltip = Y.Base.create('linktooltip', Y.Widget, [Y.WidgetStack, Y.WidgetPosition, Y.WidgetPositionConstrain], {
            initializer: function() {
                this._eventHandles = [];
            },

            destroy: function() {
                (new Y.EventHandle(this._eventHandles)).detach();
            },

            renderUI: function() {
                var content;

                content = Y.Node.create(this.TPL_CONTENT);

                this._btnGo = new Y.Button({
                    srcNode: content.one('.go-link'),
                    render: content.one('.link-remove-contaner')
                });

                this._btnRemove = new Y.Button({
                    srcNode: content.one('.remove-link'),
                    render: content.one('.link-remove-contaner')
                });

                this._linkPreview = content.one('.link-preview');

                this._linkPreview.on('click', this._onLinkClick, this);

                this.get('contentBox').appendChild(content);
            },

            bindUI: function() {
                var boundingBox;

                boundingBox = this.get('boundingBox');

                boundingBox.on('mouseenter', this._onBBMouseEnter, this);
                boundingBox.on('mouseleave', this._onBBMouseExit, this);

                this._btnGo.on('click', this._onBtnGoClick, this);

                this._eventHandles.push(
                    Y.one(this.get('editor').element.$).delegate('mouseenter', this._onLinkMouseEnter, 'a[href]', this)
                );
            },

            _attachHiddenHandle: function() {
                var instance = this;

                this._hideHandle = setTimeout(
                    function() {
                        instance.hide();
                    },
                    this.get('hideDelay')
                );
            },

            _getXY: function(x, y, link) {
                var gutter,
                    i,
                    line,
                    lineHeight,
                    lines,
                    region;

                lineHeight = parseInt(link.getComputedStyle('lineHeight'), 10);

                gutter = this.get('gutter');

                region = link.get('region');

                lines = Math.ceil((region.bottom - region.top) / lineHeight);

                line = 1;

                for (i = 1; i <= lines; i++) {
                    if (y < region.top + lineHeight * i) {
                        break;
                    }

                    ++line;
                }

                gutter = (gutter.top);

                y = region.top + line * lineHeight + gutter;

                return [x, y];
            },

            _onBBMouseEnter: function() {
                clearTimeout(this._hideHandle);
            },

            _onBBMouseExit: function() {
                clearTimeout(this._hideHandle);

                this._attachHiddenHandle();
            },

            _onBtnGoClick: function() {
                Y.config.win.open(this._linkPreview.getAttribute('href'));
            },

            _onBtnRemoveClick: function() {
                
            },

            _onLinkClick: function(event) {
                event.preventDefault();
            },

            _onLinkMouseEnter: function(event) {
                var instance = this,
                    link,
                    linkText,
                    xy;

                clearTimeout(instance._hideHandle);

                link = event.currentTarget;

                linkText = link.getAttribute('href');

                this._linkPreview.setAttribute('href', linkText);

                this._linkPreview.set('innerHTML', Y.Escape.html(linkText));

                instance.show();

                xy = instance._getXY(event.pageX, event.pageY, link);

                instance.set('xy', xy);

                link.once('mouseleave', function() {
                    clearTimeout(instance._hideHandle);

                    instance._attachHiddenHandle();
                });
            },

            TPL_CONTENT:
                '<div class="pull-left link-container">' +
                    '<a contenteditable="true" class="link-preview"></a>' +
                '</div>' +
                '<div class="pull-left link-go-contaner">' +
                    '<button class="go-link"><i class="icon-share"></i></button>' +
                '</div>' +
                '<div class="pull-left link-remove-contaner">' +
                    '<button class="remove-link"><i class="icon-remove"></i></button>' +
                '</div>'
        }, {
            ATTRS: {
                constrain: {
                    validator: Lang.isBoolean,
                    value: true
                },

                editor: {
                    validator: Y.Lang.isObject
                },

                gutter: {
                    validator: Lang.isObject,
                    value: {
                        top: 0,
                        left: 0
                    }
                },

                hideDelay: {
                    validator: Lang.isNumber,
                    value: 2000
                },

                zIndex: {
                    validator: Lang.isNumber,
                    value: 1
                }
            }
        });

        Y.LinkTooltip = LinkTooltip;

    },'', {
        requires: ['button', 'dom-screen', 'escape', 'event-outside', 'node-event-delegate', 'event-mouseenter', 'widget', 'widget-stack', 'widget-position', 'widget-position-constrain']
    });

    CKEDITOR.plugins.add(
        'linktooltip',
        {
            init: function(editor) {
                YUI().use('linktooltip', function(Y) {
                    var config,
                        tooltip;

                    config = Y.merge({
                        editor: editor,
                        visible: false
                    }, editor.config.linktooltip);

                    tooltip = new Y.LinkTooltip(config).render();
                });
            }
        }
    );
}());