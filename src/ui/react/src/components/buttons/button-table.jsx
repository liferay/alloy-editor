(function () {
    'use strict';

    /**
     * The ButtonTable class provides functionality for creating and editing a table in a document. ButtonTable
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonTableEdit UI with all the table edition controls.
     *
     * @class ButtonTable
     */
    var ButtonTable = React.createClass({
        mixins: [global.ButtonStateClasses],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'table'
        },

        /**
         * Checks if the current selection is contained within a table.
         *
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive: function() {
            var table;
            var nativeEditor = this.props.editor.get('nativeEditor');
            var selection = nativeEditor.getSelection();
            var selected = selection.getSelectedElement();

            if (selected && selected.is('table')) {
                table = selected;
            } else {
                var ranges = selection.getRanges();

                if (ranges.length > 0) {
                    // Webkit could report the following range on cell selection (#4948):
                    // <table><tr><td>[&nbsp;</td></tr></table>]
                    if (CKEDITOR.env.webkit) {
                        ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                    }

                    table = nativeEditor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
                }
            }

            return !!table;
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <global.AlloyEditor.ButtonTableEdit {...this.props} />
                );
            } else {
                return (
                    <button className="alloy-editor-button" data-type="button-table" onClick={this.props.requestExclusive} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-table"></span>
                    </button>
                );
            }
        }
    });

    global.AlloyEditor.Buttons[ButtonTable.key] = global.AlloyEditor.ButtonTable = ButtonTable;
}());