(function () {
    'use strict';

    var ToolbarStyles = React.createClass({
        mixins: [global.WidgetExclusive, global.ToolbarButtons, global.WidgetPosition, global.WidgetArrowBox],

        statics: {
            key: 'styles'
        },

        render: function() {
            var currentSelection = this._getCurrentSelection();

            if (currentSelection) {
                var buttons = this._getToolbarButtons(
                    currentSelection.buttons,
                    {
                        selectionType: currentSelection.name
                    }
                );

                return (
                    <div className="alloy-editor-toolbar-styles">
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