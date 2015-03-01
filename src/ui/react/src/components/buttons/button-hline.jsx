(function () {
    'use strict';

    /**
     * The ButtonHline class provides inserts horizontal line.
     *
     * @class ButtonHline
     */
    var ButtonHline = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'hline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'horizontalrule',
                style: {
                    element: 'hr'
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
                <button className="alloy-editor-button" data-type="button-hline" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-separator"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonHline.key] = global.AlloyEditor.ButtonHline = ButtonHline;
}());