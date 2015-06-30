(function () {
    'use strict';

    /**
     * The ButtonQuote class wraps a selection in `blockquote` element.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonQuote
     */
    var ButtonQuote = React.createClass({
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
             * @default quote
             */
            key: 'quote'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'blockquote',
                style: {
                    element: 'blockquote'
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
                <button aria-label={AlloyEditor.Strings.quote} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-quote" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.quote}>
                    <span className="ae-icon-quote"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonQuote.key] = AlloyEditor.ButtonQuote = ButtonQuote;
}());