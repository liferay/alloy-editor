(function () {
    'use strict';

    /**
     * The ButtonTableRow class provides functionality for add and remove rows
     *
     * @class ButtonTableRow
     */
    var ButtonTableRow = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tablerow'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-bold" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-row"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonTableRow.key] = global.AlloyEditor.ButtonTableRow = ButtonTableRow;
}());