(function () {
    'use strict';

    /**
     * The ButtonEmbed class provides functionality for creating and editing an embed link in a document.
     * ButtonEmbed renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonEmbedEdit UI with all the link edition controls.
     *
     * @class ButtonEmbed
     * @uses ButtonKeystroke
     */
    var ButtonEmbed = createReactClass({
        mixins: [AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonEmbed
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonEmbed
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonEmbed
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default embed
             * @memberof ButtonEmbed
             * @property {String} key
             * @static
             */
            key: 'embed'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonEmbed
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonEmbed
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <AlloyEditor.ButtonEmbedEdit {...this.props} />
                );
            } else {
                return (
                    <button aria-label={AlloyEditor.Strings.link} className="ae-button" data-type="button-embed" onClick={this._requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                        <span className="ae-icon-add"></span>
                    </button>
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the embedding of a link.
         *
         * @instance
         * @memberof ButtonEmbed
         * @method _requestExclusive
         * @protected
         */
        _requestExclusive: function() {
            this.props.requestExclusive(ButtonEmbed.key);
        }
    });

    AlloyEditor.Buttons[ButtonEmbed.key] = AlloyEditor.ButtonEmbed = ButtonEmbed;
}());