(function () {
    'use strict';

    /**
     * The ButtonImageAlignRight class provides functionality for aligning an image on right.
     *
     * @class ButtonImageAlignRight
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */
    var ButtonImageAlignRight = createReactClass({
        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonImageAlignRight
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonImageAlignRight
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonImageAlignRight
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default imageRight
             * @memberof ButtonImageAlignRight
             * @property {String} key
             * @static
             */
            key: 'imageRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonImageAlignRight
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'justifyright'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonImageAlignRight
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.alignRight} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-image-align-right" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignRight}>
                    <span className="ae-icon-align-right"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignRight.key] = AlloyEditor.ButtonImageAlignRight = ButtonImageAlignRight;
}());