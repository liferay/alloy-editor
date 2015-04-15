(function () {
    'use strict';

    /**
     * The ButtonTableRow class provides functionality to work with table rows.
     *
     * @class ButtonTableRow
     */
    var ButtonTableRow = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableRow'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <div className="alloy-editor-container alloy-editor-has-dropdown">
                    <button className="alloy-editor-button" onClick={this.props.toggleDropdown} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-row"></span>
                    </button>
                    {this._renderDropdown()}
                </div>
            );
        },

        /**
         * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
         *
         * @protected
         * @method _renderActions
         *
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                <AlloyEditor.ButtonCommandListItem command="rowInsertBefore" description="Insert row above" editor={editor} key="rowinsertbefore" />,
                <AlloyEditor.ButtonCommandListItem command="rowInsertAfter" description="Insert row below" editor={editor} key="rowinsertafter" />,
                <AlloyEditor.ButtonCommandListItem command="rowDelete" description="Delete row" editor={editor} key="rowdelete" modifiesSelection={true} />
            ];

            return actions;
        },

        /**
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise
         */
        _renderDropdown: function() {
            if (this.props.expanded) {
                return (
                    <div className="alloy-editor-dropdown">
                        {this._renderActions()}
                    </div>
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
}());