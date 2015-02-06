(function () {
    'use strict';

    var ButtonBold = React.createClass({
        handleClick: function(event) {
            console.log('click bold!');
        },

        render: function() {
            return (
                <button type="button" className="btn btn-default" ariaLabel="Left Align" onClick={this.handleClick}>
                    <span className="glyphicon glyphicon-bold" ariaHidden="true"></span>
                </button>
            );
        }
    });

    ButtonBold.key = 'buttonBold';

    global.Buttons.bold = global.ButtonBold = ButtonBold;
}());