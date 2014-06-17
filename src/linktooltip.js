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

                    function bindTooltip() {
                        var boundingBox;

                        boundingBox = tooltip.get('boundingBox');

                        tooltip.on('visibleChange', function(event) {
                            if (event.newVal) {
                                hideHandle = setTimeout(
                                    function() {
                                        //tooltip.hide();
                                    },
                                    3000);
                            }
                        });

                        boundingBox.on('mouseenter', function() {
                            clearTimeout(hideHandle);
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

                        link = event.currentTarget;

                        region = Y.DOM.region(link);

                        tooltip = getTooltip();

                        tooltip.set('bodyContent', link.getAttribute('href'));

                        tooltip.set('xy', [event.pageX, event.pageY + 5]);

                        tooltip.show();
                    }

                    node = Y.one(editor.element.$);

                    node.delegate('mouseenter', onLinkMouseEnter, 'a[href]', this, editor);
                });
            }
        }
    );
}());