(function () {
    'use strict';

    /**
     * ButtonCommand is a mixin that executes a command via CKEDITOR's API.
     *
     * The mixin exposes:
     * - {string} command: the command that should be executed.
     * - {Function} execCommand: executes the provided command via CKEDITOR's API.
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
        execCommand: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command);

            editor.fire('actionPerformed', this);
        }
    };

    global.ButtonCommand = ButtonCommand;
}());