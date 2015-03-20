(function () {
    'use strict';

    /**
     * The ButtonCommandListItem class is a ui class that renders a ButtonCommand that can be used inside
     * a list as an item, with a string representation of its behaviour.
     *
     * @class ButtonCommandListItem
     */
    var ButtonCommandListItem = React.createClass({
        mixins: [global.ButtonCommand],

        propTypes: {
            description: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttoncommandlistitem'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className={this._getClassName()} onClick={this.execCommand} tabIndex={this.props.tabIndex}>{this.props.description}</button>
            );
        },

        /**
         * [_getClassName description]
         * @return {[type]} [description]
         */
        _getClassName: function() {
            var className = 'alloy-editor-toolbar-element';

            if (this.props.icon) {
                className += ' alloy-editor-icon-' + this.props.icon;
            }

            return className;
        }
    });

    global.AlloyEditor.ButtonCommandListItem = ButtonCommandListItem;
}());