(function () {
    'use strict';

    /**
     * The ButtonRemoveFormat class removes style formatting.
     *
     * @class ButtonRemoveFormat
     * @uses ButtonCommand
     */
    var ButtonRemoveFormat = createReactClass({
        mixins: [AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonRemoveFormat
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonRemoveFormat
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonRemoveFormat
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default removeFormat
             * @memberof ButtonRemoveFormat
             * @property {String} key
             * @static
             */
            key: 'removeFormat'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonRemoveFormat
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'removeFormat'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonRemoveFormat
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button aria-label={AlloyEditor.Strings.removeformat} className='ae-button' data-type="button-removeformat" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.removeformat}>
                    <span className="ae-icon-removeformat"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonRemoveFormat.key] = AlloyEditor.ButtonRemoveFormat = ButtonRemoveFormat;
}());