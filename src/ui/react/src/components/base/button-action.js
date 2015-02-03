(function () {
    'use strict';

    var ButtonAction = {
        handleClick: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.getSelection().lock();

            if (this._style) {
                if (this.isActive()) {
                    editor.removeStyle(this._style);
                } else {
                    editor.applyStyle(this._style);
                }
            }

            editor.getSelection().unlock();

            editor.fire('actionPerformed', this);
        }
    };

    global.ButtonAction = ButtonAction;
}());