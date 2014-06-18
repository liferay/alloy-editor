;(function() {
    'use strict';

    YUI.add('linktooltip', function (Y) {
        var LinkTooltip = Y.Base.create('linktooltip', Y.Widget, [Y.WidgetPosition], {
            initializer: function() {
                // body...
            },

            attachHiddenHandle: function() {
                this._hideHandle = setTimeout(
                    function() {
                        tooltip.hide();
                    },
                    editor.config.linktooltip.hideDelay || 2000);
            },

            bindTooltip: function() {
                var boundingBox;

                boundingBox = tooltip.get('boundingBox');

                mouseEnterHandle = boundingBox.on('mouseenter', onBBMouseEnter);

                mouseExitHandle = boundingBox.on('mouseleave', onBBMouseExit);
            },

            getTooltip: function() {
                var boundingBox;

                if (!editor.config.linktooltip) {
                    editor.config.linktooltip = {};
                }

                tooltip = editor.config.linktooltip.el;

                if (!tooltip) {
                    tooltip = new Y.Overlay({
                        constrain: true,
                        render: true,
                        zIndex: 1
                    });

                    boundingBox = tooltip.get('boundingBox');

                    boundingBox.addClass('link-tooltip');

                    editor.config.linktooltip.el = tooltip;

                    bindTooltip();
                }

                return tooltip;
            },

            getXY: function(x, y, link) {
                var gutter,
                    i,
                    line,
                    lineHeight,
                    lines,
                    region;

                lineHeight = parseInt(link.getComputedStyle('lineHeight'), 10);

                gutter = editor.config.linktooltip.gutter || {};

                region = link.get('region');

                lines = Math.ceil((region.bottom - region.top) / lineHeight);

                line = 1;

                for (i = 1; i <= lines; i++) {
                    if (event.pageY < region.top + lineHeight * i) {
                        break;
                    }

                    ++line;
                }

                gutter = (gutter.top || 0);

                y = region.top + line * lineHeight + gutter;

                return [x, y];
            },

            onLinkMouseEnter: function(event) {
                var link,
                    linkText,
                    tooltip,
                    xy;

                clearTimeout(hideHandle);

                link = event.currentTarget;

                tooltip = getTooltip();

                linkText = link.getAttribute('href');

                tooltip.set('bodyContent', '<a contenteditable="true" href="' + Y.Escape.html(linkText) + '" target="_blank">' + Y.Escape.html(linkText) + '</a>');

                xy = getXY(event.pageX, event.pageX, link);

                tooltip.set('xy', xy);

                tooltip.show();

                link.once('mouseleave', function() {
                    clearTimeout(hideHandle);

                    attachHiddenHandle();
                });
            },

            onBBMouseEnter: function() {
                clearTimeout(hideHandle);
            },

            onBBMouseExit: function() {
                clearTimeout(hideHandle);

                attachHiddenHandle();
            }
        },
        {
            ATTRS: {
                editor: {
                    validator: Y.Lang.isObject
                }
            }
        });

        Y.LinkTooltip = LinkTooltip;

    },'', {
        requires: ['dom-screen', 'escape', 'event-outside', 'node-event-delegate', 'event-mouseenter', 'overlay']
    });


    YUI().use(, function(Y) {
                    var hideHandle,
                        node,
                        tooltip,
                        mouseExitHandle,
                        mouseEnterHandle;

                    

                    node = Y.one(editor.element.$);

                    node.delegate('mouseenter', onLinkMouseEnter, 'a[href]', this, editor);
                });

    CKEDITOR.plugins.add(
        'linktooltip',
        {
            init: function(editor) {
                
            }
        }
    );
}());