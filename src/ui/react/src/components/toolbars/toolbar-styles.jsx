(function () {
    'use strict';

    /**
     * The ToolbarStyles class hosts the buttons for styling a text selection.
     *
     * @class ToolbarStyles
     */
    var ToolbarStyles = React.createClass({
        mixins: [global.WidgetExclusive, global.WidgetFocusManager, global.ToolbarButtons, global.WidgetPosition, global.WidgetArrowBox],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'styles'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-button',
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
                var buttons = this.getToolbarButtons(
                    currentSelection.buttons,
                    {
                        selectionType: currentSelection.name
                    }
                );

                return (
                    <div className="alloy-editor-toolbar-styles" onFocus={this.focus} onKeyDown={this.handleKey}>
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
                    var result = item.test(eventPayload, this.props.editor);

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