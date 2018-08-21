(function () {
    'use strict';

    /**
     * The ButtonsStylesListHeader class provides the header of an list of style items.
     *
     * @class ButtonsStylesListHeader
     */
    var ButtonsStylesListHeader = createReactClass({
        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonsStylesListHeader
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.styles && this.props.styles.length) {
                return (
                    <span className="ae-list-header">{this.props.name}</span>
                );
            } else {
                return null;
            }
        }
    });

    AlloyEditor.ButtonsStylesListHeader = ButtonsStylesListHeader;
}());