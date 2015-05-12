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
             * @default tableRow
             */
            key: 'tableRow'
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
                    rowDelete: AlloyEditor.Strings.rowDelete,
                    rowInsertAfter: AlloyEditor.Strings.rowInsertAfter,
                    rowInsertBefore: AlloyEditor.Strings.rowInsertBefore
                },
                label: AlloyEditor.Strings.row
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
                    <button aria-expanded={this.props.expanded} aria-label={this.props.label} aria-owns="tableRowCommands" className="alloy-editor-button" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={this.props.label}>
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
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                <AlloyEditor.ButtonCommandListItem command="rowInsertBefore" description={this.props.commandLabels.rowInsertBefore} editor={editor} key="rowinsertbefore" />,
                <AlloyEditor.ButtonCommandListItem command="rowInsertAfter" description={this.props.commandLabels.rowInsertAfter} editor={editor} key="rowinsertafter" />,
                <AlloyEditor.ButtonCommandListItem command="rowDelete" description={this.props.commandLabels.rowDelete} editor={editor} key="rowdelete" modifiesSelection={true} />
            ];

            return actions;
        },

        /**
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @method _renderDropdown
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise
         */
        _renderDropdown: function() {
            if (this.props.expanded) {
                return (
                    <div className="alloy-editor-dropdown">
                        <ul className="alloy-editor-listbox" id="tableRowCommands" role="listbox">
                            {this._renderActions()}
                        </ul>
                    </div>
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
}());