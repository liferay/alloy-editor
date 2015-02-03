(function () {
    'use strict';

    var ButtonActive = {
        isActive: function() {
            var result;

            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            // A button which augments button-base may have style or not.
            // The status will be set only for those buttons which have style.
            if (this._style) {
                result = this._style.checkActive(elementPath, editor);
            }

            return result;
        }
    };

    global.ButtonActive = ButtonActive;
}());
