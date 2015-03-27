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
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            cancelExclusive: React.PropTypes.func.isRequired,
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableEdit'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         */
        getDefaultProps: function () {
            return {
                tableAttributes: {
                    border: 1,
                    cellPadding: 0,
                    cellSpacing: 0,
                    style: 'width: 100%'
                }
            };
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
                cols: 3,
                rows: 3
            };
        },

        /**
         * Creates a table.
         *
         * @protected
         * @method _createTable
         */
        _createTable: function() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.create({
                attrs: this.props.tableAttributes,
                cols: this.state.cols,
                rows: this.state.rows
            });

            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
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

            return (
                <div className="alloy-editor-container-edit-table">
                    <label htmlFor={rowsId}>Rows</label>
                    <div className="alloy-editor-container-input small">
                        <input className="alloy-editor-input" id={rowsId} onChange={this._handleChange.bind(this, 'rows')} min="1" onKeyDown={this._handleKeyDown} placeholder="Rows" ref="rows" type="number" value={this.state.rows}></input>
                    </div>

                    <label htmlFor={colsId}>Cols</label>
                    <div className="alloy-editor-container-input small">
                        <input className="alloy-editor-input" id={colsId} onChange={this._handleChange.bind(this, 'cols')} min="1" onKeyDown={this._handleKeyDown} placeholder="Colums" ref="cols" type="number" value={this.state.cols}></input>
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