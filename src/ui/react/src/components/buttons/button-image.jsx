(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */
    var ButtonImage = React.createClass({
        mixins: [global.ButtonAction, global.ButtonStateClasses],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'image'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-image" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-image"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonImage.key] = global.AlloyEditor.ButtonImage = ButtonImage;
}());