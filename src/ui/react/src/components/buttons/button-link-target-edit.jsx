(function () {
    'use strict';

    /**
     * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
     * in the document.
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonLinkTargetEdit
     */
    var ButtonLinkTargetEdit = React.createClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed items for the target attribute. Every allowed target is an object
             * with a `label` attribute that will be shown in the dropdown and a `value` attribute
             * that will get set as the link target attribute.
             *
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
            selectedTarget: React.PropTypes.string.isRequired
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
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
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
            var allowedTargetsList;

            if (this.props.expanded) {
                allowedTargetsList = this._getAllowedTargetsList();
            }

            return (
                <div className="ae-container-edit-link-target ae-container-dropdown ae-container-dropdown-medium ae-has-dropdown" onFocus={this.focus} onKeyDown={this.handleKey} tabIndex="0">
                    <button aria-expanded={this.props.expanded} aria-label={this.props.selectedTarget} className="ae-toolbar-element" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={this.props.selectedTarget}>
                        <div className="ae-container">
                            <span className="ae-container-dropdown-selected-item">{this.props.selectedTarget}</span>
                            <span className="ae-icon-arrow"></span>
                        </div>
                    </button>
                    {allowedTargetsList}
                </div>
            );
        },

        /**
         * Creates the dropdown list of allowed link targets.
         *
         * @protected
         * @method _getAllowedTargetsList
         *
         * @return {Object} The allowed targets dropdown.
         */
        _getAllowedTargetsList: function() {
            return(
                <AlloyEditor.ButtonDropdown>
                    {this._getAllowedTargetsListItems()}
                </AlloyEditor.ButtonDropdown>
            );
        },

        /**
         * Creates the allowed link target items.
         *
         * @protected
         * @method _getAllowedTargetsListItems
         *
         * @return {Array} The allowed target items.
         */
        _getAllowedTargetsListItems: function() {
            var handleLinkTargetChange = this.props.handleLinkTargetChange;

            var items = this.props.allowedTargets.map(function(item) {
                return (
                    <li key={item.value} role="option">
                        <button className="ae-toolbar-element" data-value={item.value} onClick={handleLinkTargetChange}>{item.label}</button>
                    </li>
                );
            });

            return items;
        }
    });

    AlloyEditor.Buttons[ButtonLinkTargetEdit.key] = AlloyEditor.ButtonLinkTargetEdit = ButtonLinkTargetEdit;
}());