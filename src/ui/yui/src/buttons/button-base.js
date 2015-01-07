YUI.add('button-base', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YNode = Y.Node;

    function ButtonBase() {}

    /**
     * The ButtonBase class provides common functionality for a button like
     * reacting on click event, rendering and updating the UI.
     * A button implementation may be as simple as changing the style of selection
     * to bold, italic, underline, etc. or to be very complex - for example, to change
     * the UI of the host (toolbar). <br />
     * ToolbarBase and ButtonBase will provide everything you need to implement whatever you need.
     * Toolbars, which mix ToolbarBase extension will provide a container, where the button
     * should render. This container is accessible via "buttonsContainer" attribute.
     * If your button just changes the style of the selection, then everything you have to do
     * in order to implement it is: <br />
     * - extend Y.Plugin.Base and mix Y.ButtonBase extension
     * - specify the element to which you want to style the selection. This should be done via
     * "element" attribute. Here is the code: <br />
     * <pre><code>
     *    YUI.add('button-em', function (Y) {
     *        'use strict';
     *
     *         var Lang = Y.Lang;
     *
     *         var Em = Y.Base.create('em', Y.Plugin.Base, [Y.ButtonBase], {
     *             TPL_CONTENT: '&lt;i class=&quot;alloy-editor-icon-italic&quot;&gt;&lt;/i&gt;'
     *         }, {
     *             NAME: 'em',
     *
     *             NS: 'em',
     *
     *             ATTRS: {
     *                 element: {
     *                     validator: Lang.isString,
     *                     value: 'em'
     *                 }
     *             }
     *         });
     *
     *         Y.ButtonEm = Em;
     *
     *     },'', {
     *         requires: ['button-base']
     *     });
     * </code></pre>
     *
     * The code above creates a button, which will allow user to make selection italic.
     *
     * A more complex button may change the UI of the host (Toolbar) too. If the Toolbar mix
     * ToolbarBase extension, then it will export an attribute, called "buttonContainer". By
     * default, the buttons will be rendered in this container, so one button will be able to
     * hide the others and provide a different UI for the host (container).
     *
     * @class ButtonBase
     */

    /**
     * Fired once after user clicks on the button. ButtonBase will listen to this event and
     * call {{#crossLink "ButtonBase/updateUI:method"}}{{/crossLink}}, so the buttons
     * will have chance to update their UI accordingly. For example, if user clicks on
     * H2 button, and then clicks on H1 button, H2 button should remove its
     * {{#crossLink "ButtonBase/pressed:attribute"}}{{/crossLink}}, since these two styles
     * are mutually exclusive.
     *
     * @event actionPerformed
     */
    ButtonBase.prototype = {
        /**
         * Initializer lifecycle implementation for the ButtonBase class.
         *
         * @method initializer
         * @protected
         * @param config {Object} Configuration object literal for the editor
         */
        initializer: function() {
            var element;

            element = this.get('element');

            if (element) {
                this._style = new CKEDITOR.style({
                    element: element
                });
            }

            this.afterHostMethod('renderUI', this.renderUI, this);
            this.afterHostMethod('bindUI', this.bindUI, this);
            this.afterHostEvent(['positionChange', 'actionPerformed'], this.updateUI, this);
        },

        /**
         * Destructor lifecycle implementation for the ButtonBase class. Destroys the internal
         * button instance.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            this._button.destroy();
        },

        /**
         * Renders the button UI on the host which is typically a toolbar. The protected
         * {{#crossLink "ButtonBase/_renderButtonUI:method"}}{{/crossLink}} will be called,
         * so the buttons which mix this extension will be able to overwrite the default behaviour.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            this._renderButtonUI();
        },

        /**
         * ButtonBase does not provide implementation, the buttons which mix this extension
         * may provide one.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            // NOP, buttons should override it
        },

        /**
         * Updates the toggle status of the button. If the selection has the style, specified by
         * the button, its status will be made active and "pressed" attribute of the button will be
         * set to true, otherwise, it will be set to false. ButtonStrong for example is toggleable button.
         * Once "updateUI" function is called, the implementation will check if style "strong" is active on
         * the current selection. If so, "pressed" attribute of the button will be set to true and removed
         * otherwise.
         *
         * @method updateUI
         */
        updateUI: function() {
            var editor,
                elementPath,
                result;

            editor = this.get('host').get('editor');

            elementPath = editor.elementPath();

            // A button which augments button-base may have style or not.
            // The status will be set only for those buttons which have style.
            if (this._style) {
                result = this._style.checkActive(elementPath, editor);

                this._button.set('pressed', !!result);
            }
        },

        /**
         * Applies the style for this button if its current status is pressed
         * and removes it if button is not pressed. For example, ButtonStrong will
         * apply style "strong" to the selection, when pressed.
         *
         * @method _onClick
         * protected
         */
        _onClick: function() {
            var editor;

            // A button which augments button-base may have style or not.
            if (this._style) {
                editor = this.get('host').get('editor');

                if (this._button.get('pressed')) {
                    editor.applyStyle(this._style);
                } else {
                    editor.removeStyle(this._style);
                }
            }
        },

        /**
         * Fires {{#crossLink "ButtonBase/actionPerformed:event"}}{{/crossLink}}. ButtonBase listens
         * to this event and it will call {{#crossLink "ButtonBase/updateUI:method"}}{{/crossLink}}
         * function, so the buttons which are mutually exclusive, like H1 and H2 will be able to
         * update their UI accordingly.
         *
         * @method _afterClick
         * @protected
         */
        _afterClick: function() {
            this.fire('actionPerformed', {
                style: this._style
            });
        },

        /**
         * A Toolbar should provide a container (DOM Node) where the buttons will be rendered.
         * By default Toolbars, which extend ToolbarBase extension will expose an attribute,
         * called "buttonsContainer". The value of this attribute is the container where buttons will
         * be rendered, so they will share common container and one button may hide the others
         * temporally and provide custom UI for the Toolbar.
         *
         * @method _renderButtonUI
         * @protected
         */
        _renderButtonUI: function() {
            var btnInst,
                btnSrcNode,
                buttonsContainer;

            buttonsContainer = this.get('host').get('buttonsContainer');

            btnSrcNode = YNode.create(
                Lang.sub(this.TPL_BUTTON, {
                    content: this.TPL_CONTENT,
                    label: this.get('strings').label
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

        TPL_BUTTON: '<button aria-label="{label}" class="alloy-editor-button btn btn-default">{content}</button>'
    };

    ButtonBase.ATTRS = {
        /**
         * Collection of strings used to label elements of the button's UI.
         * ButtonBase provides string properties to specify the label of the button.
         *
         * @attribute strings
         * @default {label: 'Button'}
         * @type Object
         */
        strings: {
            validator: Lang.isObject,
            value: {
                label: 'Button'
            }
        },

        /**
         * Specifies if the button is toggleable, or not.
         * Buttons may be "toggleable" or "push" buttons.
         *
         * @attribute toggle
         * @default true
         * @type Boolean
         * @writeOnce 'initOnly'
         */
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