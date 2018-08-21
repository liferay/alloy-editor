(function() {
    'use strict';

    /**
     * ButtonCommandActive is a mixin that provides an `isActive` method to determine if
     * a context-aware command is currently in an active state.
     *
     * @class ButtonCommandActive
     */
    var ButtonCommandActive = {
        /**
         * Checks if the command is active in the current selection.
         *
         * @instance
         * @memberof ButtonCommandActive
         * @method isActive
         * @return {Boolean} True if the command is active, false otherwise.
         */
        isActive: function() {
            var editor = this.props.editor.get('nativeEditor');

            var command = editor.getCommand(this.props.command);

            return command ? command.state === CKEDITOR.TRISTATE_ON : false;
        }
    };

    AlloyEditor.ButtonCommandActive = ButtonCommandActive;
}());