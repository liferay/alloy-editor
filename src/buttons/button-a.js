YUI.add('button-a', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,
        Link = CKEDITOR.plugins.UITools.Link,

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
                linkInput,
                selection;

            btnInst = event.target;

            editor = instance.get('host').get('editor');

            if (btnInst.get('pressed')) {
                selection = editor.getSelection();

                instance._buttonsContainer.addClass('hide');
                instance._linkContainer.removeClass('hide');

                linkInput = instance._linkInput;

                linkInput.focus();

                Link.create('/');

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

            this._linkContainer.addClass('hide');
            this._buttonsContainer.removeClass('hide');
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

        TPL_CONTENT: '<i class="icon-link"></i>',

        TPL_LINK_CONTAINER:
            '<div class="row link-wrapper hide">' +
                '<div class="pull-left show-buttons-container">' +
                    '<button class="show-text"><i class="icon-font"></i></button>' +
                '</div>' +
                '<div class="pull-left input-wrapper">' +
                    '<span class="input-container">' +
                        '<input class="input-large" type="text" placeholder="{placeholder}"></input>' +
                        '<span class="input-clear">' +
                            '<i class="icon-remove"></i>' +
                        '</span>' +
                    '</span>' +
                '</div>' +
                '<div class="pull-right input-close-container">' +
                    '<button class="close-link"><i class="icon-ok"></i></button>' +
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