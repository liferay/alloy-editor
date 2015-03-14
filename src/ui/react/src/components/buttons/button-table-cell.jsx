(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality for managing cells
     *
     * @class ButtonTableCell
     */
    var ButtonTableCell = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tablecell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-bold" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-cell"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonTableCell.key] = global.AlloyEditor.ButtonTableCell = ButtonTableCell;
}());