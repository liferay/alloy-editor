(function () {
    'use strict';

    var ButtonItalic = React.createClass({
        statics: {
            key: 'buttonItalic'
        },

        handleClick: function(event) {
            console.log('click italic!');
        },

        render: function() {
            return (
                <button data-type="button-italic" className="alloy-editor-button" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-italic"></span>
                </button>
            );
        }
    });

    global.Buttons.Italic = global.ButtonItalic = ButtonItalic;
}());