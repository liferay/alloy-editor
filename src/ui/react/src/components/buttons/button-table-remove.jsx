(function () {
    'use strict';

    /**
     * The ButtonTableRemove class provides functionality for removing a table
     *
     * @class ButtonTableRemove
     */
    var ButtonTableRemove = React.createClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

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
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableRemove
             */
            key: 'tableRemove'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button aria-label={AlloyEditor.Strings.deleteTable} className="ae-button" data-type="button-table-remove" onClick={this._removeTable} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.deleteTable}>
                    <span className="ae-icon-close"></span>
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

    AlloyEditor.Buttons[ButtonTableRemove.key] = AlloyEditor.ButtonTableRemove = ButtonTableRemove;
}());