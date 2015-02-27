(function () {
    'use strict';

    /**
     * ButtonStyle is a mixin that provides a style prop and some methods to apply the resulting
     * style and checking if it is present in a given path or selection.
     *
     * The mixin exposes:
     * - {object} style: the style the button should handle as described by http://docs.ckeditor.com/#!/api/CKEDITOR.style
     * - {Function} getStyle: returns the CKEDITOR style associated with the element
     * - {Function} isActive: checks wether or not the button is active based on the element
     */
    var ButtonStyle = {
        propTypes: {
            style: React.PropTypes.object
        },

        componentWillMount: function() {
            this._style = new CKEDITOR.style(this.props.style);
        },

        componentWillUnmount: function() {
            this._style = null;
        },

        getStyle: function() {
            return this._style;
        },

        isActive: function() {
            var result;

            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            result = this.getStyle().checkActive(elementPath, editor);

            return result;
        }
    };

    global.ButtonStyle = ButtonStyle;
}());