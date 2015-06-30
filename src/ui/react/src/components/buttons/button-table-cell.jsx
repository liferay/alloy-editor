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
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

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
         * Lifecycle. Renders the UI of the button.
         *
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
         * @method _getCommands
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