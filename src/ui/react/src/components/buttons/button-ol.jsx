(function () {
    'use strict';

    /**
     * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
     *
     * @class ButtonOrderedList
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */
    var ButtonOrderedList = createReactClass({
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonOrderedList
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonOrderedList
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonOrderedList
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default ol
             * @memberof ButtonOrderedList
             * @property {String} key
             * @static
             */
            key: 'ol'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonOrderedList
         * @method getDefaultProps
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
         * @instance
         * @memberof ButtonOrderedList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.numberedlist} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-ol" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.numberedlist}>
                    <span className="ae-icon-numbered-list"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonOrderedList.key] = AlloyEditor.ButtonOrderedList = ButtonOrderedList;
}());