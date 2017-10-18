(function () {
	'use strict';

	/**
     * The ButtonIndentBlock class provides functionality for indenting the selected blocks.
     *
     * @class ButtonIndentBlock
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */
    var ButtonIndentBlock = createReactClass({
        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        //Allows validating props being passed to the component
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonIndentBlock
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonIndentBlock
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonIndentBlock
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default indentBlock
             * @memberof ButtonIndentBlock
             * @property {String} key
             * @static
             */
            key: 'indentBlock'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonIndentBlock
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'indent'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonIndentBlock
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return (
                <button aria-label={AlloyEditor.Strings.indent} aria-pressed={cssClass.indexOf('pressed') !== -1} className={cssClass} data-type="button-indent-block" onClick={this.execCommand} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.indent}>
                    <span className="ae-icon-indent-block"></span>
                </button>
            );
        }
    });

    AlloyEditor.Buttons[ButtonIndentBlock.key] = AlloyEditor.ButtonIndentBlock = ButtonIndentBlock;
}());