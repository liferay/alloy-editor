(function () {
    'use strict';

    var ButtonElement = {
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

        getClassName: function() {
            var className = 'alloy-editor-button';

            var isActive = this.isActive();

            if (isActive) {
                className += ' alloy-editor-button-pressed';
            }

            return className;
        }
    };

    global.ButtonElement = ButtonElement;
}());