(function() {
    'use strict';

    /**
     * ButtonCommand is a mixin that executes a command via CKEDITOR's API.
     *
     * @class ButtonCommand
     */
    var ButtonCommand = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The command that should be executed.
             *
             * @instance
             * @memberof ButtonCommand
             * @property {String} command
             */
            command: PropTypes.string.isRequired,

            /**
             * Indicates that the command may cause the editor to have a different.
             *
             * @instance
             * @memberof ButtonCommand
             * @property {boolean} modifiesSelection
             */
            modifiesSelection: PropTypes.bool
        },

        /**
         * Executes a CKEditor command and fires `actionPerformed` event.
         *
         * @instance
         * @memberof ButtonCommand
         * @param {Object=} data Optional data to be passed to CKEDITOR's `execCommand` method.
         * @method execCommand
         */
        execCommand: function(data) {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command, data);

            if (this.props.modifiesSelection) {
                editor.selectionChange(true);
            }

            editor.fire('actionPerformed', this);
        }
    };

    AlloyEditor.ButtonCommand = ButtonCommand;
}());