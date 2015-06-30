(function () {
    'use strict';

    /**
     * The ButtonCommandListItem class is a UI class that renders a ButtonCommand that can be used inside
     * a list as an item, with a string representation of its behaviour.
     *
     * @uses ButtonCommand
     *
     * @class ButtonCommandListItem
     */
    var ButtonCommandListItem = React.createClass({
        mixins: [AlloyEditor.ButtonCommand],

        propTypes: {
            /**
             * The command label or description to render in the list entry.
             *
             * @property {String} description
             */
            description: React.PropTypes.string.isRequired,

            /**
             * The command icon to render in the list entry.
             *
             * @property {String} icon
             */
            icon: React.PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonCommandListItem
             */
            key: 'buttonCommandListItem'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
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
         * @method _getClassName
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