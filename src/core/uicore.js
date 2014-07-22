(function() {
    'use strict';

    if (CKEDITOR.plugins.get('uicore')) {
        return;
    }

    /**
     * UICore class which will handle user interactions with the editor. These interactions
     * might be triggered via mouse, keyboard or touch devices. The class fill fire an event via
     * CKEditor's event system - "editorInteraction". The UI may listen to this event and
     * execute some actions - for example to show/hide toolbars.
     *
     * By default if user presses the Esc key, 'editorInteraction' event won't be fired. However, this behaviour can be changed
     * by setting {{#crossLink "CKEDITOR.plugins.uicore/allowEsc:attribute"}}{{/crossLink}} config property in editor's configuration to true.
     *
     * @class CKEDITOR.plugins.uicore
     */

    /**
     * Fired when user interacts somehow with the browser. This may be clicking with the mouse, pressing keyboard button,
     * or touching screen. This even will be not fired after each interaction. It will be debounced. By default the timeout
     * is 50ms. This value can be overwritten via {{#crossLink "CKEDITOR.plugins.uicore/timeout:attribute"}}{{/crossLink}}
     * property of editor's configuration, like: editor.config.uicore.timeout = 100
     *
     * @event editorInteraction
     * @param {Object} data An object which contains the following properties:
     * - nativeEvent - The event as received from CKEditor
     * - selectionData - The data, returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
     */

    /**
     * If set to true, the editor will still fire {{#crossLink "CKEDITOR.plugins.uicore/editorInteraction:event"}}{{/crossLink}} event,
     * if user presses Esc key.
     *
     * @attribute allowEsc
     * @default false
     * @type Boolean
     */

    /**
     * Specifies the default timeout after which the {{#crossLink "CKEDITOR.plugins.uicore/editorInteraction:event"}}{{/crossLink}} event
     * will be fired.
     *
     * @attribute timeout
     * @default 50 (ms)
     * @type Number
     */

    CKEDITOR.plugins.add(
        'uicore', {
            /**
             * Initializer lifecycle implementation for the UICore plugin.
             *
             * @method init
             * @protected
             */
            init: function(editor) {
                var handleUI;

                handleUI = CKEDITOR.tools.debounce(
                    function(event) {
                        if (event.name !== 'keyup' || event.data.$.keyCode !== 27 || editor.config.allowEsc) {
                            editor.fire('editorInteraction', {
                                nativeEvent: event.data.$,
                                selectionData: editor.getSelectionData()
                            });
                        }
                    },
                    editor.config.uicore ? editor.config.uicore.timeout : 50
                );

                editor.on('contentDom', function() {
                    var editable = editor.editable();

                    editable.attachListener(editable, 'mouseup', handleUI);
                    editable.attachListener(editable, 'keyup', handleUI);
                });
            }
        }
    );
}());