(function () {
    'use strict';

    /**
     * The ButtonCode class provides wraps a selection in `pre` element.
     *
     * @class ButtonCode
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */
    var ButtonCode = createReactClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonCode
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonCode
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonCode
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default code
             * @memberof ButtonCode
             * @property {String} key
             * @static
             */
            key: 'code'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonCode
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'pre'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCode
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.code} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-code" onClick={this.applyStyle} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.code}>
                    <span className="ae-icon-code"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonCode.key] = AlloyEditor.ButtonCode = ButtonCode;
}());