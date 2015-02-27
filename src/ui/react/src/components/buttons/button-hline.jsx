(function () {
    'use strict';

    var BUttonHline = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionCommand],

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

    global.AlloyEditor.Buttons[BUttonHline.key] = global.AlloyEditor.BUttonHline = BUttonHline;
}());