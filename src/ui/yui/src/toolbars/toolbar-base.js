YUI.add('toolbar-base', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array,

        KEY_ARROW_LEFT = 37,
        KEY_ARROW_RIGHT = 39,

        EMPTY_LINE_REGEX = /\r?\n/;

    function ToolbarBase() {}

    /**
     * The ToolbarBase extension is a common base for all AlloyEditor's Toolbars.
     *
     * @class ToolbarBase
     */
    ToolbarBase.prototype = {
        /**
         * Initializer lifecycle implementation for the ToolbarBase class.
         *
         * @method initializer
         * @protected
         * @param config {Object} Configuration object literal for the toolbar
         */
        initializer: function() {
            var instance = this,
                editor;

            editor = instance.get('editor');

            instance._editorNode = Y.one(editor.element.$);

            YArray.each(
                instance.get('buttons'),
                function(item) {
                    var buttonName,
                        cfg,
                        instanceName;

                    buttonName = Lang.isObject(item) ? item.name : item;

                    instanceName = instance._getButtonInstanceName(buttonName);

                    cfg = Lang.isObject(item) ? item.cfg : null;

                    instance.plug(Y[instanceName], cfg);

                    // Each button will fire actionPerformed when user interacts with it. Here we will
                    // re-fire this event to the other buttons so they will be able to update their UI too.
                    instance[Y[instanceName].NS].after('actionPerformed', instance._afterActionPerformed, instance);
                }
            );

            instance.after('render', instance._afterRender, instance);
            instance.after('visibleChange', instance._afterVisibleChange, instance);

            editor.on('editorInteraction', instance._onEditorInteraction, instance);
        },

        /**
         * Returns focus to editor.
         *
         * @method blur
         */
        blur: function() {
            this.get('editor').focus();
        },

        /**
         * If toolbar is visible, focuses the first button.
         *
         * @method focus
         * @return {Boolean} True if toolbar has been focused, false otherwise.
         */
        focus: function(currentButton) {
            var buttonsContainer,
                index,
                visible;

            buttonsContainer = this.get('buttonsContainer');

            index = currentButton || 0;

            visible = this.get('visible');

            if (visible) {
                buttonsContainer.focusManager.focus(index);
            }

            return visible;
        },

        /**
         * Returns the index of the currently focused (active) button in the toolbar.
         *
         * @return {Number} The index of the currently active button
         */
        getActiveButton: function() {
            var buttonsContainer = this.get('buttonsContainer');

            return buttonsContainer.focusManager.get('activeDescendant');
        },

        /**
         * Returns true if the passed node is a child node of the toolbar, false otherwise.
         *
         * @method ownsNode
         * @param  {Node|HTMLElement} node The node which should be checked if it is child node of the current toolbar.
         * @return {Boolean} True if the passed node is child node of the current toolbar.
         */
        ownsNode: function(node) {
            return this.get('boundingBox').contains(node);
        },

        /**
         * When toolbar has been rendered, initialize the focus manager and attach
         * listener for keyboard events
         *
         * @method _afterRender
         * @protected
         */
        _afterRender: function() {
            var buttonsContainer = this.get('buttonsContainer');

            buttonsContainer.plug(Y.Plugin.NodeFocusManager, {
                activeDescendant: 0,
                circular: true,
                descendants: 'button',
                focusClass: 'focus',
                keys: {
                    next: 'down:' + KEY_ARROW_RIGHT,
                    previous: 'down:' + KEY_ARROW_LEFT
                }
            });

            buttonsContainer.on('keydown', this._onKeyDown, this);
        },

        /**
         * Handles showing or hiding of the toolbar.
         * Fires {{#crossLink "CKEDITOR.plugins.uicore/ariaUpdate:event"}}{{/crossLink}} event with the status changes
         * of the toolbar.
         *
         * @method _afterVisibleChange
         * @protected
         * @param {EventFacade} event Event that triggered the toolbar has been made visible or hidden.
         */
        _afterVisibleChange: function(event) {
            var strings = this.get('strings');

            this.get('editor').fire('ariaUpdate', {
                message: Lang.sub(strings.state, {
                    focus: (event.newVal ? strings.focus : ''),
                    name: this.name,
                    state: (event.newVal ? strings.visible : strings.hidden)
                })
            });
        },

        /**
         * Applies transition specified via {{#crossLink "ToolbarBase/transition:attribute"}}{{/crossLink}} attribute.
         *
         * @method _applyTransition
         * @param {Array} xy The point in page coordinates where Toolbar should move.
         * @param {Number} direction The direction of the selection. Can be one of these:
         *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
         *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
         * @protected
         */
        _applyTransition: function(xy, direction) {
            var boundingBox,
                boundingBoxNode,
                height,
                transition,
                x,
                width,
                y;

            transition = this.get('transition');

            boundingBox = this.get('boundingBox');

            boundingBox.setStyle('visibility', 'hidden');
            boundingBox.setStyle('opacity', '0');
            boundingBoxNode = boundingBox.getDOMNode();

            height = boundingBoxNode.offsetHeight;
            width = boundingBoxNode.offsetWidth;

            // Change the original points where the Toolbar should be positioned.
            // The X will be the same, but we will extract or add the height of the
            // Toolbar to the Y point.
            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {

                x = xy[0];
                y = (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) ? (xy[1] - height) : (xy[1] + height);

            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ||
                direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                x = (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT) ? (xy[0] - width) : (xy[0] + width);
                y = xy[1];
            }

            this.set('xy', [x, y]);

            transition.left = xy[0] + 'px';
            transition.top = xy[1] + 'px';
            transition.opacity = 1;

            boundingBox.setStyle('visibility', 'visible');

            boundingBox.transition(transition);

            // Restore the original points where the Toorbad had to move.
            // Adding UI_SRC as the source of the event will prevent toolbar to move,
            // it will just set update XY attribute.
            this.set('xy', xy, {
                src: Y.Widget.UI_SRC
            });
        },

        /**
         * Re-fires {{#crossLink "ButtonBase/actionPerformed:event"}}{{/crossLink}} so the buttons
         * attached to Toolbar, which mixes this extension will be notified that user performed
         * an action.
         *
         * @method _afterActionPerformed
         * @protected
         * @param {EventFacade} event The {{#crossLink "ButtonBase/actionPerformed:event"}}{{/crossLink}} event.
         */
        _afterActionPerformed: function(event) {
            this.fire('actionPerformed', event);
        },

        /**
         * Returns the container in which all buttons are being rendered.
         *
         * @method _getButtonsContainer
         * @protected
         * @return {Node} The container of all buttons attached to the current instance of Toolbar.
         */
        _getButtonsContainer: function() {
            return this._buttonsContainer;
        },

        /**
         * Resolves and returns the name of the Button from the current editor configuration.
         *
         * @method _getButtonInstanceName
         * @protected
         * @param {String} buttonName The name of the button as specified in Toolbar configuration.
         * @return {String} The constructed name of Button.
         * See {{#crossLink "CKEDITOR.plugins.uiloader/_getModules:method"}}{{/crossLink}}
         * for more information about the rules for constructing button names.
         */
        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        },

        /**
         * Detects if the current line is empty
         *
         * @method _isCurrentLineEmpty
         * @protected
         * @return {Boolean} True if the current line is empty.
         */
        _isCurrentLineEmpty: function() {
            var currentLine;

            currentLine = this.get('editor').getSelection().getRanges()[0].getCommonAncestor();

            return EMPTY_LINE_REGEX.test(currentLine.getText());
        },

        /**
         * Moves the Toolbar to a point in page coordinates. If transition was specified via the
         * {{#crossLink "ToolbarBase/transition:attribute"}}{{/crossLink}}, the movement will be
         * delegated to the transition, except if Toolbar is already visible. In the last case
         * transition will be ignored.
         *
         * @method _moveToPoint
         * @param {Array} xy The point in page coordinates where Toolbar should move.
         * @param {Number} direction The direction of the selection. Can be one of these:
         *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
         *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
         * @param {Object} config Provides additional configuration attributes to the function.
         * This parameter is optional. If not provided, the transition will be applied (if any).
         * Supported parameters are:
         * - visible: true or false. If toolbar is visible, the transition will be applied (if any).
         * If not, it will be suppressed and only the new position will be set.
         * @protected
         */
        _moveToPoint: function(xy, direction, config) {
            var transition;

            transition = this.get('transition');

            if (transition && (!config || !config.visible)) {
                this._applyTransition(xy, direction);
            } else {
                this.set('xy', xy);
            }
        },

        /**
         * Fires <code>toolbarKey</code> event. Editor should listen this event
         * and perform the associated action.
         *
         * @method _onKeyDown
         * @param {EventFacade} event Event that triggered when user pressed a key inside the toolbar.
         * @protected
         */
        _onKeyDown: function(event) {
            this.get('editor').fire('toolbarKey', event);
        }
    };

    ToolbarBase.ATTRS = {
        /**
         * Returns the container in Toolbar's contentBox, where all buttons are rendered.
         *
         * @attribute buttonsContainer
         * @type Node
         * @readOnly
         */
        buttonsContainer: {
            getter: '_getButtonsContainer',
            readOnly: true
        },

        /**
         * Contains the native editor implementation.
         *
         * @attribute editor
         * @default true
         * @type Object
         */
        editor: {
            validator: Lang.isObject
        },

        /**
         * Collection of strings used to label elements of the toolbar's UI.
         * ToolbarBase provides string properties to specify the messages for:
         *  - How to focus on the toolbar
         *  - Possible toolbar states (hidden and visible)
         *  - Current toolbar state. This works as a template. It's possible to
         *  use the placeholders {name}, {state} and {focus} to inject messages
         *  into the generated string.
         *
         * @attribute strings
         * @default {focus: 'Press Alt + F10 to focus on the toolbar.', hidden: 'hidden', state: 'Toolbar {name} is now {state}. {focus}', visible: 'visible'}
         * @type Object
         */
        strings: {
            validator: Lang.isObject,
            value: {
                focus: 'Press Alt + F10 to focus on the toolbar.',
                hidden: 'hidden',
                state: 'Toolbar {name} is now {state}. {focus}',
                visible: 'visible'
            }
        },

        /**
         * Specifies the transition which should be applied when Toolbar moves to given position.
         *
         * @attribute transition
         * @default {
         *    easing: 'ease-out',
         *    duration: 0.1
         *  }
         * @type Object
         */
        transition: {
            value: {
                easing: 'ease-out',
                duration: 0.1
            }
        }
    };

    Y.ToolbarBase = ToolbarBase;

}, '', {
    requires: ['node-focusmanager', 'node-base', 'plugin']
});
