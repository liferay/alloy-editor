(function () {
    'use strict';

    /**
     * The ButtonH2 class provides wraps a selection in `h2` element.
     *
     * @class ButtonH2
     */
    var ButtonH2 = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'h2'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'h2'
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
                <button className={cssClass} data-type="button-h2" onClick={this.applyStyle} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-h2"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonH2.key] = AlloyEditor.ButtonH2 = ButtonH2;
}());