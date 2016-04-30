(function () {
    'use strict';

    /**
     * The ButtonTargetList class provides functionality for changing the target of a link
     * in the document.
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonTargetList
     */
    var ButtonTargetList = React.createClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired
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
            key: 'targetList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @method componentDidMount
         */
        componentDidMount: function() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
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
         * @protected
         * @method _getAllowedTargetItems
         *
         * @return {Array} The allowed target items.
         */
        _getAllowedTargetItems: function() {
            return this.props.allowedLinkTargets || [{
                label: AlloyEditor.Strings.linkTargetDefault,
                value: ''
            },
            {
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
         * @method _renderListTargets
         * @return {Object} Returns the rendered link items
         */
        _renderListTargets: function() {
            var targets = this._getAllowedTargetItems();

            var handleLinkTargetChange = this.props.handleLinkTargetChange;

            targets = targets.map(function(target) {
                return (
                    <li key={target.value} role="option">
                        <button className="ae-toolbar-element" data-value={target.value} onClick={handleLinkTargetChange}>{target.label}</button>
                    </li>
                );
            });

            return targets;
        }
    });

    AlloyEditor.Buttons[ButtonTargetList.key] = AlloyEditor.ButtonTargetList = ButtonTargetList;
}());