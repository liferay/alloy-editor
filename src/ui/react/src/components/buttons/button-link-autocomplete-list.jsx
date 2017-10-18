(function () {
    'use strict';

    /**
     * The ButtonLinkAutocompleteList class provides functionality for showing a list of
     * items that can be selected for the link.
     *
     * @class ButtonLinkAutocompleteList
     * @uses WidgetFocusManager
     */
    var ButtonLinkAutocompleteList = createReactClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Autocomplete function
             *
             * @instance
             * @memberof ButtonLinkAutocompleteList
             * @property {Function} data
             */
            data: PropTypes.func,

            /**
             * Indicates if this is focused when this component is updated
             *
             * @instance
             * @memberof ButtonLinkAutocompleteList
             * @property {Boolean} autocompleteSelected
             */
            autocompleteSelected: PropTypes.bool,

            /**
             * The current term to autocomplete for
             *
             * @instance
             * @memberof ButtonLinkAutocompleteList
             * @property {String} term
             */
            term: PropTypes.string,

            /**
            * Method to update parent selectautocomplete state
            *
             * @instance
             * @memberof ButtonLinkAutocompleteList
            * @property {Function} setAutocompleteState
            */
            setAutocompleteState: PropTypes.func

        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonLinkAutocompleteList
             * @memberof ButtonLinkAutocompleteList
             * @property {String} key
             * @static
             */
            key: 'buttonLinkAutocompleteList'
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function(nextProps) {
            if (!nextProps.term || nextProps.term !== this.props.term) {
                clearTimeout(this._timeout);

                if (nextProps.term) {
                    this._timeout = setTimeout(this._updateItems, this.props.delay);
                } else {
                    this.setState({
                        items: []
                    });
                }
            }

            if (nextProps.autocompleteSelected) {
                setTimeout(this.focus, 0);
                this.props.setAutocompleteState({
                    selected: false
                });
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method componentWillUnmount
         */
        componentWillUnmount: function() {
            clearTimeout(this._timeout);
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: false,
                data: [],
                delay: 100,
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
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method getInitialState
         */
        getInitialState: function() {
            return {
                items: []
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (!this.props.expanded || !this.state.items.length) {
                return null;
            }

            return (
                <AlloyEditor.ButtonDropdown>
                    {this._renderAutocompleteItems(this.state.items)}
                </AlloyEditor.ButtonDropdown>
            );
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method  shouldComponentUpdate
         * @return {Boolean} Returns false when the transition to the new props and state will not
         * require a component update.
         */
        shouldComponentUpdate: function(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.term !== this.props.term || nextState.items !== this.state.items;
        },

        /**
         * Renders a set of list items for the provided items
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method _renderAutocompleteItems
         * @param {Array} items List of autocomplete items to render
         * @protected
         * @return {Array} Rendered list item instances
         */
        _renderAutocompleteItems: function(items) {
            items = items || [];

            var handleLinkAutocompleteClick = this.props.handleLinkAutocompleteClick;

            return items.map(function(item) {
                var className = this.props.term === item.url ? 'ae-toolbar-element active' : 'ae-toolbar-element';

                return (
                    <li key={item.url} role="option">
                        <button className={className} onClick={handleLinkAutocompleteClick} data-value={item.url}>{item.title}</button>
                    </li>
                );
            }.bind(this));
        },

        /**
         * Retrieves the data according to {this.props.term} and calls setState() with the returned data
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method _updateItems
         * @protected
         */
        _updateItems: function() {
            var instance = this;

            if (!this.props.term) {
                return;
            }

            var promise = Promise.resolve(this.props.data(this.props.term));

            promise.then(function(items) {
                if (items.length) {
                    !instance.props.expanded && instance.props.toggleDropdown();
                }

                instance.setState({
                    items: items
                });
            });
        }
    });

    AlloyEditor.ButtonLinkAutocompleteList = ButtonLinkAutocompleteList;
}());