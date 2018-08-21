(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignLeft class provides functionality for aligning a paragraph on left.
     *
     * @class ButtonParagraphAlignLeft
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */
    var ButtonParagraphAlignLeft = createReactClass({
        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonParagraphAlignLeft
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonParagraphAlignLeft
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonParagraphAlignLeft
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default paragraphLeft
             * @memberof ButtonParagraphAlignLeft
             * @property {String} key
             * @static
             */
            key: 'paragraphLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonParagraphAlignLeft
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'justifyleft'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonParagraphAlignLeft
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.alignLeft} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-paragraph-align-left" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignLeft}>
                    <span className="ae-icon-align-left"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignLeft.key] = AlloyEditor.ButtonParagraphAlignLeft = ButtonParagraphAlignLeft;
}());