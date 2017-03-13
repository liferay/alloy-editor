(function () {
    'use strict';

    /**
     * The ButtonEmbed class provides functionality for creating and editing an embed link in a document.
     * ButtonEmbed renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonEmbedEdit UI with all the link edition controls.
     *
     * @uses ButtonKeystroke
     *
     * @class ButtonEmbed
     */
    var ButtonEmbed = React.createClass({
        mixins: [AlloyEditor.ButtonKeystroke],

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
             * @default embed
             */
            key: 'embed'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
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
                    <button aria-label="Embed" className="ae-button" data-type="button-embed" onClick={this._requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="12.156 15.15 24.656 21.85" data-trimmed="trimmed" width="1em" height="1em" className="icon" data-identifier="glyphicons-cloud-download"><path d="M36.812 25.094C36.812 28.315 34.21 31 31 31h-.717a1.435 1.435 0 0 0-.13-.497 1.44 1.44 0 0 0-1.305-.803h-1.551s-.008-3.188-.008-4.319c0-1.131-.695-1.681-1.694-1.681l-3.194-.013c-1.004.003-1.653.718-1.651 1.705v4.312l-1.587.007a1.44 1.44 0 0 0-1.306.801c-.076.155-.111.32-.127.487H16c-2.123 0-3.844-1.8-3.844-3.922 0-1.84 1.295-3.452 3.022-3.829a7.358 7.358 0 0 1 7.321-8.108 7.356 7.356 0 0 1 6.704 4.334 5.769 5.769 0 0 1 1.796-.287c3.211.001 5.813 2.688 5.813 5.907zm-17.754 6.169l4.784 5.654c.04.053.091.083.143.083a.223.223 0 0 0 .185-.089l4.783-5.651c.091-.117.044-.26-.105-.26h-2.849l-.01-5.617c-.001-.275-.116-.384-.391-.383h-3.192c-.275.001-.407.109-.406.385V31l-2.837.012c-.148 0-.196.134-.105.251z"/></svg>
                    </button>
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the embedding of a link.
         *
         * @protected
         * @method _requestExclusive
         */
        _requestExclusive: function() {
            this.props.requestExclusive(ButtonEmbed.key);
        }
    });

    AlloyEditor.Buttons[ButtonEmbed.key] = AlloyEditor.ButtonEmbed = ButtonEmbed;
}());