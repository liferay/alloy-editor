(function () {
    'use strict';

    /**
     * ButtonActionCommand is a mixin that provides a handleClick implementation for a
     * button based on the available CKEDITOR commands.
     *
     * The mixin exposes:
     * - {string} command: the command that should be executed
     * - {Function} handleClick: the function to attached to the button
     */
    var ButtonActionCommand = {
        propTypes: {
            command: React.PropTypes.string
        },

        handleClick: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command);

            editor.fire('actionPerformed', this);
        }
    };

    global.ButtonActionCommand = ButtonActionCommand;
}());