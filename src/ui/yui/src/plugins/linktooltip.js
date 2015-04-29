(function() {
    'use strict';

    if (CKEDITOR.plugins.get('linktooltip')) {
        return;
    }

    YUI.add('linktooltip', function(Y) {
        var Lang = Y.Lang,

            /**
             * The LinkTooltip class provides functionality for showing tooltip over link elements in editor.
             * The class will be also registered as CKEDITOR plugin -
             * {{#crossLink "CKEDITOR.plugins.linktooltip"}}{{/crossLink}}
             *
             * @class LinkTooltip
             */
            LinkTooltip = Y.Base.create('linktooltip', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionConstrain,
                Y.WidgetAutohide], {
                /**
                 * Initializer lifecycle implementation for the LinkTooltip class.
                 *
                 * @method initializer
                 * @protected
                 * @param config {Object} Configuration object literal for the editor
                 */
                initializer: function() {
                    this._eventHandles = [];
                },

                /**
                 * Destructor lifecycle implementation for the LinkTooltip class. Destroys the iattached event
                 * listeners.
                 *
                 * @method destructor
                 * @protected
                 */
                destructor: function() {
                    (new Y.EventHandle(this._eventHandles)).detach();
                },

                /**
                 * Renders the link tooltip node on contentBox.
                 *
                 * @method renderUI
                 * @protected
                 */
                renderUI: function() {
                    var content;

                    content = Y.Node.create(this.TPL_CONTENT);

                    this.get('contentBox').appendChild(content);

                    this._linkPreview = content.one('.link-preview');
                },

                /**
                 * Attaches event listeners such as mouseenter on link elements. Links, which have
                 * "data-cke-default-link" attribute will be ignored. These links are considered as
                 * internal; they are being created by automatically when user triggers link creation.
                 * See {{#crossLink "ButtonA/_onClick:method"}}{{/crossLink}} for more information.
                 *
                 * @method bindUI
                 * @protected
                 */
                bindUI: function() {
                    var editor;

                    this._bindBBMouseEnter();

                    editor = this.get('editor');

                    this._eventHandles.push(
                        Y.one(editor.element.$).delegate('mouseenter', this._onLinkMouseEnter,
                            'a[href]:not([data-cke-default-link])', this, editor)
                    );

                    this.get('boundingBox').on('clickoutside', this._onClickOutside, this);
                },

                /**
                 * Adds mouseleave listener to the boundingBox.
                 *
                 * @method _bindBBMouseLeave
                 * @protected
                 */
                _bindBBMouseLeave: function() {
                    var boundingBox;

                    boundingBox = this.get('boundingBox');

                    this._bbMouseLeaveHandle = boundingBox.once('mouseleave', this._onBBMouseLeave, this);
                },

                /**
                 * Adds mouseenter listener to the boundingBox.
                 *
                 * @method _bindBBMouseEnter
                 * @protected
                 */
                _bindBBMouseEnter: function() {
                    var boundingBox;

                    boundingBox = this.get('boundingBox');

                    this._bbMouseEnterHandle = boundingBox.on('mouseenter', this._onBBMouseEnter, this);
                },

                /**
                 * Hides the linktooltip container after some timeout, specified by
                 * {{#crossLink "LinkTooltip/hideTimeout:attribute"}}{{/crossLink}} attribute.
                 *
                 * @method _attachHiddenHandle
                 * @protected
                 */
                _attachHiddenHandle: function() {
                    this._hideHandle = setTimeout(
                        function() {
                            this.hide();
                        }.bind(this),
                        this.get('hideTimeout')
                    );
                },

                /**
                 * Calculates and returns the most appropriate position where link tooltip should appear.
                 * The position depends on the specified {{#crossLink "LinkTooltip/gutter:attribute"}}{{/crossLink}},
                 * and on the fact if the link occupies more than one line in the editor.
                 *
                 * @method _getXY
                 * @protected
                 * @param {Number} x Point X in page coordinates.
                 * @param {Number} y Point Y in page coordinates.
                 * @param {Node} y The link over which the tooltip should be shown.
                 * returns {Array} An Array with the most appropriate x and y points in page coordinates.
                 */
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

                        lines = Math.ceil((region.bottom - region.top) / lineHeight);

                        for (i = 1; i <= lines; i++) {
                            if (y < region.top + lineHeight * i) {
                                break;
                            }

                            ++line;
                        }

                        y = region.top + line * lineHeight + gutter;
                    } else {
                        y = region.bottom + gutter;
                    }

                    return [x, y];
                },

                /**
                 * Handles mouse enter event on the boundingBox.
                 * Clears any already started hide handle and attaches mouse leave listener to the boundingBox.
                 *
                 * @method _onBBMouseEnter
                 * @protected
                 */
                _onBBMouseEnter: function() {
                    clearTimeout(this._hideHandle);

                    this._bindBBMouseLeave();
                },

                /**
                 * Handles mouse leave event on the boundingBox.
                 * Clears any already started hide handle and attaches it again.
                 *
                 * @method _onBBMouseEnter
                 * @protected
                 */
                _onBBMouseLeave: function() {
                    clearTimeout(this._hideHandle);

                    this._attachHiddenHandle();
                },

                /**
                 * Hides the tooltip on clicking outside of the boundingBox.
                 *
                 * @method _onClickOutside
                 * @protected
                 */
                _onClickOutside: function() {
                    this.hide();
                },

                /**
                 * Reads the link href, updates tooltip content with the read value,
                 * shows the tooltip and attaches mouse leave listener on the boundingBox.
                 *
                 * @method _onLinkMouseEnter
                 * @protected
                 * @param {EventFacade} event Event that triggered when user positioned the mouse over the link.
                 */
                _onLinkMouseEnter: function(event) {
                    var instance = this,
                        link,
                        linkHref,
                        linkText,
                        linkTooltip,
                        xy;

                    if (this._editMode) {
                        return;
                    }

                    clearTimeout(instance._hideHandle);

                    link = event.currentTarget;

                    linkHref = link.getAttribute('href');

                    linkTooltip = link.getAttribute('data-cke-tooltip');

                    linkText = linkTooltip ? linkTooltip : linkHref;

                    this._linkPreview.setAttribute('href', linkHref);

                    this._linkPreview.set('innerHTML', Y.Escape.html(linkText));

                    instance.show();

                    xy = instance._getXY(event.pageX, event.pageY, link);

                    instance.set('xy', xy);

                    link.once('mouseleave', function() {
                        clearTimeout(instance._hideHandle);

                        instance._attachHiddenHandle();
                    });
                },

                BOUNDING_TEMPLATE: '<div class="alloy-editor-tooltip-link"></div>',

                TPL_CONTENT: '<div class="link-container">' +
                    '<span class="icon-link-container">' +
                    '<i class="alloy-editor-icon-link"></i>' +
                    '</span>' +
                    '<a class="link-preview" target="_blank"></a>' +
                    '</div>'
            }, {
                ATTRS: {
                    /**
                     * Specifies whether the toolbar show be constrained to some node or to the viewport.
                     *
                     * @attribute constrain
                     * @default true (will be constrained to the viewport)
                     * @type Boolean
                     */
                    constrain: {
                        validator: Lang.isBoolean,
                        value: true
                    },

                    /**
                     * Contains the native editor implementation.
                     *
                     * @attribute editor
                     * @default true
                     * @type Object
                     */
                    editor: {
                        validator: Y.Lang.isObject
                    },

                    /**
                     * Specifies the gutter of the tooltip. The gutter object contains the top and left
                     * offsets from the point, where the tooltip is supposed to appear.
                     *
                     * @attribute gutter
                     * @default {
                     *   left: 0,
                     *   top: 0
                     * }
                     * @type Object
                     */
                    gutter: {
                        validator: Lang.isObject,
                        value: {
                            left: 0,
                            top: 0
                        }
                    },

                    /**
                     * Specifies the timeout after which the link tooltip will be hidden.
                     *
                     * @attribute hideTimeout
                     * @default 2000 (sec)
                     * @type Number
                     */
                    hideTimeout: {
                        validator: Lang.isNumber,
                        value: 2000
                    }
                }
            });

        Y.LinkTooltip = LinkTooltip;

    }, '', {
        requires: ['dom-screen', 'escape', 'event-outside', 'node-event-delegate', 'event-mouseenter', 'widget-base',
            'widget-position', 'widget-position-constrain', 'widget-autohide']
    });

    /**
     * CKEDITOR plugin which allows displaying tooltip over links in the editor.
     * Internally it uses {{#crossLink "LinkTooltip"}}{{/crossLink}}. You may specify all
     * properties which {{#crossLink "LinkTooltip"}}{{/crossLink}} accepts via editor.config.linktooltip property.
     *
     * @class CKEDITOR.plugins.linktooltip
     */
    CKEDITOR.plugins.add(
        'linktooltip', {
            init: function(editor) {
                YUI().use('linktooltip', function(Y) {
                    var config,
                        tooltip;

                    config = Y.merge({
                        editor: editor,
                        visible: false
                    }, editor.config.linktooltip);

                    tooltip = new Y.LinkTooltip(config).render();

                    editor.on('destroy', function() {
                        tooltip.destroy();
                    });
                });
            }
        }
    );
}());