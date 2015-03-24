(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */
    var ButtonTableCell = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableCell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <div className="alloy-editor-container has-dropdown">
                    <button className="alloy-editor-button" onClick={this.props.toggleDropdown} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-cell"></span>
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
                <global.AlloyEditor.ButtonCommandListItem command="cellInsertBefore" description="Insert cell left" editor={editor} key="cellinsertbefore" />,
                <global.AlloyEditor.ButtonCommandListItem command="cellInsertAfter" description="Insert cell right" editor={editor} key="cellinsertafter" />,
                <global.AlloyEditor.ButtonCommandListItem command="cellDelete" description="Delete cell" editor={editor} key="celldelete" modifiesSelection={true} />,
                <global.AlloyEditor.ButtonCommandListItem command="cellMerge" description="Merge cells" editor={editor} key="cellmerge" />,
                <global.AlloyEditor.ButtonCommandListItem command="cellMergeDown" description="Merge cell below" editor={editor} key="cellmergedown" />,
                <global.AlloyEditor.ButtonCommandListItem command="cellMergeRight" description="Merge cell right" editor={editor} key="cellmergeright" />,
                <global.AlloyEditor.ButtonCommandListItem command="cellHorizontalSplit" description="Split cells horizontally" editor={editor} key="cellsplithorizontal" />,
                <global.AlloyEditor.ButtonCommandListItem command="cellVerticalSplit" description="Split cells vertically" editor={editor} key="cellsplitvertical" />
            ];

            return actions;
        },

        /*
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

    global.AlloyEditor.Buttons[ButtonTableCell.key] = global.AlloyEditor.ButtonTableCell = ButtonTableCell;
}());