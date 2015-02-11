(function () {
    'use strict';

    var ButtonBold = React.createClass({
        mixins: [global.ButtonBase],

        statics: {
            key: 'buttonBold'
        },

        getDefaultProps: function() {
            return {
                element: 'strong'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-bold" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-bold"></span>
                </button>
            );
        }
    });

    global.Buttons.bold = global.ButtonBold = ButtonBold;
}());