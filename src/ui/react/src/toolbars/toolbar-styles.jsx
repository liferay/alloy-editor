(function () {
    'use strict';

    var ToolbarStyles = React.createClass({
        mixins: [global.ToolbarPosition],

        propTypes: {
            gutter: React.PropTypes.object
        },

        getDefaultProps: function() {
            return {
                gutter: {
                    left: 0,
                    top: 10
                }
            };
        },

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

        componentDidUpdate: function(prevProps, prevState) {
            if (this.state.interationPoint) {
                var interationPoint = this.state.interationPoint;

                var xy = this.getToolbarXYPoint(interationPoint.x, interationPoint.y, interationPoint.direction);

                var domNode = this.getDOMNode();

                domNode.style.left = xy[0] + 'px';
                domNode.style.top = xy[1] + 'px';
            }
        },

        render: function() {
            if (this.state.currentSelection) {
                var buttons = this._getToolbarButtons();
                var viewProperties = this._getViewProperties();

                return (
                    <div className={viewProperties.className}>
                        <div className="alloy-editor-buttons-container">
                            {buttons}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="alloy-editor-hide" />
                );
            }
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

        _getStyle: function() {
            var style = {
                left: this.state.interationPoint.x,
                top: this.state.interationPoint.y
            };

            return style;
        },

        _getToolbarClassName: function() {
            var className = 'alloy-editor-toolbar alloy-editor-toolbar-styles';

            if (this.state.interationPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                className += ' alloy-editor-arrow-box-top';
            } else {
                className += ' alloy-editor-arrow-box-bottom';
            }

            return className;
        },

        _getViewProperties: function() {
            var className = this._getToolbarClassName();
            var style = this._getStyle();

            return {
                className: className,
                style: style
            };
        },

        _onEditorInteraction: function(event) {
            var selection;
            var interationPoint;

            global.Selections.some(function(item) {
                var result = item.test(event.data, this.props.editor);

                if (result) {
                    selection = item;

                    interationPoint = this.getInteractionPoint(event.data.selectionData, {
                        x: event.data.nativeEvent.pageX,
                        y: event.data.nativeEvent.pageY
                    });
                }


                return result;
            }, this);

            this.setState({
                currentSelection: selection,
                interationPoint: interationPoint
            });
        }
    });

    global.Toolbars.styles = global.ToolbarStyles = ToolbarStyles;
}());