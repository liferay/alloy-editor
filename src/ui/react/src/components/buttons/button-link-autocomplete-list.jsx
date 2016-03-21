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
             * Autocomplete url including {term} placeholder, for example:
             * /api/autocomplete?term={term}
             *
             * @property {String} autocompleteUrl
             */
            autocompleteUrl: React.PropTypes.string,

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
            if (! this.state.items.length) {
                return null;
            }
            return (
                <AlloyEditor.ButtonDropdown>
                    {this._renderAutocompleteItems(this.state.items)}
                </AlloyEditor.ButtonDropdown>
            );
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
                    <li key={item.Url} role="option">
                        <button className="ae-toolbar-element" onClick={handleLinkAutocompleteClick} data-value={item.Url}>{item.Title}</button>
                    </li>
                );
            });
        },

        /**
         * Conditionally makes request to autocomplete endpoint for 
         * matching items and then calls setState().
         *
         * @protected
         * @method _updateItems
         */
        _updateItems: function() {
            if (!this.props.term) {
                return;
            }
            var that = this, url = this.props.autocompleteUrl.replace("{term}", this.props.term);
            this._makeRequest( url, function( data ) {
                that.setState({
                    items: JSON.parse(data).links
                });
            } );
        },

        _makeRequest: function(url, callback) {
            var xhr = this._xhr = this._getXHR();

            if ( !xhr )
                return null;

            xhr.open( 'GET', url, true );

            xhr.onreadystatechange = function() {
                if ( xhr.readyState == 4 && ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223 ) ) {
                    callback( xhr.responseText );
                    this._xhr = xhr = null;
                }
            };
            xhr.send( null );
        },

        _getXHR: function() {
            if ( !CKEDITOR.env.ie || location.protocol != 'file:' ) {
                try {
                    return new XMLHttpRequest();
                } catch ( e ) {}
            }

            try {
                return new ActiveXObject( 'Msxml2.XMLHTTP' );
            } catch ( e ) {}
            try {
                return new ActiveXObject( 'Microsoft.XMLHTTP' );
            } catch ( e ) {}
        }
    });

    AlloyEditor.ButtonLinkAutocompleteList = ButtonLinkAutocompleteList;
}());