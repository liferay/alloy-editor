(function () {
    'use strict';

    var ButtonUnderline = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        statics: {
            key: 'underline'
        },

        getDefaultProps: function() {
            return {
                command: 'underline',
                style: {
                    element: 'u'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-underline" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-underline"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonUnderline.key] = global.AlloyEditor.ButtonUnderline = ButtonUnderline;
}());