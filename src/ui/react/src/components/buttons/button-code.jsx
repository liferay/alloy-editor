(function () {
    'use strict';

    var ButtonCode = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        statics: {
            key: 'code'
        },

        getDefaultProps: function() {
            return {
                style: {
                    element: 'pre'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-code" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-code"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonCode.key] = global.AlloyEditor.ButtonCode = ButtonCode;
}());