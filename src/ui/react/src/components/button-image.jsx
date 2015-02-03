(function () {
    'use strict';

    var ButtonImage = React.createClass({
        mixins: [global.ButtonElement, global.ButtonActive, global.ButtonAction],

        statics: {
            key: 'image'
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-image" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-image"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonImage.key] = global.AlloyEditor.ButtonImage = ButtonImage;
}());