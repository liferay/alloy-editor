(function () {
    'use strict';

    /**
     * The ButtonTableColumn class provides functionality to work with table columns.
     *
     * @class ButtonTableColumn
     */
    var ButtonTableColumn = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableColumn'
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
         *
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                <global.AlloyEditor.ButtonCommandListItem command="columnInsertBefore" description="Insert column left" editor={editor} key="columninsertbefore" />,
                <global.AlloyEditor.ButtonCommandListItem command="columnInsertAfter" description="Insert column right" editor={editor} key="columninsertafter" />,
                <global.AlloyEditor.ButtonCommandListItem command="columnDelete" description="Delete column" editor={editor} key="columndelete" modifiesSelection={true} />
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

    global.AlloyEditor.Buttons[ButtonTableColumn.key] = global.AlloyEditor.ButtonTableColumn = ButtonTableColumn;
}());