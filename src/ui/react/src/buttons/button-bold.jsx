(function () {
    'use strict';

    var ButtonBold = React.createClass({
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

    ButtonBold.key = 'buttonBold';

    global.Buttons.bold = global.ButtonBold = ButtonBold;
}());