(function () {
    'use strict';

    var ToolbarAdd = React.createClass({
        mixins: [global.WidgetExclusive, global.ToolbarButtons, global.WidgetPosition, global.WidgetArrowBox],

        propTypes: {
            gutterExclusive: React.PropTypes.object
        },

        statics: {
            key: 'add'
        },

        getDefaultProps: function() {
            return {
                gutterExclusive: {
                    left: 10,
                    top: 0
                }
            };
        },

        componentDidUpdate: function (prevProps, prevState) {
            var region;

            if (!this.props.renderExclusive) {
                if (this.props.selectionData) {
                    region = this.props.selectionData.region;
                }

                if (region) {
                    var domNode = this.getDOMNode();
                    var domElement = new CKEDITOR.dom.element(domNode);

                    var left = this.props.editor.get('nativeEditor').editable().getClientRect().left;

                    domNode.style.left = left - domNode.offsetWidth - this.props.gutterExclusive.left + 'px';
                    domNode.style.top = region.top - domNode.offsetHeight/2 + region.startRect.height/2 + 'px';
                    domNode.style.opacity = 1;

                    domElement.removeClass('alloy-editor-arrow-box');

                    this._cancelAnimation();
                }
            }
        },

        handleClick: function() {
            this.props.requestExclusive(ToolbarAdd.key);
        },

        render: function() {
            var buttons = this._getButtons();
            var className = this._getToolbarClassName();

            return (
                <div className={className}>
                    <div className="alloy-editor-container">
                        {buttons}
                    </div>
                </div>
            );
        },

        _getButtons: function() {
            var buttons;

            if (this.props.renderExclusive) {
                buttons = this._getToolbarButtons(this.props.config.buttons);
            } else {
                if (this.props.selectionData && this.props.selectionData.region) {
                    buttons = (
                        <button className="alloy-editor-button alloy-editor-button-add" onClick={this.handleClick}>
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
        },

        _getToolbarClassName: function() {
            return this.props.renderExclusive ? 'alloy-editor-toolbar' : 'alloy-editor-toolbar-add';
        }
    });

    global.AlloyEditor.Toolbars[ToolbarAdd.key] = global.AlloyEditor.ToolbarAdd = ToolbarAdd;
}());