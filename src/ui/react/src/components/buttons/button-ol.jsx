(function () {
    'use strict';

    var ButtonOrderedList = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionCommand],

        statics: {
            key: 'ol'
        },

        getDefaultProps: function() {
            return {
                command: 'numberedlist',
                style: {
                    element: 'ol'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-ol" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-numbered-list"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonOrderedList.key] = global.AlloyEditor.ButtonOrderedList = ButtonOrderedList;
}());