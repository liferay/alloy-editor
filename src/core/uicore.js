;(function() {
    'use strict';

    CKEDITOR.plugins.add(
        'uicore',
        {
            init: function(editor) {
                var handleUI;

                handleUI = CKEDITOR.tools.debounce(
                    function(event) {
                        if (event.type !== 'keyup' || event.charCode !== 27 || editor.config.allowEsc) {
                            editor.fire('editorInteraction', {
                                nativeEvent: event.data.$,
                                selectionData: editor.getSelectionData()
                            });
                        }
                    },
                    editor.config.uicore ? editor.config.uicore.delay : 50
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