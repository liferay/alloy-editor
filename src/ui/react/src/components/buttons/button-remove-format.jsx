(function () {
    'use strict';

    /**
     * The ButtonRemoveFormat class removes style formatting.
     *
     * @class ButtonRemoveFormat
     */
    var ButtonRemoveFormat = React.createClass({
        mixins: [global.ButtonCommand],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'removeFormat'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'removeFormat'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className='alloy-editor-button' data-type="button-removeformat" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-removeformat"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonRemoveFormat.key] = global.AlloyEditor.ButtonRemoveFormat = ButtonRemoveFormat;
}());