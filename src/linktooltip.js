;(function() {
    'use strict';

    CKEDITOR.plugins.add(
        'linktooltip',
        {
            init: function(editor) {
                YUI().use('dom-screen', 'node-event-delegate', 'event-mouseenter', 'overlay', function(Y) {
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
                        var link,
                            region,
                            tooltip;

                        clearTimeout(hideHandle);

                        link = event.currentTarget;

                        region = link.get('region');

                        tooltip = getTooltip();

                        tooltip.set('bodyContent', link.getAttribute('href'));

                        tooltip.set('xy', [event.pageX, region.bottom + 5]);

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