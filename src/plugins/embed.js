(function() {
    'use strict';

    /* istanbul ignore if */
    if (CKEDITOR.plugins.get('ae_embed')) {
        return;
    }

    CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//alloy.iframe.ly/api/oembed?url={url}&callback={callback}';
    CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL = '<div data-ae-embed-url="{url}"></div>';

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
                    allowedContent: 'div[!data-ae-embed-url]',
                    mask: true,
                    requiredContent: 'div[data-ae-embed-url]',

                    /**
                     * Listener to be executed every time the widget's data changes. It takes care of
                     * requesting the embed object to the configured oembed service and render it in
                     * the editor
                     *
                     * @param {event} event The Event
                     */
                    data: function(event) {
                        var widget = this;
                        var url = event.data.url;

                        if (url) {
                            CKEDITOR.tools.jsonp(AE_EMBED_URL_TPL, {
                                    url: encodeURIComponent(url)
                                }, function(response) {
                                    if (response.html) {
                                        widget.element.setHtml(response.html);
                                    } else {
                                        widget.element.setHtml(url);
                                    }
                                }, function(msg) {
                                    widget.element.setHtml(url);
                                }
                            );
                        }
                    },

                    /**
                     * Function used to upcast an element to ae_embed widgets.
                     *
                     * @param {CKEDITOR.htmlParser.element} element The element to be checked
                     * @param {Object} data The object that will be passed to the widget
                     */
                    upcast: function(element, data) {
                        var embedWidgetUpcastFn = editor.config.embedWidgetUpcastFn || defaultEmbedWidgetUpcastFn;

                        return embedWidgetUpcastFn(element, data);
                    },

                    /**
                     * Changes the widget's select state.
                     *
                     * @param {Boolean} selected Whether to select or deselect the widget
                     */
                    setSelected: function(selected) {
                        if (selected) {
                            editor.getSelection().selectElement(this.element);
                        }
                    }
                });

                // Add a listener to handle paste events and turn links into embed objects
                editor.once('contentDom', function() {
                    editor.on('paste', function(event) {
                        var link = event.data.dataValue;

                        if (/^https?/.test(link)) {
                            event.stop();

                            editor.execCommand('embedUrl', {
                                url: event.data.dataValue
                            });
                        }
                    });
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