(function () {
    'use strict';

    /**
     * The ButtonSuperscript class provides functionality for applying superscript style to a text selection.
     *
     * @class ButtonSuperscript
     */
    var ButtonSuperscript = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'superscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'superscript',
                style: {
                    element: 'sup'
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
                <button className={cssClass} data-type="button-superscript" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-superscript"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonSuperscript.key] = global.AlloyEditor.ButtonSuperscript = ButtonSuperscript;
}());