(function () {
    'use strict';

    var ToolbarStyles = React.createClass({
        getInitialState: function() {
            return {
                currentSelection: null
            };
        },

        componentDidMount: function() {
            this.props.editor.get('nativeEditor').on('editorInteraction', this._onEditorInteraction, this);
        },

        componentDidUnmount: function() {
            // Subscribe to onEditorInteraction event and show/hide the toolbar if some of the
            // selection types returns true
            this.props.editor.get('nativeEditor').removeListener('editorInteraction', this._onEditorInteraction, this);
        },

        render: function() {
            var className = this._getToolbarClassName();
            var buttons = this._getToolbarButtons();

            return (
                <div className={className}>
                    <div className="alloy-editor-buttons-container">
                        {buttons}
                    </div>
                </div>
            );
        },

        _getToolbarButtons: function() {
            var buttons;

            if (this.state.currentSelection) {
                buttons = this.state.currentSelection.buttons.map(function(button) {
                    return React.createElement(button, {
                        key: button.key,
                        selectionType: this.state.currentSelection.name
                    });
                }, this);
            }

            return buttons;
        },

        _getToolbarClassName: function() {
            var className = 'alloy-editor-toolbar alloy-editor-toolbar-styles';

            if (!this.state.currentSelection) {
                className += ' alloy-editor-hide';
            }

            return className;
        },

        _onEditorInteraction: function(event) {
            // Check each selection type and if some match, stop cycling and show the toolbar with the
            // respective buttons

            var selectionType;

            global.SelectionTypes.some(function(item) {
                var result = item.test(event.data, this.props.editor);

                if (result) {
                    selectionType = item;
                }

                this._eventData = event.data;

                return result;
            }, this);

            this.setState({
                currentSelection: selectionType
            });
        }
    });

    global.Toolbars.styles = global.ToolbarStyles = ToolbarStyles;
}());