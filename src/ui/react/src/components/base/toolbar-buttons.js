(function() {
    'use strict';

    /**
     * ToolbarButtons is a mixin which provides a list of buttons which have to be
     * displayed on the current toolbar depending on user preferences and given state.
     *
     * @class ToolbarButtons
     */
    var ToolbarButtons = {
        /**
         * Analyzes the current selection and the buttons exclusive mode value to figure out which
         * buttons should be present in a given state.
         *
         * @param {Array} buttons The buttons could be shown, prior to the state filtering.
         * @param {Object} additionalProps Additional props that should be passed down to the buttons.
         * @return {Array} An Array which contains the buttons that should be rendered.
         */
        getToolbarButtons: function(buttons, additionalProps) {
            var buttonProps = {};

            var toolbarButtons = this.filterExclusive(
                buttons.filter(function(button) {
                    return button && (global.AlloyEditor.Buttons[button] || global.AlloyEditor.Buttons[button.name]);
                })
                .map(function(button) {
                    if (global.Lang.isString(button)) {
                        button = global.AlloyEditor.Buttons[button];
                    } else if (global.Lang.isString(button.name)) {
                        buttonProps[global.AlloyEditor.Buttons[button.name].key] = button.cfg;
                        button = global.AlloyEditor.Buttons[button.name];
                    }

                    return button;
                })
            )
            .map(function(button) {
                var props = this.mergeExclusiveProps({
                    editor: this.props.editor,
                    key: button.key,
                    tabKey: button.key,
                    tabIndex: (this.props.trigger && this.props.trigger.props.tabKey === button.key) ? 0 : -1,
                    trigger: this.props.trigger
                }, button.key);

                if (additionalProps) {
                    props = CKEDITOR.tools.merge(props, additionalProps, buttonProps[button.key]);
                }

                return React.createElement(button, props);
            }, this);

            return toolbarButtons;
        }
    };

    global.ToolbarButtons = ToolbarButtons;
}());