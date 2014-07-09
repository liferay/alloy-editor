YUI.add('button-a', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,
        Link = CKEDITOR.tools.Link,

    A = Y.Base.create('a', Y.Plugin.Base, [Y.ButtonBase], {
        renderUI: function() {
            this._renderButtonUI();

            this._renderLinkUI();
        },

        bindUI: function() {
            this.onHostEvent('visibleChange', this._onVisibleChange, this);

            this._linkInput.on('keypress', this._onKeyPress, this);
            this._linkInput.on('valuechange', this._onValueChange, this);

            this._showText.on('click', this._switchToTextMode, this);

            this._closeLink.on('click', this._onCloseLinkClick, this);
            this._clearInput.on('click', this._onClearInputClick, this);
        },

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
                iconLinkNode.replaceClass('icon-link', 'icon-unlink');
            }
            else {
                iconLinkNode.replaceClass('icon-unlink', 'icon-link');
            }
        },

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
                }
                else {
                    x = curXY[0] - diff;
                }

                host.set('xy', [x, curXY[1]]);
            }
        },

        _attachHideHandler: function() {
            this._hideHandle = this.onceHostEvent('visibleChange', function(event) {
                if (!event.newVal) {
                    this._handleLink();
                }
            }, this);
        },

        _onClearInputClick: function() {
            this._linkInput.set('value', '');

            this._linkInput.focus();

            this._clearInput.hide();
            this._closeLink.disable();
        },

        _onCloseLinkClick: function() {
            this.get('host').hide();
        },

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

                Link.create('/', {
                    'data-cke-default-link': true
                });

                this._defaultLink = instance._link = Link.getFromSelection();

                this._attachHideHandler();
            }
            else {
                Link.remove();
            }
        },

        _handleLink: function() {
            var editor,
                href;

            href = this._linkInput.get('value');

            editor = this.get('host').get('editor');

            if (href) {
                Link.update(href, this._link);

                this._link.removeAttribute('data-cke-default-link');
            }
            else {
                Link.remove(this._link);
            }

            this._linkInput.set('value', '');

            this._link = null;
        },

        _onKeyPress: function(event) {
            if (event.charCode === 13) {
                this.get('host').hide();
            }
        },

        _onValueChange: function(event) {
            if (event.newVal) {
                this._clearInput.show();

                this._closeLink.enable();
            }
            else {
                this._clearInput.hide();

                this._closeLink.disable();
            }
        },

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
            else {
                // showing, check if we are over link already
                // if we are, open the host in link mode
                editor = this.get('host').get('editor');

                link = Link.getFromSelection();

                if (link) {
                    this._switchToLinkMode(link);
                }
                else {
                    this._switchToTextMode();
                }
            }
        },

        _removeHideHandler: function() {
            if (this._hideHandle) {
                this._hideHandle.detach();

                this._hideHandle = null;
            }
        },

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
                srcNode: linkContainer.one('.show-text')
            });
        },

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
                }
                else {
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

        _switchToLinkMode: function(link) {
            var editor,
                linkInput;

            editor = this.get('host').get('editor');

            link = link || Link.getFromSelection();

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

        TPL_LINK_CONTAINER:
            '<div class="link-wrapper hide">' +
                '<div class="pull-left btn-group show-buttons-container">' +
                    '<button class="btn show-text"><i class="alloy-editor-icon-font"></i></button>' +
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
                    '<button class="btn close-link"><i class="alloy-editor-icon-ok"></i></button>' +
                '</div>' +
            '</div>'
    }, {
        NAME: 'a',

        NS: 'a',

        ATTRS: {
            element: {
                validator: Lang.isString,
                value: 'a'
            },

            strings: {
                value: {
                    placeholder: 'Type or paste link here'
                }
            }
        }
    });

    Y.ButtonA = A;

},'', {
    requires: ['button-base', 'event-valuechange']
});