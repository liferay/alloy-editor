(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonTableEdit class provides functionality for creating and editing a table in a document.
     * Provides UI for creating a table.
     *
     * @class ButtonTableEdit
     */
    var ButtonTableEdit = React.createClass({
        mixins: [global.WidgetClickOutside],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'linkedit'
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing.
         */
        componentDidMount: function () {
            React.findDOMNode(this.refs.rows).focus();
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         */
        getInitialState: function() {
            return {
                border: 1,
                cellpadding: 1,
                cellspacing: 1,
                cols: 2,
                rows: 2,
                width: 500
            };
        },

        /**
         * Creates a table.
         *
         * @protected
         * @method _createTable
         */
        _createTable: function() {
            var ckTable = this._getCKTable();

            ckTable.create({
                attrs: {
                    border: this.state.border,
                    cellspacing: this.state.cellspacing,
                    cellpadding: this.state.cellpadding,
                    style: 'width: ' + this.state.width + 'px'
                },
                cols: this.state.cols,
                rows: this.state.rows
            });

            this.props.cancelExclusive();
        },

        /**
         * Retrieves a CKEDITOR.Table instance.
         *
         * @return {CKEDITOR.Table} Instance of CKEDITOR.Table utility class.
         */
        _getCKTable: function() {
            if (this._ckTable) {
                return this._ckTable;
            } else {
                this._ckTable = new CKEDITOR.Table(this.props.editor.get('nativeEditor'));
                return this._ckTable;
            }
        },

        /**
         * Handles a change in input value. Sets the provided value from the user back to the input.
         *
         * @protected
         * @param {String} inputName The name of the input which value should be updated.
         * @param {SyntheticEvent} event The provided event.
         */
        _handleChange: function(inputName, event) {
            var state = {};
            state[inputName] = event.target.value;

            this.setState(state);
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates the table.
         * - Escape: Discards the changes.
         *
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         * @method _handleKeyDown
         */
        _handleKeyDown: function(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._createTable();
            } else if (event.keyCode === KEY_ESC) {
                this.props.cancelExclusive();
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var time = Date.now();
            var rowsId = time + 'rows';
            var colsId = time + 'cols';
            var widthId = time + 'width';
            var borderId = time + 'border';
            var cellpaddingId = time + 'cellpadding';
            var cellspacingId = time + 'cellspacing';

            return (
                <div className="alloy-editor-container">
                    <div className="alloy-editor-container-input">
                        <label htmlFor={rowsId}>Rows</label>
                        <input className="alloy-editor-input" id={rowsId} onChange={this._handleChange.bind(this, 'rows')} onKeyDown={this._handleKeyDown} placeholder="Rows" ref="rows" type="text" value={this.state.rows}></input>

                        <label htmlFor={colsId}>Rows</label>
                        <input className="alloy-editor-input" id={colsId} onChange={this._handleChange.bind(this, 'cols')} onKeyDown={this._handleKeyDown} placeholder="Colums" ref="cols" type="text" value={this.state.cols}></input>

                        <label htmlFor={borderId}>Border</label>
                        <input className="alloy-editor-input" id={borderId} onChange={this._handleChange.bind(this, 'border')} onKeyDown={this._handleKeyDown} placeholder="Border" ref="border" type="text" value={this.state.border}></input>

                        <label htmlFor={widthId}>Width</label>
                        <input className="alloy-editor-input" id={widthId} onChange={this._handleChange.bind(this, 'width')} onKeyDown={this._handleKeyDown} placeholder="Width" ref="width" type="text" value={this.state.width}></input>

                        <label htmlFor={cellspacingId}>Cell spacing</label>
                        <input className="alloy-editor-input" id={cellspacingId} onChange={this._handleChange.bind(this, 'cellspacing')} onKeyDown={this._handleKeyDown} placeholder="Cell spacing" ref="cellspacing" type="text" value={this.state.cellspacing}></input>

                        <label htmlFor={cellpaddingId}>Cell padding</label>
                        <input className="alloy-editor-input" id={cellpaddingId} onChange={this._handleChange.bind(this, 'cellpadding')} onKeyDown={this._handleKeyDown} placeholder="Cell padding" ref="cellpadding" type="text" value={this.state.cellpadding}></input>
                    </div>
                    <button aria-label="Confirm" className="alloy-editor-button" onClick={this._createTable}>
                        <span className="alloy-editor-icon-ok"></span>
                    </button>
                </div>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonTableEdit.key] = global.AlloyEditor.ButtonTableEdit = ButtonTableEdit;
}());