(function () {
    'use strict';

    /**
     * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
     *
     * @class ButtonOrderedList
     */
    var ButtonOrderedList = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'ol'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'numberedlist',
                style: {
                    element: 'ol'
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
                <button className="alloy-editor-button" data-type="button-ol" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-numbered-list"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonOrderedList.key] = global.AlloyEditor.ButtonOrderedList = ButtonOrderedList;
}());