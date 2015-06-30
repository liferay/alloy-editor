(function () {
    'use strict';

    /**
     * The ButtonTableRow class provides functionality to work with table rows.
     *
     * @class ButtonTableRow
     */
    var ButtonTableRow = React.createClass({
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
             * @default tableRow
             */
            key: 'tableRow'
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
                buttonCommandsListId = ButtonTableRow.key + 'List';
                buttonCommandsList = <AlloyEditor.ButtonCommandsList commands={this._getCommands()} editor={this.props.editor} listId={buttonCommandsListId} onDismiss={this.props.toggleDropdown} />
            }

            return (
                <div className="ae-container ae-has-dropdown">
                    <button aria-expanded={this.props.expanded} aria-label={AlloyEditor.Strings.row} aria-owns={buttonCommandsListId} className="ae-button" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.row}>
                        <span className="ae-icon-row"></span>
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
        _getCommands: function () {
            return this.props.commands || [
                {
                    command: 'rowInsertBefore',
                    label: AlloyEditor.Strings.rowInsertBefore
                },
                {
                    command: 'rowInsertAfter',
                    label: AlloyEditor.Strings.rowInsertAfter
                },
                {
                    command: 'rowDelete',
                    label: AlloyEditor.Strings.rowDelete
                }
            ];
        }
    });

    AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
}());