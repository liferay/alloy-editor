(function () {
    'use strict';

    /**
     * The ButtonTableRemove class provides functionality for removing a table
     *
     * @class ButtonTableRemove
     */
    var ButtonTableRemove = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableRemove
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableRemove
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableRemove
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableRemove
             * @memberof ButtonTableRemove
             * @property {String} key
             * @static
             */
            key: 'tableRemove'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableRemove
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button aria-label={AlloyEditor.Strings.deleteTable} className="ae-button" data-type="button-table-remove" onClick={this._removeTable} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.deleteTable}>
                    <span className="ae-icon-bin"></span>
                </button>
            );
        },

        /**
         * Removes the table in the editor element.
         *
         * @instance
         * @memberof ButtonTableRemove
         * @method _removeTable
         * @protected
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