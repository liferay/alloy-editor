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
                this.onHostEvent('visibleChange', this._onVisibleChange, this);
                this.onHostEvent('positionChange', this._switchView, this);

                this._linkInput.on('keydown', this._onLinkInputKeyDown, this);
                this._linkInput.on('valuechange', this._onValueChange, this);

                this._switchToTextButton.on('click', this._onSwitchButtonClick, this);

                this._closeLink.on('click', this._onCloseLinkClick, this);
                this._clearInput.on('click', this._onClearInputClick, this);

                this._linkContainer.delegate('keydown', this._onLinkContainerKeyDown, 'button', this);
            },

            /**
             * Overwrites the default implementation from {{#crossLink "ButtonBase/updateUI:method"}}{{/crossLink}}.
             * The button updates its "pressed" attribute and changes the UI accordingly to the presence or lack of
             * link style of the selection.
             *
             * @method updateUI
             */
            updateUI: function() {
                var dataType,
                    editor,
                    elementPath,
                    iconLinkNode,
                    result;

                editor = this.get('host').get('editor');

                elementPath = editor.elementPath();

                result = this._style.checkActive(elementPath, editor);

                dataType = elementPath.lastElement.data('type');

                this._button.set('pressed', !!result && !dataType);

                iconLinkNode = this._button.get('boundingBox').one('i');
            },

            /**
             * Changes position of the Toolbar, and adjusts it according to the selection,
             * since the width of the UI for adding/editing of link href might be shorter
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
                        this._updateLink();
                    }
                }, this);
            },

            /**
             * Attaches a hook to Toolbar activation.
             *
             * @method _attachToolbarActiveHook
             */
            _attachToolbarActiveHook: function() {
                this._toolbarActiveHandler = Y.Do.before(this._onToolbarActive, this.get('host'), 'focus', this);
            },

            /**
             * Handles the situation when user cancels committing the changes in the link.
             *
             * @method _cancelLinkChanges
             * @protected
             */
            _cancelLinkChanges: function() {
                // Detach hide handler, so link processing will be done here and not on toolbar hide.
                this._detachHideHandler();

                // If there is default link, it should be removed.
                // Otherwise, we just skip updating the href of the link.
                if (this._defaultLink) {
                    this._removeLink(this._defaultLink);
                }

                // In both cases we have to set empty value to the link input.
                this._linkInput.set('value', '');
            },

            /**
             * Detaches the hook to Toolbar focus method.
             *
             * @method _detachFocusHandler
             */
            _detachFocusHandler: function() {
                if (this._toolbarActiveHandler) {
                    Y.Do.detach(this._toolbarActiveHandler);

                    this._toolbarActiveHandler = null;
                }
            },

            /**
             * Detaches the attached visibleChange handler on the Toolbar which
             * handles the commit or discard process of the link.
             * See {{#crossLink "ButtonA/_attachHideHandler:method"}}{{/crossLink}} for more information.
             *
             * @method _detachHideHandler
             * @protected
             */
            _detachHideHandler: function() {
                if (this._hideHandle) {
                    this._hideHandle.detach();

                    this._hideHandle = null;
                }
            },

            /**
             * Handles pressing Enter key on link input.
             *
             * @method _handleLinkInputEnter
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed Enter on link input
             */
            _handleLinkInputEnter: function(event) {
                var editor,
                    host,
                    ranges,
                    selection;

                // Editor has listener for click and keydown in order to detect
                // when user will stop interact with the editor. On each click and keydown the target is being checked
                // and if it is not part of the editor node or part of any Toolbar, editor assumes
                // the user navigated to other part of the page. In this case it hides the toolbars.
                // In order to prevent that, we have to stop propagating key ENTER to editor because in
                // this case the target will be body and the editor will assume the user stopped
                // to interact with the editor and it will hide the toolbars.
                event.stopPropagation();

                host = this.get('host');

                editor = host.get('editor');

                selection = editor.getSelection();

                ranges = selection.getRanges();

                host.hide();

                setTimeout(function() {
                    var range;

                    range = editor.createRange();

                    range.moveToPosition(ranges[0].endContainer, CKEDITOR.POSITION_AFTER_END);

                    selection.selectRanges([range]);
                }, 0);
            },

            /**
             * Handles pressing Esc key on link input.
             *
             * @method _handleLinkInputEsc
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed Esc on link input
             */
            _handleLinkInputEsc: function(event) {
                this._cancelLinkChanges();

                this.get('host').get('editor').fire('toolbarKey', event);
            },

            /**
             * Handles pressing Tab key on link input.
             *
             * @method _handleLinkInputTab
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed Tab on link input
             */
            _handleLinkInputTab: function() {
                event.preventDefault();

                if (!this._closeLink.get('disabled')) {
                    // focus this._switchToTextButton
                    this._linkContainer.focusManager.focus(0);
                }
                else {
                    // focus this._closeLink
                    this._linkContainer.focusManager.focus(1);
                }
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
                    editor,
                    linkInput,
                    oldHostWidth,
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

                    this._attachToolbarActiveHook();
                    this._attachHideHandler();
                } else {
                    this._ckLink.remove();
                }
            },

            /**
             * Handles keydown events attached to link UI.
             *
             * @method _onLinkContainerKeyDown
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed a key.
             */
            _onLinkContainerKeyDown: function(event) {
                if (event.charCode === KEY_TAB) {
                    event.preventDefault();
                }

                this.get('host').get('editor').fire('toolbarKey', event);
            },

            /**
             * Handles pressing key on link input.
             * - on Esc it reverts any changes.
             * - on Enter it commits any changes made to the link.
             * - on Tab it navigates to the next button on the UI for link creation.
             *
             * @method _onLinkInputKeyDown
             * @protected
             * @param {EventFacade} event Event that triggered when user pressed a key.
             */
            _onLinkInputKeyDown: function(event) {
                if (event.keyCode === KEY_ESC) {
                    this._handleLinkInputEsc(event);

                } else if (event.keyCode === KEY_ENTER) {
                    this._handleLinkInputEnter(event);

                } else if (event.keyCode === KEY_TAB) {
                    this._handleLinkInputTab(event);
                }
            },

            /**
             * Handles clicking on switch to text view button.
             *
             * @method _onSwitchButtonClick
             * @protected
             * @param {EventFacade} event An Event Facade object
             */
            _onSwitchButtonClick: function(event) {
                this._switchToTextView();

                // call again focus on the toolbar so that the some of styles buttons will be focused
                this.get('host').focus();
            },

            /**
             * Handles focus event when link container is visible. In this case input element is the element
             * which should be focused.
             *
             * @method _onToolbarActive
             * @protected
             */
            _onToolbarActive: function() {
                var result = false;

                if (!this._linkContainer.hasClass('hide')) {
                    this._linkInput.focus();

                    result = true;
                }

                return new Y.Do.Halt(null, result);
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
             * @method _onVisibleChange
             * @protected
             * @param {EventFacade} event An Event Facade object with the new and old value
             * of visible property.
             */
            _onVisibleChange: function(event) {
                if (!event.newVal) {
                    this._linkContainer.addClass('hide');
                    this.get('host').get('buttonsContainer').removeClass('hide');

                    this._clearInput.hide();
                    this._closeLink.disable();

                    this._defaultLink = null;

                    this._detachFocusHandler();
                }
            },

            /**
             * Removes link and restores the editor selection.
             *
             * @method _removeLink
             * @param {CKEDITOR.dom.element} link optional The link which should be removed.
             */
            _removeLink: function(link) {
                var bookmarks,
                    editor,
                    selection;

                link = link || this._link;

                editor = this.get('host').get('editor');

                selection = editor.getSelection();

                bookmarks = selection.createBookmarks();

                this._linkInput.set('value', '');

                this._ckLink.remove(link);

                selection.selectBookmarks(bookmarks);
            },

            /**
             * Creates the UI for adding a link.
             *
             * @method _renderLinkUI
             * @protected
             */
            _renderLinkUI: function() {
                var contentBox,
                    linkContainer,
                    strings;

                strings = this.get('strings');

                linkContainer = YNode.create(
                    Lang.sub(
                        this.TPL_LINK_CONTAINER, {
                            back: strings.back,
                            clear: strings.clear,
                            confirm: strings.confirm,
                            placeholder: strings.placeholder
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

                linkContainer.plug(Y.Plugin.NodeFocusManager, {
                    activeDescendant: 0,
                    circular: true,
                    descendants: 'button',
                    focusClass: 'focus',
                    keys: {
                        next: 'down:' + KEY_ARROW_RIGHT,
                        previous: 'down:' + KEY_ARROW_LEFT
                    }
                });
            },

            /**
             * Changes the UI of the Toolbar so the user will be able to change the styles
             * of the selection instead to create a link.
             *
             * @method _switchToTextView
             * @protected
             */
            _switchToTextView: function() {
                var linkText,
                    oldHostWidth;

                this._detachFocusHandler();
                this._detachHideHandler();

                if (this._defaultLink) {
                    // We were in text mode and default link has been created.
                    // If there is link text, we have to update the link with the new value.
                    // Otherwise, we have to remove the link and restore the selection.
                    linkText = this._linkInput.get('value');

                    if (!linkText) {
                        this._removeLink();
                    } else {
                        this._updateLink();
                    }

                    this._defaultLink = null;

                    this.fire('actionPerformed');
                }

                this._linkContainer.addClass('hide');
                this._buttonsContainer.removeClass('hide');

                oldHostWidth = this.get('host').get('boundingBox').get('offsetWidth');
                this._adjustHostPosition(oldHostWidth);
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
                var editor,
                    linkInput,
                    oldHostWidth;

                editor = this.get('host').get('editor');

                link = link || this._ckLink.getFromSelection();

                this._clearInput.show();
                this._closeLink.disable();

                this._buttonsContainer.addClass('hide');
                this._linkContainer.removeClass('hide');

                linkInput = this._linkInput;

                linkInput.set('value', link.$.href);

                this._link = link;

                this._attachToolbarActiveHook();
                this._attachHideHandler();

                oldHostWidth = this.get('host').get('boundingBox').get('offsetWidth');
                this._adjustHostPosition(oldHostWidth);
            },

            /**
             * Checks if the current selection is a link, and changes the UI of the toolbar to
             * link view if so. Otherwise, switches to text view.
             *
             * @method  _switchView
             * @protected
             */
            _switchView: function() {
                var editor,
                    link;

                editor = this.get('host').get('editor');

                link = this._ckLink.getFromSelection();

                if (link && !link.data('type')) {
                    this._switchToLinkView(link);
                } else {
                    this._switchToTextView();
                }
            },

            /**
             * Updates the default link with the real href, if any, or removes the
             * default link from the current selection.
             * See {{#crossLink "ButtonA/_onClick:method"}}{{/crossLink}} for more information
             * about the default link.
             *
             * @method _updateLink
             * @protected
             */
            _updateLink: function() {
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

            TPL_CONTENT: '<i class="alloy-editor-icon-link"></i>',

            TPL_LINK_CONTAINER: '<div class="link-wrapper hide">' +
                '<div class="pull-left btn-group input-wrapper">' +
                '<span class="input-container">' +
                '<input class="input-large" type="text" placeholder="{placeholder}"></input>' +
                '<span aria-label="{clear}" class="input-clear">' +
                '<i class="alloy-editor-icon-remove"></i>' +
                '</span>' +
                '</span>' +
                '</div>' +
                '<div class="pull-left btn-group input-close-container">' +
                '<button aria-label="{confirm}" class="alloy-editor-button btn btn-default close-link">' +
                '<i class="alloy-editor-icon-ok"></i></button>' +
                '</div>' +
                '<div class="pull-right btn-group show-buttons-container">' +
                '<button aria-label="{back}" class="alloy-editor-button btn btn-default switch-to-edit">' +
                '<i class="alloy-editor-icon-close"></i></button>' +
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
                 * ButtonA provides string properties to specify the messages for:
                 *  - Link input placeholder
                 *  - Button label
                 *  - Button actions (back, clear and confirm)
                 *
                 * @attribute strings
                 * @default {back: 'Back', clear: 'Clear', confirm: 'Confirm', label: 'Link', placeholder: 
                 *     'Type or paste link here'}
                 * @type Object
                 */
                strings: {
                    value: {
                        back: 'Back',
                        clear: 'Clear',
                        confirm: 'Confirm',
                        label: 'Link',
                        placeholder: 'Type or paste link here'
                    }
                }
            }
        });

    Y.ButtonA = A;

}, '', {
    requires: ['button-base', 'event-valuechange', 'node-focusmanager']
});
