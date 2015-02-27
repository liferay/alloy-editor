(function () {
    'use strict';

    var ButtonQuote = React.createClass({
        mixins: [global.ButtonStyle, global.ButtonStateClasses, global.ButtonActionCommand],

        statics: {
            key: 'quote'
        },

        getDefaultProps: function() {
            return {
                command: 'blockquote',
                style: {
                    element: 'blockquote'
                }
            };
        },

        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-quote" onClick={this.handleClick}>
                    <span className="alloy-editor-icon-quote"></span>
                </button>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonQuote.key] = global.AlloyEditor.ButtonQuote = ButtonQuote;
}());