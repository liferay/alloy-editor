(function () {
    'use strict';

    /**
     * The ButtonCommandsList class provides functionality for showing a list of commands that can be
     * executed to the current selection..
     *
     * @class ButtonCommandsList
     * @uses WidgetFocusManager
     */
    var ButtonCommandsList = createReactClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonCommandsList
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonCommandsList
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * List id to be used for accessibility purposes such as aria-owns.
             *
             * @instance
             * @memberof ButtonCommandsList
             * @property {String} listId
             */
            listId: PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonCommandsList
             * @memberof ButtonCommandsList
             * @property {String} key
             * @static
             */
            key: 'buttonCommandsList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method componentDidMount
         */
        componentDidMount: function () {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonCommandsList
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
         * Lifecycle. Renders the UI of the list.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <div className="ae-dropdown ae-arrow-box ae-arrow-box-top-left" onFocus={this.focus} onKeyDown={this.handleKey} tabIndex="0">
                    <ul className="ae-listbox" id={this.props.listId} role="listbox">
                        {this._renderActions(this.props.commands)}
                    </ul>
                </div>
            );
        },

        /**
         * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method _renderActions
         * @protected
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function(commands) {
            var editor = this.props.editor;
            var items;

            if (commands && commands.length) {
                items = commands.map(function(item) {
                    return (
                        <li key={item.command} role="option">
                            <AlloyEditor.ButtonCommandListItem command={item.command} description={typeof item.label === 'string' ? item.label : item.label()} editor={editor} />
                        </li>
                    );
                });
            }

            return items;
        }
    });

    AlloyEditor.ButtonCommandsList = ButtonCommandsList;
}());