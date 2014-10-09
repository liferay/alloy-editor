YUI.add('button-a', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

        KEY_ARROW_LEFT = 37,
        KEY_ARROW_RIGHT = 39,
        KEY_ENTER = 13,
        KEY_ESC = 27,
        KEY_TAB = 9,

        /**
         * The ButtonA class provides functionality for creating a link button.
         *
         * @class ButtonA
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
             * @protected
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
             * @protected
             */
            bindUI: function() {
                console.log('bindUI button-a');
                this.onHostEvent('visibleChange', this._onVisibleChange, this);
                this.onHostEvent('positionChange', this._switchView, this);

                //this._linkInput.on('keyup', this._onInputKeyDown, this); //keyup does not detect TAB key
                this._linkInput.on('valuechange', this._onValueChange, this);

                this._switchToTextButton.on('click', this._switchToTextView, this);

                this._closeLink.on('click', this._onCloseLinkClick, this);
                this._clearInput.on('click', this._onClearInputClick, this);
            },

            /**
             * Overwrites the default implementation from {{#crossLink "ButtonBase/updateUI:method"}}{{/crossLink}}.
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
             * @param {Number} oldHostWidth The previous width of the host (Toolbar).
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
             * Updates the default link with the real href, if any, or removes the
             * default link from the current selection.
             * See {{#crossLink "ButtonA/_onClick:method"}}{{/crossLink}} for more information
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
             * Handles the click event from the user. If button status is "pressed", activates the UI for
             * creating the link. Otherwise, removes the link from the current selection.
             * On activating the UI for link creation, a default link with href= "/" will be created and it
             * will be kept in button instance as _defaultLink property. This link will also have an attribute,
             * called "data-cke-default-link", so these links will be easily distinguished from the others.
             * An implementation of Link Tooltip for example may ignore these links.
             *
             * @method _onClick
             * @protected
             * @param {EventFacade} event Event that triggered when user clicked on the button.
             */
            _onClick: function(event) {
                var instance = this,
                    btnInst,
                    oldHostWidth;

                btnInst = event.target;

                if (btnInst.get('pressed')) {

                    oldHostWidth = this.get('host').get('boundingBox').get('offsetWidth');

                    this._adjustHostPosition(oldHostWidth);

                    this._ckLink.create('/', {
                        'data-cke-default-link': true
                    });

                    this._defaultLink = instance._link = this._ckLink.getFromSelection();

                    this._showLinkView();
                } else {
                    this._ckLink.remove();
                }
            },

            /**
             * Hides the Toolbar on clicking the close link button.
             *
             * @method _onCloseLinkClick
             * @protected
             */
            _onCloseLinkClick: function(event) {
                console.log('_onCloseLinkClick');
                event.preventDefault();
                this.get('host').hide();
            },

            /**
             * Handles the key events on input field.
             * If Enter/ESC key is pressed, it hides the Toolbar.
             * If Tab key is pressed, action buttons are focused.
             *
             * @method _onInputKeyDown
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed a key.
             */
            _onInputKeyDown: function(event) {
                if (event.charCode === KEY_ENTER || event.charCode === KEY_ESC) {
                    this.get('host').hide();

                    this.get('host').get('editor').fire('toolbarKey', event);
                } else if (event.charCode === KEY_TAB) {
                    event.preventDefault();

                    //TODO first item could be disabled
                    this._linkContainer.focusManager.focus(0);
                }
            },

            /**
             * Key events at action buttons are delegated to editor.
             *
             * @method _onLinkButtonKeyUp
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed a key.
             */
            _onLinkButtonKeyUp: function(event) {
                console.log('_onLinkButtonKeyUp');
                if (event.charCode === KEY_ENTER) {
                    event.stopPropagation(); console.log('stopPropagation for key ENTER');
                } else if ( event.charCode === KEY_TAB) {
                    event.preventDefault();console.log('preventDefault for key TAB');
                }

                this.get('host').get('editor').fire('toolbarKey', event);

            },

            /**
             * If parent toolbar has been focused by FocusManager, but link container
             * is visible, input element is the one which should be focused.
             *
             * @method _onToolbarFocused
             * @protected
             */
            _onToolbarFocused: function() {
                if (!this._linkContainer.hasClass('hide')) {
                    this._linkInput.focus();

                    return true;
                }
            },

            /**
             * Shows or hides the close link button if link input contains some value.
             *
             * @method _onValueChange
             * @protected
             * @param {EventFacade} event An Event Facade object with the new and old value
             * of the input container.
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
             * @param {EventFacade} event An Event Facade object with the new and old value
             * of visible property.
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
                }
            },

            /**
             * Removes the attached visibleChange handler on the Toolbar which
             * handles the commit or discard process of the link.
             * See {{#crossLink "ButtonA/_attachHideHandler:method"}}{{/crossLink}} for more information.
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


                console.log('_renderLinkUI');

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

                this._switchToTextButton = new Y.Button({
                    render: linkContainer.one('.show-buttons-container'),
                    srcNode: linkContainer.one('.switch-to-edit')
                });

                this._linkContainer.plug(Y.Plugin.NodeFocusManager, {
                    activeDescendant: 0,
                    circular: true,
                    descendants: 'button',
                    focusClass: 'focus',
                    keys: {
                        next: 'down:' + KEY_ARROW_RIGHT,
                        previous: 'down:' + KEY_ARROW_LEFT
                    }
                });

                this._linkContainer.delegate('keydown', this._onLinkButtonKeyUp, 'button', this);
            },

            /** TODO

            * EDITOR SHOULD SAVE THAT FOCUSED TOOLBAR IS TOOLBARSTYLES. 
             * [_showLinkView description]
             * @return {[type]} [description]
             */
            _showLinkView: function() {
                var linkInput;

                this._buttonsContainer.addClass('hide');
                this._linkContainer.removeClass('hide');

                linkInput = this._linkInput;

                setTimeout(
                    function() {
                        linkInput.select();
                        linkInput.focus();
                    }, 0);

                this._attachHideHandler();

                console.log('_showLinkView');
                this._linkInput.on('keydown', this._onInputKeyDown, this);

                this._focusHandler = Y.Do.before(this._onToolbarFocused, this.get('host'), 'focus', this);
            },

            /**
             * Changes the UI of the Toolbar so the user will be able to to create a link to
             * change the styles of the selection.
             *
             * @method _switchToLinkView
             * @protected
             * @param {CKEDITOR.dom.element} link The currently selected link from editor selection.
             */
            _switchToLinkView: function(link) {
                this._link  = link || this._ckLink.getFromSelection();

                this._clearInput.show();
                this._closeLink.disable();

                this._linkInput.set('value', link.$.href);

                this._showLinkView();
            },

            /**
             * Changes the UI of the Toolbar so the user will be able to change the styles
             * of the selection instead to create a link.
             *
             * @method _switchToTextView
             * @protected
             */
            _switchToTextView: function() {
                var bookmarks,
                    editor,
                    linkText,
                    oldHostWidth,
                    selection;

                if (this._focusHandler) {
                    Y.Do.detach(this._focusHandler);
                    //this._focusHandler.detach();

                    this._focusHandler = null;
                }

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
             * Checks if the current selection is a link, and
             * shows link view if so. Otherwise, text view is shown.
             *
             * @method  _switchView
             * @protected
             */
            _switchView: function() {
                var editor,
                    link;

                // showing, check if we are over link already
                // if we are, open the host in link mode
                editor = this.get('host').get('editor');

                link = this._ckLink.getFromSelection();

                if (link) {
                    this._switchToLinkView(link);
                } else {
                    this._switchToTextView();
                }
            },

            TPL_CONTENT: '<i class="alloy-editor-icon-link"></i>',

            TPL_LINK_CONTAINER: '<div class="link-wrapper hide">' +
                '<div class="pull-left btn-group input-wrapper">' +
                '<span class="input-container">' +
                '<input class="input-large" type="text" placeholder="{placeholder}"></input>' +
                '<span class="input-clear">' +
                '<i class="alloy-editor-icon-remove"></i>' +
                '</span>' +
                '</span>' +
                '</div>' +
                '<div class="pull-left btn-group input-close-container">' +
                '<button class="alloy-editor-button btn btn-default close-link"><i class="alloy-editor-icon-ok"></i></button>' +
                '</div>' +
                '<div class="pull-right btn-group show-buttons-container">' +
                '<button class="alloy-editor-button btn btn-default switch-to-edit"><i class="alloy-editor-icon-remove"></i></button>' +
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
    requires: ['button-base', 'event-custom', 'event-valuechange', 'node-focusmanager']
});