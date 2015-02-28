(function () {
    'use strict';

    var ButtonSubscript = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        statics: {
            key: 'subscript'
        },

        getDefaultProps: function() {
            return {
                command: 'subscript',
                style: {
                    element: 'sub'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-subscript" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-subscript"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonSubscript.key] = global.AlloyEditor.ButtonSubscript = ButtonSubscript;
}());