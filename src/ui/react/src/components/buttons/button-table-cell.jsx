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
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function () {
            return {
                commands: [
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
                ],
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
            var buttonCommandsList,
                buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableCell.key + 'List';
                buttonCommandsList = <AlloyEditor.ButtonCommandsList commands={this.props.commands} editor={this.props.editor} listId={buttonCommandsListId} onDismiss={this.props.toggleDropdown} />
            }

            return (
                <div className="alloy-editor-container alloy-editor-has-dropdown">
                    <button aria-expanded={this.props.expanded} aria-label={this.props.label} aria-owns={buttonCommandsListId} className="alloy-editor-button" onClick={this.props.toggleDropdown} tabIndex={this.props.tabIndex} title={this.props.label}>
                        <span className="alloy-editor-icon-cell"></span>
                    </button>
                    {buttonCommandsList}
                </div>
            );
        }
    });

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
}());