(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @class UI
     */
    var UI = React.createClass({
        mixins: [global.WidgetExclusive],

        /**
         * Lifecycle. Called automatically by React when a component is rendered
         */
        componentDidMount: function () {
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
        },

        /**
         * Lifecycle. Renders the UI of the editor. This may include several toolbars and buttons.
         * The editor's UI also takes care of rendering the items in exclusive mode.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var toolbars = Object.keys(this.props.toolbars).map(function(toolbar) {
                return global.AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });

            toolbars = this.filterExclusive(toolbars).map(function(toolbar) {
                var props = this.mergeExclusiveProps({
                    config: this.props.toolbars[toolbar.key],
                    editor: this.props.editor,
                    editorEvent: this.state.editorEvent,
                    key: toolbar.key,
                    selectionData: this.state.selectionData,
                    selections: this.props.selections
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            return (
                <div className="alloy-editor-toolbars">
                    {toolbars}
                </div>
            );
        },

        /**
         * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
         *
         * @protected
         * @param {SynteticEvent} event The provided event
         */
        _onActionPerformed: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();

            this.setState({
                selectionData: editor.getSelectionData()
            });
        },

        /**
         * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
         * provides it via component's state property.
         *
         * @protected
         * @param {SynteticEvent} event The provided event
         */
        _onEditorInteraction: function(event) {
            this.setState({
                itemExclusive: null,
                selectionData: event.data.selectionData,
                editorEvent: event
            });
        }
    });

    global.AlloyEditor.UI = UI;
}());