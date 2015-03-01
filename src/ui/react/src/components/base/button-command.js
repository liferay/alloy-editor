(function () {
    'use strict';

    /**
     * ButtonCommand is a mixin that provides a click implementation for a
     * button based on the available CKEDITOR commands.
     *
     * The mixin exposes:
     * - {string} command: the command that should be executed
     * - {Function} handleClick: the function to attached to the button
     *
     * @class ButtonCommand
     */
    var ButtonCommand = {
        propTypes: {
            command: React.PropTypes.string.isRequired
        },

        /**
         * Executes a CKEditor command and fires `actionPerformed` event.
         */
        handleClick: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command);

            editor.fire('actionPerformed', this);
        }
    };

    global.ButtonCommand = ButtonCommand;
}());