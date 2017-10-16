(function () {
    'use strict';

    /**
     * The ButtonCommandListItem class is a UI class that renders a ButtonCommand that can be used inside
     * a list as an item, with a string representation of its behaviour.
     *
     * @class ButtonCommandListItem
     * @uses ButtonCommand
     */
    var ButtonCommandListItem = createReactClass({
        mixins: [AlloyEditor.ButtonCommand],

        propTypes: {
            /**
             * The command label or description to render in the list entry.
             *
             * @instance
             * @memberof ButtonCommandListItem
             * @property {String} description
             */
            description: PropTypes.string.isRequired,

            /**
             * The command icon to render in the list entry.
             *
             * @instance
             * @memberof ButtonCommandListItem
             * @property {String} icon
             */
            icon: PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonCommandListItem
             * @memberof ButtonCommandListItem
             * @property {String} key
             * @static
             */
            key: 'buttonCommandListItem'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCommandListItem
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button aria-label={this.props.description} className={this._getClassName()} onClick={this.execCommand} tabIndex={this.props.tabIndex}>{this.props.description}</button>
            );
        },

        /**
         * Returns the class name of Widget.
         *
         * @instance
         * @memberof ButtonCommandListItem
         * @method _getClassName
         * @protected
         * @return {String} The class name of the Widget.
         */
        _getClassName: function() {
            var className = 'ae-toolbar-element';

            if (this.props.icon) {
                className += ' ae-icon-' + this.props.icon;
            }

            return className;
        }
    });

    AlloyEditor.ButtonCommandListItem = ButtonCommandListItem;
}());