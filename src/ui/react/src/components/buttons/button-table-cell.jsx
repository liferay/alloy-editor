(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */
    var ButtonTableCell = React.createClass({
        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableCell
             */
            key: 'tableCell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <div className="alloy-editor-container alloy-editor-has-dropdown">
                    <button className="alloy-editor-button" onClick={this.props.toggleDropdown} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-cell"></span>
                    </button>
                    {this._renderDropdown()}
                </div>
            );
        },

        /**
         * Renders instances of ButtonCommandListItem passing the command which has to be executed and the description
         * of the command.
         *
         * @protected
         * @method _renderActions
         * @return {Array} Rendered instances of ButtonCommandListItem class.
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                <AlloyEditor.ButtonCommandListItem command="cellInsertBefore" description="Insert cell left" editor={editor} key="cellinsertbefore" />,
                <AlloyEditor.ButtonCommandListItem command="cellInsertAfter" description="Insert cell right" editor={editor} key="cellinsertafter" />,
                <AlloyEditor.ButtonCommandListItem command="cellDelete" description="Delete cell" editor={editor} key="celldelete" modifiesSelection={true} />,
                <AlloyEditor.ButtonCommandListItem command="cellMerge" description="Merge cells" editor={editor} key="cellmerge" />,
                <AlloyEditor.ButtonCommandListItem command="cellMergeDown" description="Merge cell below" editor={editor} key="cellmergedown" />,
                <AlloyEditor.ButtonCommandListItem command="cellMergeRight" description="Merge cell right" editor={editor} key="cellmergeright" />,
                <AlloyEditor.ButtonCommandListItem command="cellHorizontalSplit" description="Split cells horizontally" editor={editor} key="cellsplithorizontal" />,
                <AlloyEditor.ButtonCommandListItem command="cellVerticalSplit" description="Split cells vertically" editor={editor} key="cellsplitvertical" />
            ];

            return actions;
        },

        /*
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @protected
         * @method _renderDropdown
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise.
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

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
}());