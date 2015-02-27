(function () {
    'use strict';

    var ButtonUnorderedlist = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionCommand],

        statics: {
            key: 'ul'
        },

        getDefaultProps: function() {
            return {
                command: 'bulletedlist',
                style: {
                    element: 'ul'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-ul" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-bulleted-list"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonUnorderedlist.key] = global.AlloyEditor.ButtonUnorderedlist = ButtonUnorderedlist;
}());