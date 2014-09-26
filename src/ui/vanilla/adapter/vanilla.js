CKEDITOR.disableAutoInline = true;

(function() {
    function AlloyEditor(srcNode, config) {
        this._srcNode = srcNode;

        this._config = config || {};

        this.init();
    }

    AlloyEditor.prototype = {
        constructor: AlloyEditor,

        init: function() {
            var editor,
                key,
                toolbarStyles;

            editor = CKEDITOR.inline(this._srcNode);

            editor.config.allowedContent = this._config.allowedContent || true;

            editor.config.removePlugins = this._config.removePlugins ||
                'contextmenu,toolbar,elementspath,resize,liststyle,tabletools,link';

            editor.config.extraPlugins = this._config.extraPlugins ||
                'uicore,selectionregion,dropimages,placeholder';

            editor.config.title = false;

            for (key in this._config) {
                if (Object.prototype.hasOwnProperty.call(this._config, key)) {
                    editor.config.key = this._config[key];
                }
            }

            toolbarStyles = new AlloyEditor.ToolbarStyles({
                editor: editor
            });

            this._editor = editor;
        }
    };

    window.AlloyEditor = window.AlloyEditor || AlloyEditor;
}());