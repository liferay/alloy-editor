(function () {
    'use strict';

    var UI = React.createClass({
        mixins: [global.WidgetExclusive],

        getInitialState: function() {
            return {
                itemExclusive: null
            };
        },

        componentDidMount: function () {
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
        },

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

        _onActionPerformed: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            this.setState({
                selectionData: editor.getSelectionData()
            });
        },

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