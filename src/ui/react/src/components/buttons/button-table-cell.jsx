(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */
    var ButtonTableCell = React.createClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The row command labels that should be used for accessibility purposes.
             *
             * @property {Object} commandLabels
             */
            commandLabels: React.PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @property {Boolean} expanded
             */
            expanded: React.PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @property {Function} toggleDropdown
             */
            toggleDropdown: React.PropTypes.func
        },

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
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function () {
            return {
                commandLabels: {
                    cellDelete: AlloyEditor.Strings.cellDelete,
                    cellInsertAfter: AlloyEditor.Strings.cellInsertAfter,
                    cellInsertBefore: AlloyEditor.Strings.cellInsertBefore,
                    cellMerge: AlloyEditor.Strings.cellMerge,
                    cellMergeDown: AlloyEditor.Strings.cellMergeDown,
                    cellMergeRight: AlloyEditor.Strings.cellMergeRight,
                    cellSplitHorizontal: AlloyEditor.Strings.cellSplitHorizontal,
                    cellSplitVertical: AlloyEditor.Strings.cellSplitVertical,
                },
                label: AlloyEditor.Strings.cell
            };
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
                    <button aria-expanded={this.props.expanded} aria-label={this.props.label} aria-owns="tableCellCommands" className="alloy-editor-button" onClick={this.props.toggleDropdown} tabIndex={this.props.tabIndex} title={this.props.label}>
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
                <AlloyEditor.ButtonCommandListItem command="cellInsertBefore" description={this.props.commandLabels.cellInsertBefore} editor={editor} key="cellinsertbefore" />,
                <AlloyEditor.ButtonCommandListItem command="cellInsertAfter" description={this.props.commandLabels.cellInsertAfter} editor={editor} key="cellinsertafter" />,
                <AlloyEditor.ButtonCommandListItem command="cellDelete" description={this.props.commandLabels.cellDelete} editor={editor} key="celldelete" modifiesSelection={true} />,
                <AlloyEditor.ButtonCommandListItem command="cellMerge" description={this.props.commandLabels.cellMerge} editor={editor} key="cellmerge" />,
                <AlloyEditor.ButtonCommandListItem command="cellMergeDown" description={this.props.commandLabels.cellMergeDown} editor={editor} key="cellmergedown" />,
                <AlloyEditor.ButtonCommandListItem command="cellMergeRight" description={this.props.commandLabels.cellMergeRight} editor={editor} key="cellmergeright" />,
                <AlloyEditor.ButtonCommandListItem command="cellHorizontalSplit" description={this.props.commandLabels.cellSplitHorizontal} editor={editor} key="cellsplithorizontal" />,
                <AlloyEditor.ButtonCommandListItem command="cellVerticalSplit" description={this.props.commandLabels.cellSplitVertical} editor={editor} key="cellsplitvertical" />
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
                        <ul className="alloy-editor-listbox" id="tableCellCommands" role="listbox">
                            {this._renderActions()}
                        </ul>
                    </div>
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
}());