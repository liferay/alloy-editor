(function () {
    'use strict';

    /**
     * The ButtonTable class provides functionality for creating and editing a table in a document. ButtonTable
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonTableEdit UI with all the table edition controls.
     *
     * @class ButtonTable
     */
    var ButtonTable = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'table'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <global.AlloyEditor.ButtonTableEdit {...this.props} />
                );
            } else {
                return (
                    <button className="alloy-editor-button" data-type="button-table" onClick={this.props.requestExclusive} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-table"></span>
                    </button>
                );
            }
        }
    });

    global.AlloyEditor.Buttons[ButtonTable.key] = global.AlloyEditor.ButtonTable = ButtonTable;
}());