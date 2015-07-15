(function () {
    'use strict';

    /**
     * The ButtonCommandsList class provides functionality for showing a list of commands that can be
     * executed to the current selection..
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonCommandsList
     */
    var ButtonCommandsList = React.createClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * List id to be used for accessibility purposes such as aria-owns.
             *
             * @property {String} listId
             */
            listId: React.PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonCommandsList
             */
            key: 'buttonCommandsList'
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
         * Lifecycle. Renders the UI of the list.
         *
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
         * @protected
         * @method _renderActions
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