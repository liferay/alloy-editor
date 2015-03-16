(function () {
    'use strict';

    /**
     * The ButtonStylesList class provides functionality for showing a list of styles that can be
     * applied to the current selection..
     *
     * @class ButtonStylesList
     */
    var ButtonStylesList = React.createClass({
        mixins: [global.WidgetFocusManager],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonstyleslist'
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         */
        componentDidMount: function () {
            React.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
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
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-toolbar-element',
                keys: {
                    next: [39, 40],
                    prev: [37, 38]
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <div className="alloy-editor-container-styles-list" onFocus={this.focus} onKeyDown={this.handleKey} tabIndex="0">
                    <global.AlloyEditor.ButtonsStylesListHeader name="Block styles" styles={this._blockStyles} />
                    {this._renderStylesItems(this._blockStyles)}

                    <global.AlloyEditor.ButtonsStylesListHeader styles={this._inlineStyles} name="Inline styles" />
                    {this._renderStylesItems(this._inlineStyles)}

                    <global.AlloyEditor.ButtonsStylesListHeader styles={this._objectStyles} name="Object styles" />
                    {this._renderStylesItems(this._objectStyles)}
                </div>
            );
        },

        /**
         * Renders instances of ButtonStylesListItem with the preview of the correspondent block, inline or object styles.
         * @param {Array} styles List of styles for which preview should be rendered.
         *
         * @protected
         * @return {Array} Rendered instances of ButtonStylesListItem class
         */
        _renderStylesItems: function(styles) {
            var editor = this.props.editor;
            var trigger = this.props.trigger;
            var items;

            if (styles) {
                items = styles.map(function(item) {
                    return <global.AlloyEditor.ButtonStylesListItem key={item.name} editor={editor} name={item.name} style={item.style} tabIndex={(trigger && trigger.name === item.name) ? 0 : -1} />
                });
            }

            return items;
        }
    });

    global.AlloyEditor.ButtonStylesList = ButtonStylesList;
}());