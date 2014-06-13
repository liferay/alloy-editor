YUI.add('button-a', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node,

    A = Y.Base.create('a', Y.Plugin.Base, [Y.ButtonBase], {
        renderUI: function() {
            this._renderButtonUI();

            this._renderLinkUI();
        },

        bindUI: function() {
            this.onHostEvent('visibleChange', this._onVisibleChange, this);

            this._linkInput.on('keypress', this._onKeyPress, this);
        },

        _getSelectedLink: function() {
            var editor,
                range,
                selection,
                selectedElement;

            editor = this.get('host').get('editor');

            selection = editor.getSelection();

            selectedElement = selection.getSelectedElement();

            if (selectedElement && selectedElement.is('a')) {
                return selectedElement;
            }

            range = selection.getRanges()[0];

            if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);

                return editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }

            return null;
        },

        _createLink: function(URI) {
            var editor,
                range,
                selection,
                style,
                text;

            editor = this.get('host').get('editor');

            selection = editor.getSelection();

            range = selection.getRanges()[0];

            if (range.collapsed) {
                text = new CKEDITOR.dom.text(URI, editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

            style = new CKEDITOR.style({
                element: 'a',
                attributes: {
                    href: URI,
                    'data-cke-saved-href': URI
                }
            });

            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, editor);
            range.select();
        },

        _onClearClick: function() {
            this.get('host').hide();
        },

        _onClick: function(event) {
            var instance = this,
                btnInst,
                editor,
                link,
                linkInput,
                range,
                selection;

            btnInst = event.target;

            editor = instance.get('host').get('editor');

            if (btnInst.get('pressed')) {
                selection = editor.getSelection();

                instance._buttonsContainer.addClass('hide');
                instance._linkContainer.removeClass('hide');

                linkInput = instance._linkInput;

                linkInput.focus();

                instance._createLink('/');

                linkInput.once('blur', function() {
                    link = linkInput.get('value');

                    if (link) {
                        instance._updateLink(link);
                    }
                    else {
                        instance._removeLink();
                    }

                    range = editor.getSelection().getRanges()[0];

                    range.collapse();

                    range.select();

                    instance._linkContainer.one('input').set('value', '');
                });

                instance._linkContainer.one('.input-clear-container').once('click', instance._onClearClick, this);
            }
            else {
                instance._removeLink();
            }
        },

        _onKeyPress: function(event) {
            if (event.charCode === 13) {
                this.get('host').hide();
            }
        },

        _onVisibleChange: function(event) {
            if (!event.newVal) {
                this._linkContainer.addClass('hide');
                this._buttonsContainer.removeClass('hide');
            }
        },

        _removeLink: function() {
            var editor,
                style;

            style = new CKEDITOR.style({
                alwaysRemoveElement: 1,
                element: 'a',
                type: CKEDITOR.STYLE_INLINE
            });

            editor = this.get('host').get('editor');

            editor.removeStyle(style);
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
        },

        _updateLink: function(URI) {
            var editor,
                element;

            editor = this.get('host').get('editor');
            element = this._getSelectedLink(editor);

            element.setAttributes({
                href: URI,
                'data-cke-saved-href': URI
            });
        },

        TPL_CONTENT: '<i class="icon-link"></i>',

        TPL_LINK_CONTAINER:
            '<div class="row input-wrapper hide">' +
                '<div class="span10 input-container">' +
                    '<input class="input-large" type="text" placeholder="{placeholder}">' +
                '</div>' +
                '<div class="span2 input-clear-container">' +
                    '<button class="btn"><i class="icon-remove"></i></button>' +
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
    requires: ['button-base']
});