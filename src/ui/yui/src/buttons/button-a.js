YUI.add('button-a', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        /**
         * The ButtonA class provides functionality for creating a link button.
         *
         * @class Y.ButtonA
         */
        A = Y.Base.create('a', Y.Plugin.Base, [Y.ButtonBase], {
            /**
             * Initializer lifecycle implementation for the ButtonA class.
             *
             * @method initializer
             * @protected
             * @param  config {Object} Configuration object literal for the editor
             */
            initializer: function() {
                this._ckLink = new CKEDITOR.Link(this.get('host').get('editor'));
            },

            /**
             * Renders the button which handles the link creation on the current selection and
             * the UI, which provides input element where the user will be able to specify the
             * href of the link.
             *
             * @method renderUI
             */
            renderUI: function() {
                this._renderButtonUI();

                this._renderLinkUI();
            },

            /**
             * Binds event subscriptions from the UI and the source (if assigned).
             * Registers a few events, like handling key press, or mouse events on
             * the button for clearing the link.
             *
             * @method bindUI
             */
            bindUI: function() {
                this.onHostEvent('visibleChange', this._onVisibleChange, this);

                this._linkInput.on('keypress', this._onKeyPress, this);
                this._linkInput.on('valuechange', this._onValueChange, this);

                this._showText.on('click', this._switchToTextMode, this);

                this._closeLink.on('click', this._onCloseLinkClick, this);
                this._clearInput.on('click', this._onClearInputClick, this);
            },

            /**
             * Overwrites the default implementation from {{#crossLink "Y.ButtonBase/updateUI:method"}}{{/crossLink}}.
             * The button updates its "pressed" attribute and changes the UI accordingly to the presence or lack of
             * link style of the selection.
             *
             * @method updateUI
             */
            updateUI: function() {
                var editor,
                    elementPath,
                    iconLinkNode,
                    result;

                editor = this.get('host').get('editor');

                elementPath = editor.elementPath();

                if (this._style) {
                    result = this._style.checkActive(elementPath, editor);

                    this._button.set('pressed', !!result);
                }

                iconLinkNode = this._button.get('boundingBox').one('i');

                if (this._button.get('pressed')) {
                    iconLinkNode.replaceClass('alloy-editor-icon-link', 'alloy-editor-icon-unlink');
                } else {
                    iconLinkNode.replaceClass('alloy-editor-icon-unlink', 'alloy-editor-icon-link');
                }
            },

            /**
             * Changes position of the Toolbar, and adjusts it according to the selection,
             * since the width of the UI for adding/edtiting of link href  might be shorter
             * or larger than the default Toolbar UI.
             *
             * @method _adjustHostPosition
             * @protected
             */
            _adjustHostPosition: function(oldHostWidth) {
                var curHostWidth,
                    curXY,
                    diff,
                    host,
                    x;

                host = this.get('host');

                if (host.get('visible')) {
                    curHostWidth = host.get('boundingBox').get('offsetWidth');

                    diff = Math.abs((oldHostWidth - curHostWidth) / 2);

                    curXY = host.get('xy');

                    if (curHostWidth < oldHostWidth) {
                        x = curXY[0] + diff;
                    } else {
                        x = curXY[0] - diff;
                    }

                    host.set('xy', [x, curXY[1]]);
                }
            },

            /**
             * Attaches a visibleChange listener on the Toolbar so the UI will commit or discard the link
             * if the button hides.
             *
             * @method _attachHideHandler
             * @protected
             */
            _attachHideHandler: function() {
                this._hideHandle = this.onceHostEvent('visibleChange', function(event) {
                    if (!event.newVal) {
                        this._handleLink();
                    }
                }, this);
            },

            /**
             * Attaches a visibleChange listener so the UI will commit or discard the link
             * when the button hides.
             *
             * @method _onClearInputClick
             * @protected
             */
            _onClearInputClick: function() {
                this._linkInput.set('value', '');

                this._linkInput.focus();

                this._clearInput.hide();
                this._closeLink.disable();
            },

            /**
             * Hides the Toolbar on clicking the close link button.
             *
             * @method _onCloseLinkClick
             * @protected
             */
            _onCloseLinkClick: function() {
                this.get('host').hide();
            },

            /**
             * Handles the click event from the user. If button status is "pressed", activates the UI for
             * creating the link. Otherwise, removes the link from the current selection.
             * On activating the UI for link creation, a default link with href= "/" will be created and it
             * will be keep in button instance as _defaultLink property.
             *
             * @method _onClick
             * @protected
             */
            _onClick: function(event) {
                var instance = this,
                    btnInst,
                    editor,
                    oldHostWidth,
                    linkInput,
                    selection;

                btnInst = event.target;

                editor = instance.get('host').get('editor');

                if (btnInst.get('pressed')) {
                    selection = editor.getSelection();

                    oldHostWidth = this.get('host').get('boundingBox').get('offsetWidth');

                    instance._buttonsContainer.addClass('hide');
                    instance._linkContainer.removeClass('hide');

                    this._adjustHostPosition(oldHostWidth);

                    linkInput = instance._linkInput;

                    linkInput.focus();

                    this._ckLink.create('/', {
                        'data-cke-default-link': true
                    });

                    this._defaultLink = instance._link = this._ckLink.getFromSelection();

                    this._attachHideHandler();
                } else {
                    this._ckLink.remove();
                }
            },

            /**
             * Updates the default link with the real href, if any, or removes the
             * default link from the current selection.
             * See {{#crossLink "Y.ButtonA/_onClick:method"}}{{/crossLink}} for more information
             * about the default link.
             *
             * @method _handleLink
             * @protected
             */
            _handleLink: function() {
                var editor,
                    href;

                href = this._linkInput.get('value');

                editor = this.get('host').get('editor');

                if (href) {
                    this._ckLink.update(href, this._link);

                    this._link.removeAttribute('data-cke-default-link');
                } else {
                    this._ckLink.remove(this._link);
                }

                this._linkInput.set('value', '');

                this._link = null;
            },

            /**
             * Checks if user presses Enter key and hides the Toolbar, if so.
             *
             * @method _onKeyPress
             * @protected
             */
            _onKeyPress: function(event) {
                if (event.charCode === 13) {
                    this.get('host').hide();
                }
            },

            /**
             * Shows or hides the close link button if link input contains some value.
             *
             * @method _onValueChange
             * @protected
             */
            _onValueChange: function(event) {
                if (event.newVal) {
                    this._clearInput.show();

                    this._closeLink.enable();
                } else {
                    this._clearInput.hide();

                    this._closeLink.disable();
                }
            },

            /**
             * On button hide, restore the default UI for creating link.
             * On button show, checks if the current selection has link style or not.
             * If it has, activates the UI for editing link, otherwise, activates the UI
             * for creating a link.
             *
             * @method _onValueChange
             * @protected
             */
            _onVisibleChange: function(event) {
                var editor,
                    link;

                if (!event.newVal) {
                    this._linkContainer.addClass('hide');
                    this.get('host').get('buttonsContainer').removeClass('hide');

                    this._clearInput.hide();
                    this._closeLink.disable();

                    this._defaultLink = null;
                } else {
                    // showing, check if we are over link already
                    // if we are, open the host in link mode
                    editor = this.get('host').get('editor');

                    link = this._ckLink.getFromSelection();

                    if (link) {
                        this._switchToLinkMode(link);
                    } else {
                        this._switchToTextMode();
                    }
                }
            },

            /**
             * Removes the attached visibleChange handler on the Toolbar which
             * handles the commit or discard process of the link.
             * See {{#crossLink "Y.ButtonA/_attachHideHandler:method"}}{{/crossLink}} for more information.
             *
             * @method _removeHideHandler
             * @protected
             */
            _removeHideHandler: function() {
                if (this._hideHandle) {
                    this._hideHandle.detach();

                    this._hideHandle = null;
                }
            },

            /**
             * Creates the UI for adding a link.
             *
             * @method _renderLinkUI
             * @protected
             */
            _renderLinkUI: function() {
                var contentBox,
                    linkContainer;

                linkContainer = YNode.create(
                    Lang.sub(
                        this.TPL_LINK_CONTAINER, {
                            placeholder: this.get('strings').placeholder
                        }
                    )
                );

                contentBox = this.get('host').get('contentBox');

                contentBox.appendChild(linkContainer);

                this._buttonsContainer = this.get('host').get('buttonsContainer');

                this._linkContainer = linkContainer;

                this._linkInput = linkContainer.one('input');

                this._clearInput = linkContainer.one('.input-clear i');

                this._clearInput.hide();

                this._closeLink = new Y.Button({
                    disabled: true,
                    render: linkContainer.one('.input-close-container'),
                    srcNode: linkContainer.one('.close-link')
                });

                this._showText = new Y.Button({
                    render: linkContainer.one('.show-buttons-container'),
                    srcNode: linkContainer.one('.switch-to-edit')
                });
            },

            /**
             * Changes the UI of the Toolbar so the user will be able to change the styles
             * of the selection instead to create a link.
             *
             * @method _switchToTextMode
             * @protected
             */
            _switchToTextMode: function() {
                var bookmarks,
                    editor,
                    linkText,
                    oldHostWidth,
                    selection;

                this._removeHideHandler();

                if (this._defaultLink) {
                    // We were in text mode and default link has been created.
                    // If there is link text, we have to update the link with the new value.
                    // Otherwise, we have to remove the link and restore the selection.
                    linkText = this._linkInput.get('value');

                    if (!linkText) {
                        editor = this.get('host').get('editor');

                        selection = editor.getSelection();

                        bookmarks = selection.createBookmarks();

                        this._handleLink();

                        selection.selectBookmarks(bookmarks);
                    } else {
                        this._handleLink();
                    }

                    this._defaultLink = null;

                    this.fire('actionPerformed');
                }

                oldHostWidth = this.get('host').get('boundingBox').get('offsetWidth');

                this._linkContainer.addClass('hide');
                this._buttonsContainer.removeClass('hide');

                this._adjustHostPosition(oldHostWidth);
            },

            /**
             * Changes the UI of the Toolbar so the user will be able to to create a link to
             * change the styles of the selection.
             *
             * @method _switchToLinkMode
             * @protected
             */
            _switchToLinkMode: function(link) {
                var editor,
                    linkInput;

                editor = this.get('host').get('editor');

                link = link || this._ckLink.getFromSelection();

                this._clearInput.show();
                this._closeLink.disable();

                this._buttonsContainer.addClass('hide');
                this._linkContainer.removeClass('hide');

                linkInput = this._linkInput;

                linkInput.set('value', link.$.href);

                setTimeout(
                    function() {
                        linkInput.select();
                        linkInput.focus();
                    }, 0);

                this._link = link;

                this._attachHideHandler();
            },

            TPL_CONTENT: '<i class="alloy-editor-icon-link"></i>',

            TPL_LINK_CONTAINER: '<div class="link-wrapper hide">' +
                '<div class="pull-left btn-group show-buttons-container">' +
                '<button class="alloy-editor-button btn switch-to-edit"><i class="alloy-editor-icon-font"></i></button>' +
                '</div>' +
                '<div class="pull-left btn-group input-wrapper">' +
                '<span class="input-container">' +
                '<input class="input-large" type="text" placeholder="{placeholder}"></input>' +
                '<span class="input-clear">' +
                '<i class="alloy-editor-icon-remove-small"></i>' +
                '</span>' +
                '</span>' +
                '</div>' +
                '<div class="pull-right btn-group input-close-container">' +
                '<button class="alloy-editor-button btn close-link"><i class="alloy-editor-icon-ok"></i></button>' +
                '</div>' +
                '</div>'
        }, {
            NAME: 'a',

            NS: 'a',

            ATTRS: {
                /**
                 * Specifies the element (style) which this button handles.
                 *
                 * @attribute element
                 * @default 'a'
                 * @type String
                 */
                element: {
                    validator: Lang.isString,
                    value: 'a'
                },

                /**
                 * Collection of strings used to label elements of the button's UI.
                 * ButtonA provides one string property, to specify the value of link placeholder.
                 *
                 * @attribute strings
                 * @default {placeholder: 'Type or paste link here'}
                 * @type String
                 */
                strings: {
                    value: {
                        placeholder: 'Type or paste link here'
                    }
                }
            }
        });

    Y.ButtonA = A;

}, '', {
    requires: ['button-base', 'event-valuechange']
});