YUI.add('toolbar-styles', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        YArray = Y.Array,

        STR_SELECTION_TEXT = 'text',
        STR_SELECTION_IMAGE = 'image',

        SELECTION_TYPES = {},

        /**
         * The ToolbarStyles class hosts the buttons for handling editor selection selections.
         *
         * @class ToolbarStyles
         */
        ToolbarStyles = Y.Base.create('toolbarstyles', Y.Widget, [Y.WidgetPosition, Y.WidgetPositionConstrain, Y.ToolbarBase, Y.ToolbarPosition], {
            /**
             * Creates the container where buttons, attached to the instance of Toolbar should render.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this,
                    buttonsContainer,
                    selectionContainer,
                    contentBox;

                this.get('boundingBox').addClass('arrow-box arrow-box-bottom');

                contentBox = this.get('contentBox');

                contentBox.addClass('btn-toolbar');

                buttonsContainer = contentBox.one('.selections');

                YArray.each(
                    instance._getSelectionsConfig(),
                    function(selection) {
                        selectionContainer = Y.Node.create(
                            Y.Lang.sub(
                                instance.TPL_BUTTONS_CONTAINER,
                                {
                                    selectionType: selection.type
                                }
                            )
                        );

                        buttonsContainer.appendChild(selectionContainer);

                        YArray.each(
                            selection.buttons,
                            Y.bind('_appendButton', instance, selectionContainer)
                        );
                    }
                );

                instance._buttonsContainer = buttonsContainer;
            },

            /**
             * Attaches listener to <code>toolbarsHide</code> event.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                this.get('editor').on('toolbarsHide', this._onToolbarsHide, this);
            },

            /**
             * Resolves all required modules based on the current toolbar configuration.
             *
             * @method getModules
             * @return {Array} An Array with all the module names required by
             * the current toolbar configuration.
             */
            getModules: function() {
                var self = this,
                    modules;

                modules = [];

                YArray.each(
                    this._getSelectionsConfig(),
                    function(selection) {
                        YArray.each(
                            selection.buttons,
                            function(button) {
                                modules.push('button-' + self._getButtonName(button));
                            }
                        );
                    }
                );

                return modules;
            },

            /**
             * Calculates and sets the position of the toolbar.
             *
             * @method showAtPoint
             * @param {Number} left The left offset in page coordinates.
             * @param {Number} top The top offset in page coordinates.
             * @param {Number} direction The direction of the selection. Can be one of these:
             *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
             *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
             */
            showAtPoint: function(left, top, direction) {
                var boundingBox,
                    xy,
                    visible;

                boundingBox = this.get('boundingBox');

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    boundingBox.replaceClass('alloy-editor-arrow-box-bottom', 'alloy-editor-arrow-box-top');
                } else {
                    boundingBox.replaceClass('alloy-editor-arrow-box-top', 'alloy-editor-arrow-box-bottom');
                }

                visible = this.get('visible');

                if (!visible) {
                    this.show();
                }

                xy = this._getToolbarXYPoint(left, top, direction);

                this._moveToPoint(this.getConstrainedXY(xy), direction, {
                    visible: visible
                });
            },

            /**
             * Resolves the different shortcuts available for the selections configuration and
             * produces a final configuration array with all the required options.
             *
             * @method  _getSelectionsConfig
             * @protected
             * @return {Array} An array with the selections final configuration for the toolbar.
             */
            _getSelectionsConfig: function() {
                var defaultSelection,
                    selectionConfig,
                    selectionsConfig = [];

                if (!this._selectionsConfig) {
                    YArray.each(
                        this.get('selections'),
                        function(selection) {
                            if (Lang.isString(selection)) {
                                selectionConfig = SELECTION_TYPES[selection];
                            } else {
                                defaultSelection = SELECTION_TYPES[selection.type];

                                selectionConfig = defaultSelection ? Y.merge(defaultSelection, selection) : selection;
                            }

                            if (selectionConfig) {
                                selectionsConfig.push(selectionConfig);
                            }
                        }
                    );

                    this._selectionsConfig = selectionsConfig;
                }

                return this._selectionsConfig;
            },

            /**
             * Calculates the most appropriate position where the Toolbar should be displayed and shows it.
             *
             * @method _onEditorInteraction
             * @protected
             * @param {Object} event The editorInteraction event payload.
             * See {{#crossLink "CKEDITOR.plugins.uicore/editorInteraction:event"}}{{/crossLink}} event for more
             * information.
             */
            _onEditorInteraction: function(event) {
                var self = this,
                    editor,
                    contentBox,
                    nativeEvent,
                    position,
                    matchedSelection,
                    selectionData;

                editor = this.get('editor');

                selectionData = event.data.selectionData;

                nativeEvent = event.data.nativeEvent;

                matchedSelection = YArray.some(
                    this._getSelectionsConfig(),
                    function(selection) {
                        if (selection.test(selectionData, editor)) {
                            contentBox = self.get('contentBox');

                            contentBox.all('.alloy-editor-toolbar-buttons').removeClass('active');

                            contentBox.one('.alloy-editor-toolbar-buttons[data-selection=' + selection.type + ']').addClass('active');

                            position = self._calculatePosition(selectionData, {
                                x: nativeEvent.pageX,
                                y: nativeEvent.pageY
                            });

                            self.showAtPoint(position.x, position.y, position.direction);

                            self.fire('positionChange');

                            editor.fire('toolbarActive', self);

                            return true;
                        }

                        return false;
                    }
                );

                if (!matchedSelection) {
                    this.hide();
                }
            },

            /**
             * Hides the toolbar in case of <code>toolbarsHide</code> event.
             *
             * @method _onToolbarsHide
             */
            _onToolbarsHide: function() {
                this.hide();
            },

            BOUNDING_TEMPLATE: '<div class="alloy-editor-toolbar alloy-editor-toolbar-styles alloy-editor-arrow-box"></div>',

            CONTENT_TEMPLATE: '<div class="alloy-editor-toolbar-content btn-toolbar"><div class="selections"></div></div>',

            TPL_BUTTONS_CONTAINER: '<div class="alloy-editor-toolbar-buttons btn-group" data-selection="{selectionType}"></div>'
        }, {
            ATTRS: {
                /*
                 * Specifies the selections that can be handled by the current instance of the toolbar.
                 * A Selection configuration is an object like
                 * <pre><code>
                 *     {
                 *         type: 'text',
                 *         buttons: ['strong', 'em', 'u', 'h1', 'h2'],
                 *         test: function(selectionData, editor) { ... }
                 *     }
                 * </pre></code>
                 *
                 * A button configuration can be a simple string with the type of the selection. In this case,
                 * the toolbar will use the default buttons and test given for that type of selection, like this:
                 * <pre><code>
                 *     selections: ['image', 'text']
                 * </pre></code>
                 *
                 * In addition, it's possible to pass only partials of a Selection configuration. In this case,
                 * the rest of properties will be inherited from the default selection type configuration:
                 * <pre><code>
                 *     selections: [
                 *         {
                 *             type: 'image',
                 *             buttons: ['left']
                 *         },
                 *         {
                 *             type: 'text',
                 *             test: function() { // custom logic }
                 *         }
                 *     ]
                 * </pre></code>
                 *
                 * In the example, when a selection of type 'image' is done, only the 'left' button will be shown, and
                 * the decission of wether a selection is of type 'text' or not, will be handled by the custom provided
                 * code, but will show the default selection buttons.
                 *
                 * @attribute selections
                 * @default ['image', 'text']
                 * @type Array
                 */
                selections: {
                    validator: Lang.isArray,
                    value: [STR_SELECTION_IMAGE, STR_SELECTION_TEXT]
                },

                /**
                 * Specifies whether the toolbar show be constrained to some node or to the viewport.
                 *
                 * @attribute constrain
                 * @default true (will be constrained to the viewport)
                 * @type Boolean
                 */
                constrain: {
                    validator: Lang.isBoolean,
                    value: true
                }
            }
        });

    SELECTION_TYPES[STR_SELECTION_IMAGE] = {
        type: STR_SELECTION_IMAGE,
        buttons: ['left', 'right'],
        test: function(selectionData, editor) {
            return (selectionData.element && selectionData.element.getName() === 'img');
        }
    };

    SELECTION_TYPES[STR_SELECTION_TEXT] = {
        type: STR_SELECTION_TEXT,
        buttons: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter'],
        test: function(selectionData, editor) {
            return (!selectionData.element && selectionData.region && !editor.isSelectionEmpty());
        }
    };

    Y.ToolbarStyles = ToolbarStyles;
}, '', {
    requires: ['toolbar-base', 'toolbar-position', 'widget-base', 'widget-position', 'widget-position-constrain']
});
