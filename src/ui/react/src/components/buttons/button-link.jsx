(function () {
    'use strict';

    /**
     * The ButtonLink class provides functionality for creating and editing a link in a document. ButtonLink
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonLinkEdit UI with all the link edition controls.
     *
     * @class ButtonLink
     * @uses ButtonCfgProps
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     */
    var ButtonLink = createReactClass({
        mixins: [AlloyEditor.ButtonKeystroke, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonLink
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonLink
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonLink
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default link
             * @memberof ButtonLink
             * @property {String} key
             * @static
             */
            key: 'link'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonLink
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + 76 /*L*/
                }
            };
        },

        /**
         * Checks if the current selection is contained within a link.
         *
         * @instance
         * @memberof ButtonLink
         * @method isActive
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive: function() {
            return (new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null);
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonLink
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            if (this.props.renderExclusive) {
                var props = this.mergeButtonCfgProps();

                return (
                    <AlloyEditor.ButtonLinkEdit {...props} />
                );
            } else {
                return (
                    <button aria-label={AlloyEditor.Strings.link} className={cssClass} data-type="button-link" onClick={this._requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                        <span className="ae-icon-link"></span>
                    </button>
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
         *
         * @instance
         * @memberof ButtonLink
         * @method _requestExclusive
         * @protected
         */
        _requestExclusive: function() {
            this.props.requestExclusive(ButtonLink.key);
        }
    });

    AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
}());