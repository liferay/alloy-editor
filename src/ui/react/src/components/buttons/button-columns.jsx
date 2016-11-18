(function () {
    'use strict';

    var ButtonColumns = React.createClass({
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
             * @default columns
             */
            key: 'columns'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <AlloyEditor.ButtonColumnsEdit {...this.props} />
                );
            } else {
                return (
                    <button aria-label="Columns" className="ae-button" data-type="button-columns" onClick={this.props.requestExclusive} tabIndex={this.props.tabIndex} title="Columns">
                        <span className="flaticon-four-columns-layout-interface-symbol"></span>
                    </button>
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonColumns.key] = AlloyEditor.ButtonColumns = ButtonColumns;
}());