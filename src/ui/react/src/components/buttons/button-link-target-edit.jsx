(function () {
    'use strict';

    /**
     * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
     * in the document.
     *
     * @class ButtonLinkTargetEdit
     */
    var ButtonLinkTargetEdit = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed items for the target attribute. Every allowed target is an object
             * with a `label` attribute that will be shown in the dropdown and a `value` attribute
             * that will get set as the link target attribute.
             *
             * @instance
             * @memberof ButtonLinkTargetEdit
             * @property {Array<object>} allowedTargets
             */
            allowedTargets: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonLinkTargetEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Label of the current target value.
             *
             * @instance
             * @memberof ButtonLinkTargetEdit
             * @property {String} selectedTarget
             */
            selectedTarget: PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default linkTargetEdit
             * @memberof ButtonLinkTargetEdit
             * @property {String} key
             * @static
             */
            key: 'linkTargetEdit'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonLinkTargetEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var buttonTargetsList;

            var handleLinkTargetChange = this.props.handleLinkTargetChange;
            var allowedLinkTargets = this.props.allowedTargets;

            if (this.props.expanded) {
                buttonTargetsList= <AlloyEditor.ButtonTargetList editor={this.props.editor} onDismiss={this.props.toggleDropdown} allowedLinkTargets={allowedLinkTargets} handleLinkTargetChange={handleLinkTargetChange} selectedTarget={this.props.selectedTarget}/>;
            }

            return (
                <div className="ae-container-edit-link-target ae-container-dropdown ae-container-dropdown-medium ae-has-dropdown" tabIndex="0">
                    <button aria-expanded={this.props.expanded} aria-label={this.props.selectedTarget} className="ae-toolbar-element" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={this.props.selectedTarget}>
                        <div className="ae-container">
                            <span className="ae-container-dropdown-selected-item">{this.props.selectedTarget}</span>
                            <span className="ae-icon-arrow"></span>
                        </div>
                    </button>
                   {buttonTargetsList}
                </div>
            );
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @instance
         * @memberof ButtonLinkTargetEdit
         * @method  shouldComponentUpdate
         * @return {Boolean} Returns false when the transition to the new props and state will not
         * require a component update.
         */
        shouldComponentUpdate: function(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.selectedTarget !== this.props.selectedTarget;
        }
    });

    AlloyEditor.Buttons[ButtonLinkTargetEdit.key] = AlloyEditor.ButtonLinkTargetEdit = ButtonLinkTargetEdit;
}());