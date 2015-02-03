(function () {
    'use strict';

    var ButtonBold = React.createClass({
        mixins: [global.ButtonElement, global.ButtonActive, global.ButtonAction],

        statics: {
            key: 'bold'
        },

        getDefaultProps: function() {
            return {
                element: 'strong'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-bold" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-bold"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonBold.key] = global.AlloyEditor.ButtonBold = ButtonBold;
}());