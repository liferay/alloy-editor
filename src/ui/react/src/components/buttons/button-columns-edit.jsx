(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    var ButtonColumnsEdit = React.createClass({
        // Allows validating props being passed to the component.
        propTypes: {

            /**
             * Method to notify the button abandons the exclusive rendering mode.
             *
             * @property {Function} cancelExclusive
             */
            cancelExclusive: React.PropTypes.func.isRequired,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableEdit
             */
            key: 'columnsEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing.
         *
         * @method componentDidMount
         */
        componentDidMount: function () {
            ReactDOM.findDOMNode(this.refs.cols).focus();
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @method getInitialState
         */
        getInitialState: function() {
            return {
                cols: 3
            };
        },

        /**
         * Creates a table.
         *
         * @protected
         * @method _createTable
         */
        _createColumns: function() {
            var nativeEditor = this.props.editor.get('nativeEditor');

            nativeEditor.execCommand('addColumns', {
                how_many: this.state.cols
            });
			
            this.props.cancelExclusive();

            nativeEditor.fire('actionPerformed', this);
        },

        /**
         * Handles a change in input value. Sets the provided value from the user back to the input.
         *
         * @protected
         * @method _handleChange
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
         * @protected
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
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
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var time = Date.now();
            var colsId = time + 'cols';

            return (
                <div className="ae-container-edit-table">
                    <label htmlFor={colsId}>Columns</label>
                    <div className="ae-container-input small">
                        <input className="ae-input" id={colsId} onChange={this._handleChange.bind(this, 'cols')} min="2" max="4" onKeyDown={this._handleKeyDown} placeholder="Colums" ref="cols" type="number" value={this.state.cols}></input>
                    </div>

                    <button aria-label="Confirm" className="ae-button" onClick={this._createColumns}>
                        <span className="ae-icon-ok"></span>
                    </button>
                </div>
            );
        }
    });

    AlloyEditor.Buttons[ButtonColumnsEdit.key] = AlloyEditor.ButtonColumnsEdit = ButtonColumnsEdit;
}());