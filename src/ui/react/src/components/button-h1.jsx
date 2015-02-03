(function () {
    'use strict';

    var ButtonH1 = React.createClass({
        mixins: [global.ButtonElement, global.ButtonActive, global.ButtonAction],

        statics: {
            key: 'h1'
        },

        getDefaultProps: function() {
            return {
                element: 'h1'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-h1" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-h1"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonH1.key] = global.AlloyEditor.ButtonH1 = ButtonH1;
}());