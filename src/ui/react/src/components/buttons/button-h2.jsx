(function () {
    'use strict';

    var ButtonH2 = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        statics: {
            key: 'h2'
        },

        getDefaultProps: function() {
            return {
                style: {
                    element: 'h2'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-h2" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-h2"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonH2.key] = global.AlloyEditor.ButtonH2 = ButtonH2;
}());