(function() {
    'use strict';

    /* istanbul ignore if */
    if (CKEDITOR.plugins.get('ae_embed')) {
        return;
    }

    var REGEX_HTTP = /^https?/;

    var REGEX_DEFAULT_LINK = /<a href=/;

    var PROVIDERS = ['youtube', 'twitter'];

    CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = 'http://alloy.iframe.ly/api/oembed?url={url}&callback={callback}';
    CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL = '<div data-ae-embed-url="{url}"></div>';
    CKEDITOR.DEFAULT_AE_EMBED_DEFAULT_LINK_TPL = '<a href="{url}">{url}</a>';
    /**
     * CKEditor plugin which adds the infrastructure to embed urls as media objects using an oembed
     * service. By default, and for demoing purposes only, the oembed service is hosted in iframe.ly
     * at //alloy.iframe.ly/api/oembed?url={url}&callback={callback}. Note this should be changed to
     * a self-hosted or paid service in production environments. Access to the alloy.iframe.ly endpoint
     * may be restricted per domain due to significant traffic.
     *
     * This plugin adds an `embedUrl` command that can be used to easily embed a URL and transform it
     * to an embedded content.
     *
     * @class CKEDITOR.plugins.ae_embed
     */
    CKEDITOR.plugins.add(
        'ae_embed', {
            requires: 'widget',
            init: function(editor) {
                var AE_EMBED_URL_TPL = new CKEDITOR.template(editor.config.embedUrlTemplate || CKEDITOR.DEFAULT_AE_EMBED_URL_TPL);
                var AE_EMBED_WIDGET_TPL = new CKEDITOR.template(editor.config.embedWidgetTpl || CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL);
                var AE_EMBED_DEFAULT_LINK_TPL = new CKEDITOR.template(editor.config.embedLinkDefaultTpl || CKEDITOR.DEFAULT_AE_EMBED_DEFAULT_LINK_TPL);

                // Default function to upcast DOM elements to embed widgets.
                // It matches CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL
                var defaultEmbedWidgetUpcastFn = function(element, data) {
                    if (element.name === 'div' && element.attributes['data-ae-embed-url']) {
                        data.url = element.attributes['data-ae-embed-url'];

                        return true;
                    }
                };

                // Create a embedUrl command that can be invoked to easily embed media URLs
                editor.addCommand('embedUrl', {
                    exec: function(editor, data) {
                        editor.insertHtml(
                            AE_EMBED_WIDGET_TPL.output({
                                url: data.url
                            })
                        );
                    }
                });

                // Create a widget to properly handle embed operations
                editor.widgets.add('ae_embed', {


                    mask: true,
                    requiredContent: 'div[data-ae-embed-url]',

                    /**
                     * Listener to be executed every time the widget's data changes. It takes care of
                     * requesting the embed object to the configured oembed service and render it in
                     * the editor
                     *
                     * @method data
                     * @param {event} event Data change event
                     */
                    data: function(event) {
                        var widget = this;

                        var url = event.data.url;

                        if (url) {
                            CKEDITOR.tools.jsonp(AE_EMBED_URL_TPL, {
                                url: encodeURIComponent(url)
                            }, function(response) {
                                if (response.html) {
                                    if (REGEX_DEFAULT_LINK.test(response.html)) {
                                        widget.createATag(url);
                                    } else {
                                        widget.element.setHtml(response.html);
                                    }
                                } else {
                                    widget.createATag(url);
                                }
                            }, function(msg) {
                                widget.createATag(url);
                            });
                        }
                    },

                    createATag: function(url) {
                        this.editor.execCommand('undo');

                        var currentSelection = this.editor.getSelection().getSelectedElement();

                        var aTagHtml = AE_EMBED_DEFAULT_LINK_TPL.output({
                            url: url
                        });

                        this.editor.insertHtml(aTagHtml);
                        this.editor.fire('actionPerformed', this);
                    },

                    /**
                     * Function used to upcast an element to ae_embed widgets.
                     *
                     * @method upcast
                     * @param {CKEDITOR.htmlParser.element} element The element to be checked
                     * @param {Object} data The object that will be passed to the widget
                     */
                    upcast: function(element, data) {
                        var embedWidgetUpcastFn = editor.config.embedWidgetUpcastFn || defaultEmbedWidgetUpcastFn;

                        return embedWidgetUpcastFn(element, data);
                    }
                });

                // Add a listener to handle paste events and turn links into embed objects
                editor.once('contentDom', function() {
                    editor.on('paste', function(event) {
                        var link = event.data.dataValue;

                        if (REGEX_HTTP.test(link)) {
                            event.stop();

                            editor.execCommand('embedUrl', {
                                url: event.data.dataValue
                            });
                        }
                    });
                });

                // Add a listener to handle selection change events and properly detect editor
                // interactions on the widgets without messing with widget native selection
                editor.on('selectionChange', function(event) {
                    var selection = editor.getSelection();

                    if (selection){
                        var element = selection.getSelectedElement();

                        if (element) {
                            var widgetElement = element.findOne('[data-widget="ae_embed"]');

                            if (widgetElement) {
                                var region = element.getClientRect();

                                var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();
                                region.left -= scrollPosition.x;
                                region.top += scrollPosition.y;

                                region.direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;

                                editor.fire('editorInteraction', {
                                    nativeEvent: {},
                                    selectionData: {
                                        element: widgetElement,
                                        region: region
                                    }
                                });
                            }
                        }
                    }
                });

                // Add a filter to skip filtering widget elements
                editor.filter.addElementCallback(function(element) {
                    if ('data-ae-embed-url' in element.attributes) {
                        return CKEDITOR.FILTER_SKIP_TREE;
                    }
                });
            }
        }
    );
}());