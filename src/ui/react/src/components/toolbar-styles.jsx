(function () {
    'use strict';

    var ToolbarStyles = React.createClass({
        mixins: [global.ToolbarPosition, global.WidgetExclusive],

        propTypes: {
            gutter: React.PropTypes.object
        },

        statics: {
            key: 'styles'
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
                itemExclusive: null,
                currentSelection: null
            };
        },

        componentDidMount: function() {
            this._updateToolbarPosition();
        },

        componentDidUpdate: function(prevProps, prevState) {
            // Chrome needs setTimeout otherwise offsetWidth of the toolbar DOM node
            // is being returned wrongly the first time
            setTimeout(this._updateToolbarPosition, 0);
        },

        componentWillMount: function () {
            this._setCurrentSelection(this.props);
        },

        componentWillReceiveProps: function(nextProps) {
            this._setCurrentSelection(nextProps);
        },

        render: function() {
            if (this.state.currentSelection) {
                var buttons = this._getToolbarButtons();
                var className = this._getToolbarClassName();

                return (
                    <div className={className}>
                        <div className="alloy-editor-container">
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
                buttons = this.filterExclusive(
                    this.state.currentSelection.buttons.filter(function(button) {
                        return (global.Lang.isString(button) ? global.AlloyEditor.Buttons[button] : button);
                    })
                    .map(function(button) {
                        return global.Lang.isString(button) ? global.AlloyEditor.Buttons[button] : button;
                    })
                )
                .map(function(button) {
                    var props = this.mergeExclusiveProps({
                        editor: this.props.editor,
                        key: button.key,
                        selectionType: this.state.currentSelection.name
                    }, button.key);

                    return React.createElement(button, props);
                }, this);
            }

            return buttons;
        },

        _getToolbarClassName: function() {
            var className = 'alloy-editor-toolbar-styles alloy-editor-arrow-box';

            if (this.state.interactionPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                className += ' alloy-editor-arrow-box-top';
            } else {
                className += ' alloy-editor-arrow-box-bottom';
            }

            return className;
        },

        _setCurrentSelection: function(props) {
            var selection;
            var interactionPoint;

            var eventPayload = props.editorEvent ? props.editorEvent.data : null;

            if (!eventPayload) {
                return;
            }

            props.config.selections.some(function(item) {
                var result = item.test(eventPayload, props.editor);

                if (result) {
                    selection = item;

                    interactionPoint = this.getInteractionPoint(eventPayload.selectionData, {
                        x: eventPayload.nativeEvent.pageX,
                        y: eventPayload.nativeEvent.pageY
                    });
                }

                return result;
            }, this);

            this.setState({
                currentSelection: selection,
                interactionPoint: interactionPoint,
                itemExclusive: null
            });
        },

        // TODO: Move the emotion out of here and apply it to all Toolbars
        _updateToolbarPosition: function() {
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
                var interactionPoint = this.state.interactionPoint;

                var xy = this.getToolbarXYPoint(interactionPoint.x, interactionPoint.y, interactionPoint.direction);

                if (window.requestAnimationFrame) {
                    var y;

                    if (interactionPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                        y = this.props.selectionData.region.bottom;
                    } else {
                        y = this.props.selectionData.region.top;
                    }

                    var offsetWidth = domNode.offsetWidth;

                    domElement.setStyles({
                        left: interactionPoint.x - offsetWidth/2 + 'px',
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
        }
    });

    global.AlloyEditor.Toolbars[ToolbarStyles.key] = global.AlloyEditor.ToolbarStyles = ToolbarStyles;
}());