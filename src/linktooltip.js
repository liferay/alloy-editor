;(function() {
    'use strict';

    CKEDITOR.plugins.add(
        'linktooltip',
        {
            init: function(editor) {
                YUI().use('dom-screen', 'escape', 'node-event-delegate', 'event-mouseenter', 'overlay', function(Y) {
                    var hideHandle,
                        node,
                        tooltip;

                    function attachHiddenHandle() {
                        hideHandle = setTimeout(
                            function() {
                                tooltip.hide();
                            },
                            editor.config.linktooltip.hideDelay || 2000);
                    }

                    function bindTooltip() {
                        var boundingBox;

                        boundingBox = tooltip.get('boundingBox');

                        boundingBox.on('mouseenter', function() {
                            clearTimeout(hideHandle);
                        });

                        boundingBox.on('mouseleave', function() {
                            clearTimeout(hideHandle);

                            attachHiddenHandle();
                        });
                    }

                    function getTooltip() {
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
                    }

                    function getXY(x, y, link) {
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
                    }

                    function onLinkMouseEnter(event) {
                        var link,
                            linkText,
                            tooltip,
                            xy;

                        clearTimeout(hideHandle);

                        link = event.currentTarget;

                        tooltip = getTooltip();

                        linkText = link.getAttribute('href');

                        tooltip.set('bodyContent', '<a href="' + Y.Escape.html(linkText) + '" target="_blank">' + Y.Escape.html(linkText) + '</a>');

                        xy = getXY(event.pageX, event.pageX, link);

                        tooltip.set('xy', xy);

                        tooltip.show();

                        link.once('mouseleave', function() {
                            clearTimeout(hideHandle);

                            attachHiddenHandle();
                        });
                    }

                    node = Y.one(editor.element.$);

                    node.delegate('mouseenter', onLinkMouseEnter, 'a[href]', this, editor);
                });
            }
        }
    );
}());