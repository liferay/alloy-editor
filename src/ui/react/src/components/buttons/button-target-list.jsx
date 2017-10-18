(function () {
    'use strict';

    /**
     * The ButtonTargetList class provides functionality for changing the target of a link
     * in the document.
     *
     * @class ButtonTargetList
     * @uses WidgetFocusManager
     */
    var ButtonTargetList = createReactClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTargetList
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default linkTargetEdit
             * @memberof ButtonTargetList
             * @property {String} key
             * @static
             */
            key: 'targetList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method componentDidMount
         */
        componentDidMount: function() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method getDefaultProps
         */
        getDefaultProps: function() {
            return {
                circular: true,
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
         * @instance
         * @memberof ButtonTargetList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var listTargets = this._renderListTargets();

            return (
                <AlloyEditor.ButtonDropdown {...this.props}>
                    {listTargets}
                </AlloyEditor.ButtonDropdown>
            );
        },

        /**
         * Returns the the allowed link target items.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method _getAllowedTargetItems
         * @protected
         * @return {Array} The allowed target items.
         */
        _getAllowedTargetItems: function() {
            return this.props.allowedLinkTargets || [{
                label: AlloyEditor.Strings.linkTargetDefault,
                value: ''
            }, {
                label: AlloyEditor.Strings.linkTargetSelf,
                value: '_self'
            }, {
                label: AlloyEditor.Strings.linkTargetBlank,
                value: '_blank'
            }, {
                label: AlloyEditor.Strings.linkTargetParent,
                value: '_parent'
            }, {
                label: AlloyEditor.Strings.linkTargetTop,
                value: '_top'
            }];
        },

        /**
         * Renders the allowed link target items.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method _renderListTargets
         * @protected
         * @return {Object} Returns the rendered link items
         */
        _renderListTargets: function() {
            var targets = this._getAllowedTargetItems();

            var handleLinkTargetChange = this.props.handleLinkTargetChange;

            targets = targets.map(function(target) {
                var className = this.props.selectedTarget === target.value ? 'ae-toolbar-element active' : 'ae-toolbar-element';

                return (
                    <li key={target.value} role="option">
                        <button className={className} data-value={target.value} onClick={handleLinkTargetChange}>{target.label}</button>
                    </li>
                );
            }.bind(this));

            return targets;
        }
    });

    AlloyEditor.Buttons[ButtonTargetList.key] = AlloyEditor.ButtonTargetList = ButtonTargetList;
}());