(function () {
    'use strict';

    /**
     * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
     *
     * @class ButtonSubscript
     */
    var ButtonSubscript = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'subscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'subscript',
                style: {
                    element: 'sub'
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
                <button className="alloy-editor-button" data-type="button-subscript" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-subscript"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonSubscript.key] = global.AlloyEditor.ButtonSubscript = ButtonSubscript;
}());