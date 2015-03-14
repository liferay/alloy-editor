(function () {
    'use strict';

    /**
     * The ButtonTableColumn class provides functionality for add and remove rows
     *
     * @class ButtonTableColumn
     */
    var ButtonTableColumn = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tablecolumn'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-bold" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-column"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonTableColumn.key] = global.AlloyEditor.ButtonTableColumn = ButtonTableColumn;
}());