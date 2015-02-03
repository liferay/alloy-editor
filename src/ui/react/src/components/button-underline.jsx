(function () {
    'use strict';

    var ButtonUnderline = React.createClass({
        mixins: [global.ButtonElement, global.ButtonActive, global.ButtonAction],

        statics: {
            key: 'underline'
        },

        getDefaultProps: function() {
            return {
                element: 'u'
            };
        },

        render: function() {
            var className = this.getClassName();

            return (
                <button data-type="button-underline" className={className} onClick={this.handleClick}>
                    <span className="alloy-editor-icon-underline"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonUnderline.key] = global.AlloyEditor.ButtonUnderline = ButtonUnderline;
}());