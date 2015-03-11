(function () {
    'use strict';

    /**
     * The ButtonCode class provides wraps a selection in `pre` element.
     *
     * @class ButtonCode
     */
    var ButtonCode = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'code'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'pre'
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
                <button className={cssClass} data-type="button-code" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-code"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonCode.key] = global.AlloyEditor.ButtonCode = ButtonCode;
}());