(function () {
    'use strict';

    /**
     * The ButtonDropdown class provides markup and keyboard navigation behaviour to a dropdown
     * opened from a button.
     *
     * @class ButtonDropdown
     */
    var ButtonDropdown = React.createClass({
        mixins: [AlloyEditor.WidgetFocusManager],

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function() {
            return {
                height: 0,
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

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the dropdown in the configuration.
             *
             * @static
             * @property {String} key
             * @default dropdown
             */
            key: 'dropdown'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var style = {},
                onFocus = this.focus;
            if (!!this.props.height && !isNaN(this.props.height)) {
                style = {
                    overflowY: 'scroll',
                    height: this.props.height
                }
                onFocus = false;
            }
            return (
                <div className="ae-dropdown ae-arrow-box ae-arrow-box-top-left" onFocus={onFocus} style={style} onKeyDown={this.handleKey} tabIndex="0">
                    <ul className="ae-listbox" role="listbox">
                        {this.props.children}
                    </ul>
                </div>
            );
        }
    });

    AlloyEditor.Buttons[ButtonDropdown.key] = AlloyEditor.ButtonDropdown = ButtonDropdown;
}());
