(function () {
    'use strict';

    /**
     * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
     *
     * @class ButtonSubscript
     */
    var ButtonSubscript = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

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
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                <button className={cssClass} data-type="button-subscript" onClick={this.execCommand} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-subscript"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonSubscript.key] = AlloyEditor.ButtonSubscript = ButtonSubscript;
}());