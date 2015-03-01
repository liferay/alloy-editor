(function () {
    'use strict';

    /**
     * The ButtonH1 class provides wraps a selection in `h1` element.
     *
     * @class ButtonH1
     */
    var ButtonH1 = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'h1'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'h1'
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
                <button className="alloy-editor-button" data-type="button-h1" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-h1"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonH1.key] = global.AlloyEditor.ButtonH1 = ButtonH1;
}());