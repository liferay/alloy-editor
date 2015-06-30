(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignRight class provides functionality for aligning a paragraph on right.
     *
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonParagraphAlignRight
     */
    var ButtonParagraphAlignRight = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

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
             * @default paragraphRight
             */
            key: 'paragraphRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'p',
                    styles: {
                        'text-align': 'right'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.alignRight} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-paragraph-align-right" onClick={this.applyStyle} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.alignRight}>
                    <span className="ae-icon-align-right"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignRight.key] = AlloyEditor.ButtonParagraphAlignRight = ButtonParagraphAlignRight;
}());