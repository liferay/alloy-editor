(function () {
    'use strict';

    /**
     * The ButtonUnderline class provides functionality for underlying a text selection.
     *
     * @class ButtonUnderline
     */
    var ButtonUnderline = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'underline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'underline',
                style: {
                    element: 'u'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-underline" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-underline"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonUnderline.key] = global.AlloyEditor.ButtonUnderline = ButtonUnderline;
}());