(function () {
    'use strict';

    /**
     * The ButtonItalic class provides functionality for styling an selection with italic (em) style.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonItalic
     */
    var ButtonItalic = React.createClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default italic
             */
            key: 'italic'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'italic',
                style: {
                    element: 'em'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.italic} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-italic" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.italic}>
                    <span className="ae-icon-italic"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonItalic.key] = AlloyEditor.ButtonItalic = ButtonItalic;
}());