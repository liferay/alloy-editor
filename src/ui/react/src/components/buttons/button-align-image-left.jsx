(function () {
    'use strict';

    var ButtonAlignImageLeft = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionStyle],

        statics: {
            key: 'imageLeft'
        },

        getDefaultProps: function() {
            return {
                style: {
                    element: 'img',
                    styles: {
                        float: 'left'
                    }
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-align-left" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-align-left"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonAlignImageLeft.key] = global.AlloyEditor.ButtonAlignImageLeft = ButtonAlignImageLeft;
}());