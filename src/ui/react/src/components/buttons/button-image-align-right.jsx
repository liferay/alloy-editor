(function () {
    'use strict';

    /**
     * The ButtonImageAlignRight class provides functionality for aligning an image on right.
     *
     * @class ButtonImageAlignRight
     */
    var ButtonImageAlignRight = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'imageRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'img',
                    styles: {
                        float: 'right'
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
                <button className={cssClass} data-type="button-image-align-right" onClick={this.applyStyle} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-align-right"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignRight.key] = AlloyEditor.ButtonImageAlignRight = ButtonImageAlignRight;
}());