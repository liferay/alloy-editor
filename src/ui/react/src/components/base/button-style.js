(function() {
    'use strict';

    /**
     * ButtonStyle is a mixin that provides a style prop and some methods to apply the resulting
     * style and checking if it is present in a given path or selection.
     *
     * @class ButtonStyle
     */
    var ButtonStyle = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The style the button should handle as described by http://docs.ckeditor.com/#!/api/CKEDITOR.style
             *
             * @property {Object} style
             */
            style: React.PropTypes.object
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function() {
            this._style = new CKEDITOR.style(this.props.style);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function() {
            this._style = null;
        },

        /**
         * Returns instance of CKEDITOR.style which represents the current button style.
         *
         * @method getStyle
         * @return {CKEDITOR.style} The current style representation.
         */
        getStyle: function() {
            return this._style;
        },

        /**
         * Checks if style is active in the current selection.
         *
         * @method isActive
         * @return {Boolean} True if style is active, false otherwise.
         */
        isActive: function() {
            var result;

            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            result = this.getStyle().checkActive(elementPath, editor);

            return result;
        }
    };

    AlloyEditor.ButtonStyle = ButtonStyle;
}());