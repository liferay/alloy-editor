YUI.add('toolbar-base', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array;

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
                    var instanceName;

                    instanceName = instance._getButtonInstanceName(item);

                    item = Lang.isObject(item) ? item : null;

                    instance.plug(Y[instanceName], item);

                    // Each button will fire actionPerformed when user interacts with it. Here we will
                    // re-fire this event to the other buttons so they will be able to update their UI too.
                    instance[Y[instanceName].NS].after('actionPerformed', instance._afterActionPerformed, instance);
                }
            );

            editor.on('editorInteraction', instance._onEditorInteraction, instance);
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
                y;

            transition = this.get('transition');

            boundingBox = this.get('boundingBox');

            boundingBox.setStyle('visibility', 'hidden');
            boundingBoxNode = boundingBox.getDOMNode();

            height = boundingBoxNode.offsetHeight;

            // Change the original points where the Toolbar should be positioned.
            // The X will be the same, but we will extract or add the height of the
            // Toolbar to the Y point.

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                y = xy[1] - height;
            } else {
                y = xy[1] + height;
            }

            this.set('xy', [xy[0], y]);

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
         * @protected
         */
        _moveToPoint: function(xy, direction) {
            var transition;

            transition = this.get('transition');

            if (transition && !this.get('visible')) {
                this._applyTransition(xy, direction);
            } else {
                this.set('xy', xy);
            }
        },
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
    requires: ['plugin', 'node-base']
});