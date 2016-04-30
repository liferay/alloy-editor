(function () {
    'use strict';

    /**
     * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
     * in the document.
     *
     * @class ButtonLinkTargetEdit
     */
    var ButtonLinkTargetEdit = React.createClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed items for the target attribute. Every allowed target is an object
             * with a `label` attribute that will be shown in the dropdown and a `value` attribute
             * that will get set as the link target attribute.
             * @property {Array<object>} allowedTargets
             */
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Label of the current target value.
             *
             * @property {String} selectedTarget
             */
            selectedTarget: React.PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default linkTargetEdit
             */
            key: 'linkTargetEdit'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var buttonTargetsList;

             var handleLinkTargetChange = this.props.handleLinkTargetChange;

            if (this.props.expanded) {
                buttonTargetsList= <AlloyEditor.ButtonTargetList editor={this.props.editor} onDismiss={this.props.toggleDropdown} handleLinkTargetChange={handleLinkTargetChange}/>;
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