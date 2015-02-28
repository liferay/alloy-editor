(function () {
    'use strict';

    var ButtonHline = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonCommand],

        statics: {
            key: 'hline'
        },

        getDefaultProps: function() {
            return {
                command: 'horizontalrule',
                style: {
                    element: 'hr'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-hline" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-separator"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonHline.key] = global.AlloyEditor.ButtonHline = ButtonHline;
}());