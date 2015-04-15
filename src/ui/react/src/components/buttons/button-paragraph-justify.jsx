(function () {
    'use strict';

    /**
     * The ButtonParagraphJustify class provides functionality for justfying a paragraph.
     *
     * @class ButtonParagraphJustify
     */
    var ButtonParagraphJustify = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphJustify'
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
                        'text-align': 'justify'
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
                <button className={cssClass} data-type="button-paragraph-justify" onClick={this.applyStyle} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-align-justified"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphJustify.key] = AlloyEditor.ButtonParagraphJustify = ButtonParagraphJustify;
}());