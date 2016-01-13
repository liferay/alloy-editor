(function() {
    'use strict';

    if (CKEDITOR.plugins.get('ae_selectionkeystrokes')) {
        return;
    }

    /**
     * CKEditor plugin that simulates editor interaction events based on manual keystrokes. This
     * can be used to trigger different reactions in the editor.
     *
     * @class CKEDITOR.plugins.ae_selectionkeystrokes
     */
    CKEDITOR.plugins.add(
        'ae_selectionkeystrokes', {
            requires: 'ae_selectionregion',

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function adds a command to the editor for every defined selectionKeystroke
             * in the configuration and maps it to the specified keystroke.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                if (editor.config.selectionKeystrokes) {
                    editor.config.selectionKeystrokes.forEach(function(selectionKeystroke) {
                        var command = new CKEDITOR.command(editor, {
                            exec: function(editor) {
                                editor.fire('editorInteraction', {
                                    manualSelection: selectionKeystroke.selection,
                                    nativeEvent: {},
                                    selectionData: editor.getSelectionData()
                                });
                            }
                        });

                        var commandName = 'selectionKeystroke' + selectionKeystroke.selection;

                        editor.addCommand(commandName, command);
                        editor.setKeystroke(selectionKeystroke.keys, commandName);
                    });
                }
            }
        }
    );
}());