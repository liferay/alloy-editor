;(function() {
    'use strict';

    YUI.add('linktooltip', function (Y) {
        var Lang = Y.Lang,

        LinkTooltip = Y.Base.create('linktooltip', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionConstrain, Y.WidgetAutohide], {
            initializer: function() {
                this._eventHandles = [];
            },

            destructor: function() {
                (new Y.EventHandle(this._eventHandles)).detach();
            },

            renderUI: function() {
                var content;

                content = Y.Node.create(this.TPL_CONTENT);

                this.get('contentBox').appendChild(content);

                this._linkPreview = content.one('.link-preview');
            },

            bindUI: function() {
                var editor;

                this._bindBBMouseEnter();

                editor = this.get('editor');

                this._eventHandles.push(
                    Y.one(editor.element.$).delegate('mouseenter', this._onLinkMouseEnter, 'a[href]:not([data-cke-default-link])', this, editor)
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

            _onClickOutside: function() {
                this.hide();
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
                '<div class="link-container">' +
                    '<span class="icon-link-container">' +
                        '<i class="icon-link"></i>' +
                    '</span>' +
                    '<a class="link-preview" target="_blank"></a>' +
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
        requires: ['dom-screen', 'escape', 'event-outside', 'node-event-delegate', 'event-mouseenter', 'widget-base', 'widget-position', 'widget-position-constrain', 'widget-autohide']
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