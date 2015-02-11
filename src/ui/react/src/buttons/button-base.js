(function () {
    'use strict';

    var ButtonBase = {
        propTypes: {
            element: React.PropTypes.string
        },

        componentWillMount: function() {
            if (this.props.element) {
                this._style = new CKEDITOR.style({
                    element: this.props.element
                });
            }
        },

        componentWillUnmount: function() {
            this._style = null;
        },

        handleClick: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            if (this._style) {
                if (this.isActive()) {
                    editor.removeStyle(this._style);
                } else {
                    editor.applyStyle(this._style);
                }
            }

            editor.fire('actionPerformed', this);
        },

        getClassName: function() {
            var className = 'alloy-editor-button';

            var isActive = this.isActive();

            if (isActive) {
                className += ' alloy-editor-button-pressed';
            }

            return className;
        },

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

    global.ButtonBase = ButtonBase;
}());