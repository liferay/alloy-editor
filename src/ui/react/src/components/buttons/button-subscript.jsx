(function () {
    'use strict';

    /**
     * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
     *
     * @class ButtonSubscript
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */
    var ButtonSubscript = createReactClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonSubscript
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonSubscript
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonSubscript
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default subscript
             * @memberof ButtonSubscript
             * @property {String} key
             * @static
             */
            key: 'subscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonSubscript
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'subscript',
                style: 'coreStyles_subscript'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonSubscript
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.subscript} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-subscript" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.subscript}>
                    <span className="ae-icon-subscript"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonSubscript.key] = AlloyEditor.ButtonSubscript = ButtonSubscript;
}());