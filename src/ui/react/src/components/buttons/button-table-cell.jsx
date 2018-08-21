(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */
    var ButtonTableCell = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableCell
             * @memberof ButtonTableCell
             * @property {String} key
             * @static
             */
            key: 'tableCell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableCell
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableCell.key + 'List';
                buttonCommandsList = <AlloyEditor.ButtonCommandsList commands={this._getCommands()} editor={this.props.editor} listId={buttonCommandsListId} onDismiss={this.props.toggleDropdown} />
            }

            return (
                <div className="ae-container ae-has-dropdown">
                    <button aria-expanded={this.props.expanded} aria-label={AlloyEditor.Strings.cell} aria-owns={buttonCommandsListId} className="ae-button" onClick={this.props.toggleDropdown} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.cell}>
                        <span className="ae-icon-cell"></span>
                    </button>
                    {buttonCommandsList}
                </div>
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @instance
         * @memberof ButtonTableCell
         * @method _getCommands
         * @protected
         * @return {Array} The list of available commands.
         */
        _getCommands: function() {
            return this.props.commands || [
                {
                    command: 'cellInsertBefore',
                    label: AlloyEditor.Strings.cellInsertBefore
                },
                {
                    command: 'cellInsertAfter',
                    label: AlloyEditor.Strings.cellInsertAfter
                },
                {
                    command: 'cellDelete',
                    label: AlloyEditor.Strings.cellDelete
                },
                {
                    command: 'cellMerge',
                    label: AlloyEditor.Strings.cellMerge
                },
                {
                    command: 'cellMergeDown',
                    label: AlloyEditor.Strings.cellMergeDown
                },
                {
                    command: 'cellMergeRight',
                    label: AlloyEditor.Strings.cellMergeRight
                },
                {
                    command: 'cellHorizontalSplit',
                    label: AlloyEditor.Strings.cellSplitHorizontal
                },
                {
                    command: 'cellVerticalSplit',
                    label: AlloyEditor.Strings.cellSplitVertical
                }
            ];
        }
    });

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
}());