(function () {
    'use strict';

    var ButtonItalic = React.createClass({
        getKey: function() {
            return 'ButtonItalic';
        },

        handleClick: function(event) {
            console.log('click italic!');
        },

        render: function() {
            return (
                <button type="button" className="btn btn-default" ariaLabel="Left Align" onClick={this.handleClick}>
                    <span className="glyphicon glyphicon-italic" ariaHidden="true"></span>
                </button>
            );
        }
    });

    ButtonItalic.key = 'buttonItalic';

    global.Buttons.Italic = global.ButtonItalic = ButtonItalic;
}());