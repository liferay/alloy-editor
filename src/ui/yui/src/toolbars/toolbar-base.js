YUI.add('toolbar-base', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array,

        EMPTY_LINE_REGEX = /\r?\n/;

    var KEY_ESC = 27;

    var KEY_TAB = 9;

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

            editor.on('editorInteraction', instance._onEditorInteraction, instance);
        },

        syncUI: function() {
            var buttonsContainer = this.get('buttonsContainer');

            buttonsContainer.plug(Y.Plugin.NodeFocusManager, {
                activeDescendant: 0,
                circular   : true,
                descendants: 'button',
                focusClass : 'focus',
                keys       : {next: 'down:39', previous: 'down:37'}
            });

            Y.one(buttonsContainer.getDOMNode()).on('keydown', this._onKeyDown, this);
        },

        /**
         * Check if toolbar ir currently focused. If not, put focus on it. If yes, 
         * retrieves focus to editor (works like 'ESC' button)
         *
         * @method removeFocus
         * @protected
         */
        focus: function() {
            var buttonsContainer = this.get('buttonsContainer');

            if (!buttonsContainer.focusManager.get('focused')) {
                buttonsContainer.focusManager.focus(0);
            }
        },

        /**
         * Search between the editor's toolbars the next one to be focused.
         * If noone else is visible, the default button ('add') will be shown
         */
        focusNextToolbar: function() {
           var defaultToolbar,
               found = false,
               i,
               toolbars = this.get('editor').config.toolbars;

            for (i in toolbars) {
                if (toolbars[i].get('defaultToolbar')) {
                    defaultToolbar = toolbars[i];
                }

                //skip current toolbar
                if ((toolbars[i].get('buttonsContainer') != this.get('buttonsContainer')) && toolbars[i].get('visible')) {
                    toolbars[i].focus();
                    found = true;
                }
            }

            if (!found && defaultToolbar) {
                defaultToolbar._triggerButton ? defaultToolbar._triggerButton.focus() : defaultToolbar.focus();
            }
        },

        /**
         * Check if toolbar ir currently focused and retrieve focus to editor
         *
         * @method removeFocus
         * @protected
         */
        removeFocus: function() {
            this.get('editor').focus();
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
            boundingBoxNode = boundingBox.getDOMNode();

            height = boundingBoxNode.offsetHeight;
            width = boundingBoxNode.offsetWidth;

            // Change the original points where the Toolbar should be positioned.
            // The X will be the same, but we will extract or add the height of the
            // Toolbar to the Y point.
            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {

                x = xy[0];
                y = (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) ? (xy[1] - height) : (xy[1] + height);

            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT || direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                x = (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT) ? (xy[0] - width) : (xy[0] + width);
                y = xy[1];
            }

            this.set('xy', [x, y]);

            transition.left = xy[0] + 'px';
            transition.top = xy[1] + 'px';

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
         * @return {Node} The container of all buttons attached to the current isntance of Toolbar.
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

        _onKeyDown: function(evt) {
            var instance = this;

            if (evt.keyCode === KEY_TAB) {
                evt.preventDefault();

                instance.focusNextToolbar();

            } else if (evt.keyCode === KEY_ESC) {
                instance.removeFocus();
            }
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
         * There should be only one default toolbar.
         */
        defaultToolbar: {
            validator: Lang.isBoolean
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