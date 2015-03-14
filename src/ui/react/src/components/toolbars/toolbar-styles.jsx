(function () {
    'use strict';

    /**
     * The ToolbarStyles class hosts the buttons for styling a text selection.
     *
     * @class ToolbarStyles
     */
    var ToolbarStyles = React.createClass({
        mixins: [global.WidgetDropdown, global.WidgetExclusive, global.WidgetFocusManager, global.ToolbarButtons, global.WidgetPosition, global.WidgetArrowBox],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'styles'
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         *
         * @param {provProps} prevProps The previous state of the component's properties.
         * @param {[type]} prevState The previous component's state.
         */
        componentDidUpdate: function (prevProps, prevState) {
            var currentSelection = this._getCurrentSelection();

            var result;

            // If current selection has a function called `setPosition`, call it
            // and check the returned value. If false, fallback to the default positioning logic.
            if (currentSelection && global.Lang.isFunction(currentSelection.setPosition)) {
                result = currentSelection.setPosition.call(this, {
                    editor: this.props.editor,
                    editorEvent: this.props.editorEvent,
                    selectionData: this.props.selectionData
                });
            }

            if (!result) {
                this.updatePosition();
                this.show();
            }
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-button, .alloy-editor-toolbar-element',
                keys: {
                    next: [38, 39],
                    prev: [37, 40]
                }
            };
        },

        /**
         * Lifecycle. Renders the buttons in the toolbar according to the current selection.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var currentSelection = this._getCurrentSelection();

            if (currentSelection) {
                var arrowBoxClasses;

                if (global.Lang.isFunction(currentSelection.getArrowBoxClasses)) {
                    arrowBoxClasses = currentSelection.getArrowBoxClasses();
                } else {
                    arrowBoxClasses = this.getArrowBoxClasses();
                }

                var cssClasses = 'alloy-editor-toolbar-styles ' + arrowBoxClasses;

                var buttons = this.getToolbarButtons(
                    currentSelection.buttons,
                    {
                        selectionType: currentSelection.name
                    }
                );

                return (
                    <div className={cssClasses} data-tabindex={this.props.config.tabIndex || 0} onFocus={this.focus} onKeyDown={this.handleKey} tabIndex="-1">
                        <div className="alloy-editor-container">
                            {buttons}
                        </div>
                    </div>
                );
            } else {
                return false;
            }
        },

        /**
         * Analyzes the current editor selection and returns the selection configuration, if any,
         * that matches.
         *
         * @protected
         */
        _getCurrentSelection: function() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null,
                selection;

            if (eventPayload) {
                this.props.config.selections.some(function(item) {
                    var result = item.test({
                        data: eventPayload,
                        editor: this.props.editor
                    });

                    if (result) {
                        selection = item;
                    }

                    return result;
                }, this);
            }

            return selection;
        }
    });

    global.AlloyEditor.Toolbars[ToolbarStyles.key] = global.AlloyEditor.ToolbarStyles = ToolbarStyles;
}());