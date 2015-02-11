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
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
        },

        componentDidUnmount: function() {
            // Subscribe to onEditorInteraction event and show/hide the toolbar if some of the
            // selection types returns true
            this.props.editor.get('nativeEditor').removeListener('editorInteraction', this._onEditorInteraction, this);
        },

        componentDidUpdate: function(prevProps, prevState) {
            var domNode = this.getDOMNode();
            var domElement = new CKEDITOR.dom.element(domNode);

            function applyTransitionClass() {
                domElement.addClass('alloy-editor-toolbar-transition');
            }

            function moveToolbar() {
                domElement.setStyles({
                    left: xy[0] + 'px',
                    top: xy[1] + 'px',
                    opacity: 1
                });
            }

            if (this.state.currentSelection) {
                var interationPoint = this.state.interationPoint;

                var xy = this.getToolbarXYPoint(interationPoint.x, interationPoint.y, interationPoint.direction);

                if (window.requestAnimationFrame) {
                    var y;

                    if (interationPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                        y = this.state.data.selectionData.region.bottom;
                    } else {
                        y = this.state.data.selectionData.region.top;
                    }

                    var offsetWidth = domNode.offsetWidth;

                    domElement.setStyles({
                        left: interationPoint.x - offsetWidth/2 + 'px',
                        opacity: 0,
                        top: y + 'px'
                    });

                    window.requestAnimationFrame(function() {
                        applyTransitionClass();
                        moveToolbar();
                    });
                } else {
                    moveToolbar();
                }
            }
        },

        render: function() {
            if (this.state.currentSelection) {
                var buttons = this._getToolbarButtons();
                var className = this._getToolbarClassName();

                return (
                    <div className={className}>
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
                        editor: this.props.editor,
                        key: button.key,
                        selectionType: this.state.currentSelection.name
                    });
                }, this);
            }

            return buttons;
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

        _onActionPerformed: function(event) {
            this.forceUpdate();
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
                data: event.data,
                interationPoint: interationPoint
            });
        }
    });

    global.Toolbars.styles = global.ToolbarStyles = ToolbarStyles;
}());