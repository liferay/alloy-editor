;(function() {
    'use strict';

    YUI.add('linktooltip', function (Y) {
        var Lang = Y.Lang,
            Link = CKEDITOR.plugins.UITools.Link,

        LinkTooltip = Y.Base.create('linktooltip', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionConstrain, Y.WidgetAutohide], {
            initializer: function() {
                this._eventHandles = [];
            },

            destructor: function() {
                (new Y.EventHandle(this._eventHandles)).detach();

                this._bbMouseEnterHandle.detach();
                this._bbMouseLeaveHandle.detach();
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
                var editor;

                this._bindBBMouseEnter();

                this._btnGo.on('click', this._onBtnGoClick, this);
                this._btnRemove.on('click', this._onBtnRemoveClick, this);

                this._linkPreview.on('keypress', this._onLinkPreviewKeyPress, this);

                this.on('visibleChange', this._onVisibleChange, this);

                editor = this.get('editor');

                this._eventHandles.push(
                    Y.one(editor.element.$).delegate('mouseenter', this._onLinkMouseEnter, 'a[href]', this, editor)
                );

                this.get('boundingBox').on('clickoutside', this._onClickOutside, this);
            },

            _bindBBMouseLeave: function() {
                var boundingBox;

                boundingBox = this.get('boundingBox');

                this._bbMouseLeaveHandle = boundingBox.once('mouseleave', this._onBBMouseLeave, this);
            },

            _bindBBMouseEnter: function() {
                var boundingBox;

                boundingBox = this.get('boundingBox');

                this._bbMouseEnterHandle = boundingBox.on('mouseenter', this._onBBMouseEnter, this);
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

                gutter = gutter.top;

                if (Lang.isNumber(lineHeight)) {
                    line = 1;

                    lines =  Math.ceil((region.bottom - region.top) / lineHeight);

                    for (i = 1; i <= lines; i++) {
                        if (y < region.top + lineHeight * i) {
                            break;
                        }

                        ++line;
                    }

                    y = region.top + line * lineHeight + gutter;
                }
                else {
                    y = region.bottom + gutter;
                }

                return [x, y];
            },

            _onBBMouseEnter: function() {
                clearTimeout(this._hideHandle);

                this._bindBBMouseLeave();
            },

            _onBBMouseLeave: function() {
                clearTimeout(this._hideHandle);

                this._attachHiddenHandle();
            },

            _onBtnGoClick: function() {
                Y.config.win.open(this._linkPreview.get('innerHTML'));
            },

            _onClickOutside: function() {
                this.hide();
            },

            _onBtnRemoveClick: function() {
                Link.remove(this._currentLink);

                this.hide();
            },

            _onLinkClick: function(event) {
                event.preventDefault();

                this._onStartLinkEdit();
            },

            _onLinkMouseEnter: function(event) {
                var instance = this,
                    link,
                    linkText,
                    xy;

                if (this._editMode) {
                    return;
                }

                clearTimeout(instance._hideHandle);

                link = event.currentTarget;

                linkText = link.getAttribute('href');

                this._linkPreview.blur();

                this._linkPreview.setAttribute('href', linkText);

                this._linkPreview.set('innerHTML', Y.Escape.html(linkText));

                this._linkPreview.removeClass('link-preview-focused');

                instance.show();

                xy = instance._getXY(event.pageX, event.pageY, link);

                instance.set('xy', xy);

                this._currentLink = new CKEDITOR.dom.element(link.getDOMNode());

                link.once('mouseleave', function() {
                    clearTimeout(instance._hideHandle);

                    instance._attachHiddenHandle();
                });
            },

            _onLinkPreviewKeyPress: function(event) {
                if (event.charCode === 13) {
                    Link.update(this._linkPreview.get('innerHTML'), this._currentLink);

                    this.hide();
                }
            },

            _onStartLinkEdit: function() {
                this._editMode = true;

                clearTimeout(this._hideHandle);

                this._bbMouseLeaveHandle.detach();

                this._linkPreview.addClass('link-preview-focused');
            },

            _onVisibleChange: function(event) {
                if (!event.newVal) {
                    this._editMode = false;
                }
            },

            TPL_CONTENT:
                '<div class="pull-left link-container">' +
                    '<a contenteditable="true" class="link-preview"></a>' +
                '</div>' +
                '<div class="pull-left btn-group link-go-contaner">' +
                    '<button class="btn go-link"><i class="icon-share"></i></button>' +
                '</div>' +
                '<div class="pull-left btn-group link-remove-contaner">' +
                    '<button class="btn remove-link"><i class="icon-remove"></i></button>' +
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
                }
            }
        });

        Y.LinkTooltip = LinkTooltip;

    },'', {
        requires: ['button', 'dom-screen', 'escape', 'event-outside', 'node-event-delegate', 'event-mouseenter', 'widget-base', 'widget-position', 'widget-position-constrain', 'widget-autohide']
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