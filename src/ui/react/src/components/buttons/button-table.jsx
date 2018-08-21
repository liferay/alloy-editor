(function () {
    'use strict';

    /**
     * The ButtonTable class provides functionality for creating and editing a table in a document. ButtonTable
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonTableEdit UI with all the table edition controls.
     *
     * @class ButtonTable
     */
    var ButtonTable = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTable
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTable
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTable
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default table
             * @memberof ButtonTable
             * @property {String} key
             * @static
             */
            key: 'table'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTable
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <AlloyEditor.ButtonTableEdit {...this.props} />
                );
            } else {
                return (
                    <button aria-label={AlloyEditor.Strings.table} className="ae-button" data-type="button-table" onClick={this.props.requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.table}>
                        <span className="ae-icon-table"></span>
                    </button>
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonTable.key] = AlloyEditor.ButtonTable = ButtonTable;
}());