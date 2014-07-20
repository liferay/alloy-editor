YUI.add('button-base', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node;

    function ButtonBase() {}

    /**
     * The ButtonBase class provides common functionality for a button like
     * reacting on click event, rendering and updating the UI.
     * A button implementation may be simple as changing the style of selection
     * to bold, italic, underline, etc. or to be pretty
     *
     * @class ButtonBase
     */
    ButtonBase.prototype = {
        /**
         * Initializer lifecycle implementation for the ButtonBase class.
         *
         * @method initializer
         * @protected
         * @param  config {Object} Configuration object literal for the editor
         */
        initializer: function() {
            var element;

            element = this.get('element');

            if (element) {
                this._style = new CKEDITOR.style({
                    element: this.get('element')
                });
            }

            this.afterHostMethod('renderUI', this.renderUI, this);
            this.afterHostMethod('bindUI', this.bindUI, this);
            this.afterHostEvent(['visibleChange', 'actionPerformed'], this.updateUI, this);
        },

        destructor: function() {
            this._button.destroy();
        },

        /**
         * Renders the button UI on the host which is typically a toolbar. The protected
         * {{#crossLink "Y.ButtonBase/_renderButtonUI:method"}}{{/crossLink}} will be called,
         * so the buttons which mix this extension will be able to overwrite the default behaviour.
         *
         * @method renderUI
         */
        renderUI: function() {
            this._renderButtonUI();
        },

        bindUI: function() {
            // NOP, buttons should override it
        },

        updateUI: function() {
            var editor,
                elementPath,
                result;

            editor = this.get('host').get('editor');

            elementPath = editor.elementPath();

            if (this._style) {
                result = this._style.checkActive(elementPath, editor);

                this._button.set('pressed', !!result);
            }
        },

        _onClick: function() {
            var editor;

            if (this._style) {
                editor = this.get('host').get('editor');

                if (this._button.get('pressed')) {
                    editor.applyStyle(this._style);
                } else {
                    editor.removeStyle(this._style);
                }
            }
        },

        _afterClick: function() {
            this.fire('actionPerformed', {
                style: this._style
            });
        },

        /**
         *
         * A Toolbar provides DOM Node where the buttons render. By default Toolbars,
         * which extend ToolbarBase extension will provide and attribute, called "buttonsContainer".
         * The value of this attribute is the container where button should render.
         */
        _renderButtonUI: function() {
            var btnInst,
                btnSrcNode,
                buttonsContainer;

            buttonsContainer = this.get('host').get('buttonsContainer');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: this.TPL_CONTENT
                })
            );

            btnInst = this.get('toggle') ? 'ToggleButton' : 'Button';

            this._button = new Y[btnInst]({
                after: {
                    click: Y.bind(this._afterClick, this)
                },
                on: {
                    click: Y.bind(this._onClick, this)
                },
                render: buttonsContainer,
                srcNode: btnSrcNode
            });
        },

        TPL_BUTTON: '<button class="alloy-editor-button btn">{content}</button>'
    };

    ButtonBase.ATTRS = {
        toggle: {
            validator: Lang.isBoolean,
            value: true,
            writeOnce: 'initOnly'
        }
    };

    Y.ButtonBase = ButtonBase;

}, '', {
    requires: ['base-build', 'plugin', 'button']
});