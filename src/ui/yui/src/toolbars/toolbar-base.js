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
         * Fires {{#crossLink "ButtonBase/_afterActionPerformed:event"}}{{/crossLink}} so the buttons
         * attached to Toolbar, which mixes this extension will be notified that user performed
         * an action.
         *
         * @method _afterActionPerformed
         * @protected
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
         * @return {String} The constructed name of Button.
         * See {{#crossLink "CKEDITOR.plugins.uiloader/_getModules:method"}}{{/crossLink}}
         * for more information about the rules for constructing button names.
         */
        _getButtonInstanceName: function(buttonName) {
            return 'Button' + buttonName.substring(0, 1).toUpperCase() + buttonName.substring(1);
        },

        /**
         * Moves the Toolbar to a point in page coordinates. If transition was specified via the
         * {{#crossLink "ToolbarBase/transition:attribute"}}{{/crossLink}}, it will be applied too.
         *
         * @method _moveToPoint
         * @protected
         */
        _moveToPoint: function(xy, direction) {
            var boundingBox,
                boundingBoxNode,
                height,
                transition,
                y;

            boundingBox = this.get('boundingBox');

            boundingBox.setStyle('visibility', 'hidden');

            transition = this.get('transition');

            if (transition) {
                boundingBoxNode = boundingBox.getDOMNode();

                height = boundingBoxNode.offsetHeight;

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
            } else {
                boundingBox.setStyle('visibility', 'visible');

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