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

            this._interval = setInterval(function() {
                var currentSelection = SelectionTypes[linkSwitch];

                self.setState({
                    currentSelection: currentSelection
                });
            }, 100);
        },

        componentDidUnmount: function() {
            clearInterval(this._interval);
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
        }
    });

    global.Toolbars.styles = global.ToolbarStyles = ToolbarStyles;
}());