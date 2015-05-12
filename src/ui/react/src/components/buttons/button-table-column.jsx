(function () {
    'use strict';

    /**
     * The ButtonTableColumn class provides functionality to work with table columns.
     *
     * @class ButtonTableColumn
     */
    var ButtonTableColumn = React.createClass({
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
             * @default tableColumn
             */
            key: 'tableColumn'
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
                    columnDelete: AlloyEditor.Strings.columnDelete,
                    columnInsertAfter: AlloyEditor.Strings.columnInsertAfter,
                    columnInsertBefore: AlloyEditor.Strings.columnInsertBefore
                },
                label: AlloyEditor.Strings.column
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
                    <button aria-expanded={this.props.expanded} aria-label={this.props.label} aria-owns="tableColumnCommands" className="alloy-editor-button" onClick={this.props.toggleDropdown} role="listbox" tabIndex={this.props.tabIndex} title={this.props.label}>
                        <span className="alloy-editor-icon-column"></span>
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
                <AlloyEditor.ButtonCommandListItem command="columnInsertBefore" description={this.props.commandLabels.columnInsertBefore} editor={editor} key="columninsertbefore" />,
                <AlloyEditor.ButtonCommandListItem command="columnInsertAfter" description={this.props.commandLabels.columnInsertAfter} editor={editor} key="columninsertafter" />,
                <AlloyEditor.ButtonCommandListItem command="columnDelete" description={this.props.commandLabels.columnDelete} editor={editor} key="columndelete" modifiesSelection={true} />
            ];

            return actions;
        },

        /*
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @method _renderDropdown
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise
         */
        _renderDropdown: function() {
            if (this.props.expanded) {
                return (
                    <div className="alloy-editor-dropdown">
                        <ul className="alloy-editor-listbox" id="tableColumnCommands" role="listbox">
                            {this._renderActions()}
                        </ul>
                    </div>
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableColumn.key] = AlloyEditor.ButtonTableColumn = ButtonTableColumn;
}());