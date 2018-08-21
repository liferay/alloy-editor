(function() {
    'use strict';

    /**
     * ButtonActionStyle is a mixin that provides applying style implementation for a
     * button based on the `applyStyle` and `removeStyle` API of CKEDITOR.
     *
     * To execute properly, the component has to expose the following methods which can be obtained
     * out of the box using the {{#crossLink "ButtonStyle"}}{{/crossLink}} mixin:
     * - `Function` {{#crossLink "ButtonStyle/isActive"}}{{/crossLink}} to check the active state
     * - `Function` {{#crossLink "ButtonStyle/getStyle"}}{{/crossLink}} to return the style that should be applied
     *
     * @class ButtonActionStyle
     */
    var ButtonActionStyle = {
        /**
         * Removes or applies the component style to the current selection.
         *
         * @instance
         * @memberof ButtonActionStyle
         * @method applyStyle
         */
        applyStyle: function() {
            if (AlloyEditor.Lang.isFunction(this.isActive) && AlloyEditor.Lang.isFunction(this.getStyle)) {
                var editor = this.props.editor.get('nativeEditor');

                editor.getSelection().lock();

                if (this.isActive()) {
                    editor.removeStyle(this.getStyle());
                } else {
                    editor.applyStyle(this.getStyle());
                }

                editor.getSelection().unlock();

                editor.fire('actionPerformed', this);
            }
        }
    };

    AlloyEditor.ButtonActionStyle = ButtonActionStyle;
}());