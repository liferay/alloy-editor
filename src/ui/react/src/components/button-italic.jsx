(function () {
    'use strict';

    var ButtonItalic = React.createClass({
        mixins: [global.ButtonElement, global.ButtonActive, global.ButtonAction],

        statics: {
            key: 'italic'
        },

        getDefaultProps: function() {
            return {
                element: 'em'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-italic" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-italic"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonItalic.key] = global.AlloyEditor.ButtonItalic = ButtonItalic;
}());