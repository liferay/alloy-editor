(function () {
    'use strict';

    /**
     * The ButtonH1 class provides wraps a selection in `h1` element.
     *
     * @class ButtonH1
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */
    var ButtonH1 = createReactClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonH1
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonH1
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonH1
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default h1
             * @memberof ButtonH1
             * @property {String} key
             * @static
             */
            key: 'h1'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonH1
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'h1'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonH1
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.h1} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-h1" onClick={this.applyStyle} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.h1}>
                    <span className="ae-icon-h1"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonH1.key] = AlloyEditor.ButtonH1 = ButtonH1;
}());