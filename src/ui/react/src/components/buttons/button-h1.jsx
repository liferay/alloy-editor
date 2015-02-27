(function () {
    'use strict';

    var ButtonH1 = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        statics: {
            key: 'h1'
        },

        getDefaultProps: function() {
            return {
                style: {
                    element: 'h1'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-h1" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-h1"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonH1.key] = global.AlloyEditor.ButtonH1 = ButtonH1;
}());