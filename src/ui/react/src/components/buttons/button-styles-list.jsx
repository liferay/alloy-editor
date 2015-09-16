(function () {
    'use strict';

    /**
     * The ButtonStylesList class provides functionality for showing a list of styles that can be
     * applied to the current selection..
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonStylesList
     */
    var ButtonStylesList = React.createClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonStylesList
             */
            key: 'buttonStylesList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         *
         * @method componentDidMount
         */
        componentDidMount: function () {
            React.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function () {
            var blockStyles = [];
            var inlineStyles = [];
            var objectStyles = [];

            this.props.styles.forEach(function(item) {
                var style = new CKEDITOR.style(item.style);

                if (style.type === CKEDITOR.STYLE_BLOCK) {
                    blockStyles.push(item);
                } else if (style.type === CKEDITOR.STYLE_INLINE) {
                    inlineStyles.push(item);
                } else if (style.type === CKEDITOR.STYLE_OBJECT) {
                    objectStyles.push(item);
                }
            });

            this._blockStyles = blockStyles;
            this._inlineStyles = inlineStyles;
            this._objectStyles = objectStyles;
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
                },
                showRemoveStylesItem: true
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var removeStylesItem;

            if (this.props.showRemoveStylesItem) {
                removeStylesItem = <AlloyEditor.ButtonStylesListItemRemove editor={this.props.editor} />;
            }

            return (
                <div className="ae-dropdown ae-arrow-box ae-arrow-box-top-left" onFocus={this.focus} onKeyDown={this.handleKey} tabIndex="0">
                    <ul className="ae-listbox" role="listbox">
                        {removeStylesItem}

                        <AlloyEditor.ButtonsStylesListHeader name={AlloyEditor.Strings.blockStyles} styles={this._blockStyles} />
                        {this._renderStylesItems(this._blockStyles)}

                        <AlloyEditor.ButtonsStylesListHeader name={AlloyEditor.Strings.inlineStyles} styles={this._inlineStyles} />
                        {this._renderStylesItems(this._inlineStyles)}

                        <AlloyEditor.ButtonsStylesListHeader name={AlloyEditor.Strings.objectStyles} styles={this._objectStyles} />
                        {this._renderStylesItems(this._objectStyles)}
                    </ul>
                </div>
            );
        },

        /**
         * Renders instances of ButtonStylesListItem with the preview of the correspondent block, inline or object styles.
         *
         * @protected
         * @method _renderStylesItems
         * @param {Array} styles List of styles for which preview should be rendered.
         * @return {Array} Rendered instances of ButtonStylesListItem class
         */
        _renderStylesItems: function(styles) {
            var editor = this.props.editor;
            var items;

            if (styles && styles.length) {
                items = styles.map(function(item) {
                    return (
                        <li key={item.name} role="option">
                            <AlloyEditor.ButtonStylesListItem editor={editor} name={item.name} style={item.style} />
                        </li>
                    );
                });
            }

            return items;
        }
    });

    AlloyEditor.ButtonStylesList = ButtonStylesList;
}());