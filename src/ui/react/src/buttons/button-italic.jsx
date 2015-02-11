(function () {
    'use strict';

    var ButtonItalic = React.createClass({
        mixins: [global.ButtonBase],

        statics: {
            key: 'buttonItalic'
        },

        getDefaultProps: function() {
            return {
                element: 'em'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-italic" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-italic"></span>
                </button>
            );
        }
    });

    global.Buttons.italic = global.ButtonItalic = ButtonItalic;
}());