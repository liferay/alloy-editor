(function () {
    'use strict';

    var ButtonStrike = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionCommand],

        statics: {
            key: 'strike'
        },

        getDefaultProps: function() {
            return {
                command: 'strike',
                style: {
                    element: 's'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-strike" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-strike"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonStrike.key] = global.AlloyEditor.ButtonStrike = ButtonStrike;
}());