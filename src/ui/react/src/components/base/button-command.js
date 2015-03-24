(function () {
    'use strict';

    /**
     * ButtonCommand is a mixin that executes a command via CKEDITOR's API.
     *
     * The mixin exposes:
     * - {string} command: the command that should be executed.
     * - {boolean} modifiesSelection: indicates that the command may cause the editor to have a different
     * selection than at the beginning. This is particularly important for commands that perform removal
     * operations on dom elements.
     * - {Function} execCommand: executes the provided command via CKEDITOR's API.
     *
     * @class ButtonCommand
     */
    var ButtonCommand = {
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            command: React.PropTypes.string.isRequired,
            modifiesSelection: React.PropTypes.bool
        },

        /**
         * Executes a CKEditor command and fires `actionPerformed` event.
         */
        execCommand: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command);

            if (this.props.modifiesSelection) {
                editor.selectionChange(true);
            }

            editor.fire('actionPerformed', this);
        }
    };

    global.ButtonCommand = ButtonCommand;
}());