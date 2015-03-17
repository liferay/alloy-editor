(function () {
    'use strict';

    /**
     * The ButtonImageAlignLeft class provides functionality for aligning an image on left.
     *
     * @class ButtonImageAlignLeft
     */
    var ButtonImageAlignLeft = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'imageLeft'
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
                        float: 'left'
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
                <button className={cssClass} data-type="button-image-align-left" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-align-left"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonImageAlignLeft.key] = global.AlloyEditor.ButtonImageAlignLeft = ButtonImageAlignLeft;
}());