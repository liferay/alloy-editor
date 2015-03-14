(function () {
    'use strict';

    /**
     * The ButtonTest class provides functionality for styling an selection with strong (Table) style.
     *
     * @class ButtonTest
     */
    var ButtonTest = React.createClass({
        mixins: [global.ButtonStateClasses],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'test'
        },

        handleClick: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand('rowInsertBefore');
            
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                <button className="alloy-editor-button" data-type="button-test" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-italic"></span>
                </button>
            );
        },

        _getCKTable: function() {
            if (this._ckTable) {
                return this._ckTable;
            } else {
                this._ckTable = new CKEDITOR.Table(this.props.editor.get('nativeEditor'));
                return this._ckTable;
            }
        }
    });

    global.AlloyEditor.Buttons[ButtonTest.key] = global.AlloyEditor.ButtonTest = ButtonTest;
}());