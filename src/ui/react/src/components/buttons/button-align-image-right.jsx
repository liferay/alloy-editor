(function () {
    'use strict';

    var ButtonAlignImageRight = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        statics: {
            key: 'imageRight'
        },

        getDefaultProps: function() {
            return {
                style: {
                    element: 'img',
                    styles: {
                        float: 'right'
                    }
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-align-right" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-align-right"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonAlignImageRight.key] = global.AlloyEditor.ButtonAlignImageRight = ButtonAlignImageRight;
}());