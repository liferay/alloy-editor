(function () {
    'use strict';

    /**
     * The ButtonParagraphCenter class provides functionality for centering a paragraph.
     *
     * @class ButtonParagraphCenter
     */
    var ButtonParagraphCenter = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphCenter'
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
                        'text-align': 'center'
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
                <button className={cssClass} data-type="button-paragraph-center" onClick={this.applyStyle} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-align-center"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonParagraphCenter.key] = global.AlloyEditor.ButtonParagraphCenter = ButtonParagraphCenter;
}());