(function () {
    'use strict';

    var ToolbarAdd = React.createClass({
        mixins: [global.ToolbarPosition, global.WidgetExclusive],

        propTypes: {
            gutter: React.PropTypes.object
        },

        statics: {
            key: 'add'
        },

        getDefaultProps: function() {
            return {
                gutter: {
                    left: 10,
                    top: 0
                }
            };
        },

        getInitialState: function() {
            return {
                itemExclusive: null
            };
        },

        componentDidUpdate: function (prevProps, prevState) {
            var region;

            if (this.props.renderExclusive) {
                console.log('move me please!');
            } else {
                if (this.props.selectionData) {
                    region = this.props.selectionData.region;
                }

                if (region) {
                    var left = this.props.editor.get('nativeEditor').editable().getClientRect().left;

                    var domNode = this.getDOMNode();

                    domNode.style.left = left - domNode.offsetWidth - this.props.gutter.left + 'px';
                    domNode.style.top = region.top - domNode.offsetHeight/2 + region.startRect.height/2 + 'px';
                }
            }
        },

        handleClick: function() {
            this.props.requestExclusive(ToolbarAdd.key);
        },

        render: function() {
            var buttons = this._getToolbarButtons();

            return (
                <div className="alloy-editor-toolbar alloy-editor-toolbar-add">
                    <div className="alloy-editor-buttons-container">
                        {buttons}
                    </div>
                </div>
            );
        },

        _getToolbarButtons: function() {
            var buttons;

            if (this.props.renderExclusive) {
                buttons = this.filterExclusive(
                    this.props.config.buttons.filter(function(button) {
                        return (global.Lang.isString(button) ? global.AlloyEditor.Buttons[button] : button);
                    })
                    .map(function(button) {
                        return global.Lang.isString(button) ? global.AlloyEditor.Buttons[button] : button;
                    })
                )
                .map(function(button) {
                    var props = this.mergeExclusiveProps({
                        editor: this.props.editor,
                        key: button.key
                    }, button.key);

                    return React.createElement(button, props);
                }, this);
            } else {
                if (this.props.selectionData && this.props.selectionData.region) {
                    buttons = (
                        <button className="alloy-editor-button" onClick={this.handleClick}>
                            <span className="alloy-editor-icon-add"></span>
                        </button>
                    );
                } else {
                    buttons = (
                        <div className="alloy-editor-hide" />
                    );
                }
            }

            return buttons;
        }
    });

    global.AlloyEditor.Toolbars[ToolbarAdd.key] = global.AlloyEditor.ToolbarAdd = ToolbarAdd;
}());