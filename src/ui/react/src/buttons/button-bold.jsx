(function () {
    'use strict';

    var ButtonBold = React.createClass({
        statics: {
            key: 'buttonBold'
        },

        handleClick: function(event) {
            console.log('click bold!');
        },

        render: function() {
            return (
                <button data-type="button-bold" className="alloy-editor-button" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-bold"></span>
                </button>
            );
        }
    });

    global.Buttons.bold = global.ButtonBold = ButtonBold;
}());