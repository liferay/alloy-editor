(function () {
    'use strict';

    var ButtonH2 = React.createClass({
        mixins: [global.ButtonElement, global.ButtonActive, global.ButtonAction],

        statics: {
            key: 'h2'
        },

        getDefaultProps: function() {
            return {
                element: 'h2'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-h2" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-h2"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonH2.key] = global.AlloyEditor.ButtonH2 = ButtonH2;
}());