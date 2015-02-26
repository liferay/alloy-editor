(function() {
    'use strict';

    var ToolbarButtons = {
        mixins: [global.WidgetExclusive],

        /**
         * Analyzes the current selection and the buttons exclusive mode value to figure out which
         * buttons should be present in a given state.
         *
         * @protected
         * @param {Array} buttons The buttons could be shown, prior to the state filtering.
         * @param {Object} additionalProps Additional props that should be passed down to the buttons.
         * @return {Array} An Array which contains the buttons that should be rendered.
         */
        _getToolbarButtons: function(buttons, additionalProps) {
            var toolbarButtons = this.filterExclusive(
                buttons.filter(function(button) {
                    return (global.Lang.isString(button) ? global.AlloyEditor.Buttons[button] : button);
                })
                .map(function(button) {
                    return global.Lang.isString(button) ? global.AlloyEditor.Buttons[button] : button;
                })
            )
            .map(function(button) {
                var props = this.mergeExclusiveProps({
                    editor: this.props.editor,
                    key: button.key
                }, button.key);

                if (additionalProps) {
                    props = CKEDITOR.tools.merge(props, additionalProps);
                }

                return React.createElement(button, props);
            }, this);

            return toolbarButtons;
        }
    };

    global.ToolbarButtons = ToolbarButtons;
}());