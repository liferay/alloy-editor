(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignLeft class provides functionality for aligning a paragraph on left.
     *
     * @class ButtonParagraphAlignLeft
     */
    var ButtonParagraphAlignLeft = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'p',
                    styles: {
                        'text-align': 'left'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                <button className={cssClass} data-type="button-paragraph-align-left" onClick={this.applyStyle} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-align-left"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignLeft.key] = AlloyEditor.ButtonParagraphAlignLeft = ButtonParagraphAlignLeft;
}());