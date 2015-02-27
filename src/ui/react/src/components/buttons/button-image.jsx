(function () {
    'use strict';

    var ButtonImage = React.createClass({
        mixins: [global.ButtonAction, global.ButtonStateClasses],

        statics: {
            key: 'image'
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-image" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-image"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonImage.key] = global.AlloyEditor.ButtonImage = ButtonImage;
}());