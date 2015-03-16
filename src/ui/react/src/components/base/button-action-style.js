(function () {
    'use strict';

    /**
     * ButtonActionStyle is a mixin that provides a handleClick implementation for a
     * button based on the `applyStyle` and `removeStyle` API of CKEDITOR.
     *
     * To execute properly, the component has to expose the following methods which can be obtained
     * out of the box using the ButtonStyle mixin:
     * - isActive: to check the active state
     * - getStyle: to return the style that should be applied
     *
     * The mixin exposes:
     * - {Function} handleClick: the function to attached to the button
     *
     * @class ButtonActionStyle
     */
    var ButtonActionStyle = {
        /**
         * Removes or applies style to a selection.
         */
        applyStyle: function() {
            if (global.Lang.isFunction(this.isActive) && global.Lang.isFunction(this.getStyle)) {
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

    global.ButtonActionStyle = ButtonActionStyle;
}());