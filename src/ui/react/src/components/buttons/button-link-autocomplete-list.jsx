(function () {
    'use strict';

    /**
     * The ButtonLinkAutocompleteList class provides functionality for showing a list of
     * autocomplete urls that can be selected for the link.
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonLinkAutocompleteList
     */
    var ButtonLinkAutocompleteList = React.createClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Autocomplete function
             *
             * @property {Function} data
             */
            data: React.PropTypes.func,

            /**
             * The current term to autocomplete for
             *
             * @property {String} term
             */
            term: React.PropTypes.string,

        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonLinkAutocompleteList
             */
            key: 'buttonLinkAutocompleteList'
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function () {
            this._timeout = null;
            this._xhr = null;
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function(nextProps) {
            if (!nextProps.term || nextProps.term !== this.props.term) {
                this._timeout && clearTimeout( this._timeout );
                this._xhr && this._xhr.abort();
                this.setState({
                    items: []
                });
                if (nextProps.term) {
                    this._timeout = setTimeout( this._updateItems, 250 );
                }
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function() {
            this._timeout && clearTimeout( this._timeout );
            this._xhr && this._xhr.abort();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
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
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
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
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (! this.props.expanded || ! this.state.items.length) {
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
         * @protected
         * @method _renderAutocompleteItems
         * @param {Array} items List of autocomplete items to render.
         * @return {Array} Rendered list item instances
         */
        _renderAutocompleteItems: function(items) {
            items = items || [];
            
            var handleLinkAutocompleteClick = this.props.handleLinkAutocompleteClick;
            
            return items.map(function(item) {
                return (
                    <li key={item.url} role="option">
                        <button className="ae-toolbar-element" onClick={handleLinkAutocompleteClick} data-value={item.url}>{item.title}</button>
                    </li>
                );
            });
        },

        /**
         * Conditionally resolves data Promise and then calls setState().
         *
         * @protected
         * @method _updateItems
         */
        _updateItems: function() {
            if (!this.props.term) {
                return;
            }
            var promise = this.props.data(this.props.term);
            if (typeof promise.then !== 'function') {
            	promise = Promise.resolve(promise);
            }
            var that = this;
            promise.then(function(items) {
	            if (items.length) {
		            ! that.props.expanded && that.props.toggleDropdown();
	            }
	            that.setState({
                    items: items
                });
            });
        }
    });

    AlloyEditor.ButtonLinkAutocompleteList = ButtonLinkAutocompleteList;
}());