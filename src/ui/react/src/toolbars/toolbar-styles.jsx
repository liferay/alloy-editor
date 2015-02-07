(function () {
    'use strict';

    var linkSwitch = 1;

    var ToolbarStyles = React.createClass({
        getInitialState: function() {
            return {
                currentSelection: global.SelectionTypes[linkSwitch]
            };
        },

        componentDidMount: function() {
            var self = this;

            this.props.editor.get('nativeEditor').on('editorInteraction', this._onEditorInteraction, this);

            this._interval = setInterval(function() {
                if (linkSwitch === 1) {
                    linkSwitch = 0;
                } else {
                    ++linkSwitch;
                }

                var currentSelection = global.SelectionTypes[linkSwitch];

                self.setState({
                    currentSelection: currentSelection
                });
            }, 1000);
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
                <div className="alloy-editor-toolbar-styles">
                    <div className="buttons-container btn-group">
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