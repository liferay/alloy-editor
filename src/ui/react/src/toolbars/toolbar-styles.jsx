(function () {
    'use strict';

    var linkSwitch = 0;

    var ToolbarStyles = React.createClass({
        getInitialState: function() {
            return {
                currentSelection: global.SelectionTypes[linkSwitch],
                className: 'alloy-editor-toolbar-styles alloy-editor-hide'
            };
        },

        componentDidMount: function() {
            var self = this;

            this.props.editor.get('nativeEditor').on('editorInteraction', this._onEditorInteraction, this);

            var currentSelection = global.SelectionTypes[linkSwitch];

            self.setState({
                currentSelection: currentSelection
            });
        },

        componentDidUnmount: function() {
            clearInterval(this._interval);

            this.props.editor.get('nativeEditor').removeListener('editorInteraction', this._onEditorInteraction, this);
        },

        render: function() {
            var self = this;

            var buttons = this.state.currentSelection.buttons.map(function(button) {
                return React.createElement(button, {
                    selectionType: self.state.currentSelection.name,
                    key: button.key
                });
            });

            return (
                <div className={this.state.className}>
                    <div className="alloy-editor-buttons-container">
                        {buttons}
                    </div>
                </div>
            );
        },

        _onEditorInteraction: function(event) {
            console.log(event);
        }
    });

    global.Toolbars.styles = global.ToolbarStyles = ToolbarStyles;
}());