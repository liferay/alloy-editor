(function () {
    'use strict';

    var ButtonItalic = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        statics: {
            key: 'italic'
        },

        getDefaultProps: function() {
            return {
                command: 'italic',
                style: {
                    element: 'em'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-italic" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-italic"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonItalic.key] = global.AlloyEditor.ButtonItalic = ButtonItalic;
}());