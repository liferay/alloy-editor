;(function() {
    'use strict';

    YUI.add('linktooltip', function (Y) {
        var Lang = Y.Lang,

        LinkTooltip = Y.Base.create('linktooltip', Y.Widget, [Y.WidgetStack, Y.WidgetPosition, Y.WidgetPositionAlign, Y.WidgetPositionConstrain], {
            initializer: function() {
                this._eventHandles = [];
            },

            destroy: function() {
                (new Y.EventHandle(this._eventHandles)).detach();
            },

            bindUI: function() {
                var boundingBox;

                boundingBox = this.get('boundingBox');

                boundingBox.on('mouseenter', this._onBBMouseEnter, this);
                boundingBox.on('mouseleave', this._onBBMouseExit, this);

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
                    if (event.pageY < region.top + lineHeight * i) {
                        break;
                    }

                    ++line;
                }

                gutter = (gutter.top);

                y = region.top + line * lineHeight + gutter;

                return [x, y];
            },

            _onLinkMouseEnter: function(event) {
                var instance = this,
                    content,
                    contentBox,
                    escapedLinkText,
                    link,
                    linkText,
                    xy;

                clearTimeout(instance._hideHandle);

                link = event.currentTarget;

                linkText = link.getAttribute('href');

                contentBox = instance.get('contentBox');

                escapedLinkText = Y.Escape.html(linkText);

                content = Lang.sub(
                    instance.TPL_CONTENT,
                    {
                        content: escapedLinkText,
                        href: escapedLinkText
                    }
                );

                contentBox.set('innerHTML', content);

                xy = instance._getXY(event.pageX, event.pageX, link);

                instance.show();

                instance.set('xy', xy);

                link.once('mouseleave', function() {
                    clearTimeout(instance._hideHandle);

                    instance._attachHiddenHandle();
                });
            },

            _onBBMouseEnter: function() {
                clearTimeout(this._hideHandle);
            },

            _onBBMouseExit: function() {
                clearTimeout(this._hideHandle);

                this._attachHiddenHandle();
            },

            TPL_CONTENT: '<a contenteditable="true" href="{href}" target="_blank">{content}</a>'
        }, {
            ATTRS: {
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
        requires: ['dom-screen', 'escape', 'event-outside', 'node-event-delegate', 'event-mouseenter', 'overlay']
    });

    CKEDITOR.plugins.add(
        'linktooltip',
        {
            init: function(editor) {
                YUI().use('linktooltip', function(Y) {
                    var config,
                        tooltip;

                    config = Y.merge({
                        editor: editor
                    }, editor.config.linktooltip);

                    tooltip = new Y.LinkTooltip(config).render();
                });
            }
        }
    );
}());