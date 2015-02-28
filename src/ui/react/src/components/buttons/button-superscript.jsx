(function () {
    'use strict';

    var ButtonSuperscript = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        statics: {
            key: 'superscript'
        },

        getDefaultProps: function() {
            return {
                command: 'superscript',
                style: {
                    element: 'sup'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-superscript" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-superscript"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonSuperscript.key] = global.AlloyEditor.ButtonSuperscript = ButtonSuperscript;
}());