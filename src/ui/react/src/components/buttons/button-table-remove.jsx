(function () {
    'use strict';

    /**
     * The ButtonTableRemove class provides functionality for removing a table
     *
     * @class ButtonTableRemove
     */
    var ButtonTableRemove = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableRemove'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-table-remove" onClick={this._removeTable} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-close"></span>
                </button>
            );
        },

        /**
         * Removes the table in the editor element.
         *
         * @protected
         * @method _removeTable
         */
        _removeTable: function() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.remove();

            editor.fire('actionPerformed', this);
        }
    });

    global.AlloyEditor.Buttons[ButtonTableRemove.key] = global.AlloyEditor.ButtonTableRemove = ButtonTableRemove;
}());