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
                            editor.config.linktooltip.hideDelay || 3000);
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

                    function onLinkMouseEnter(event) {
                        var gutter,
                            link,
                            lineHeight,
                            linkText,
                            region,
                            tooltip;

                        clearTimeout(hideHandle);

                        link = event.currentTarget;

                        lineHeight = parseInt(link.getComputedStyle('lineHeight'), 10);

                        region = link.get('region');

                        tooltip = getTooltip();

                        linkText = link.getAttribute('href');

                        tooltip.set('bodyContent', '<a href="' + Y.Escape.html(linkText) + '" target="_blank">' + Y.Escape.html(linkText) + '</a>');

                        gutter = editor.config.linktooltip.gutter || {};

                        var lines = Math.ceil((region.bottom - region.top) / lineHeight);

                        var line = 1;

                        for (var i = 1; i <= lines; i++) {
                            if (event.pageY <= region.top + lineHeight * i) {
                                break;
                            }

                            ++line;
                        }


                        gutter = (gutter.top || 5);

                        var y = region.top + line * lineHeight + gutter;

                        tooltip.set('xy', [event.pageX, y]);

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