(function () {
    'use strict';

    var ButtonBold = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        statics: {
            key: 'bold'
        },

        getDefaultProps: function() {
            return {
                command: 'bold',
                style: {
                    element: 'strong'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-bold" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-bold"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonBold.key] = global.AlloyEditor.ButtonBold = ButtonBold;
}());