(function () {
    'use strict';

    /**
     * The ToolbarAdd class provides functionality for adding content to the editor.
     *
     * @class ToolbarAdd
     */
    var ToolbarAdd = React.createClass({
        mixins: [global.WidgetExclusive, global.WidgetFocusManager, global.ToolbarButtons, global.WidgetPosition, global.WidgetArrowBox],

        /**
         * Allows validating props being passed to the component.
         * @type {Object}
         */
        propTypes: {
            gutterExclusive: React.PropTypes.object
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'add'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-button',
                gutterExclusive: {
                    left: 10,
                    top: 0
                },
                keys: {
                    next: [38, 39],
                    prev: [37, 40]
                }
            };
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         *
         * @param {provProps} prevProps The previous state of the component's properties.
         * @param {[type]} prevState The previous component's state.
         */
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

                    this.cancelAnimation();
                }
            }
        },

        /**
         * Requests exclusive rendering and displays the buttons for adding content.
         */
        handleClick: function() {
            this.props.requestExclusive(ToolbarAdd.key);
        },

        /**
         * Lifecycle. Renders the buttons for adding content.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var buttons = this._getButtons();
            var className = this._getToolbarClassName();

            return (
                <div className={className} onFocus={this.focus} onKeyDown={this.handleKey}>
                    <div className="alloy-editor-container">
                        {buttons}
                    </div>
                </div>
            );
        },

        /**
         * Returns a list of buttons that will eventually render to HTML.
         *
         * @protected
         * @return {Object} The buttons which have to be rendered.
         */
        _getButtons: function() {
            var buttons;

            if (this.props.renderExclusive) {
                buttons = this.getToolbarButtons(this.props.config.buttons);
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

        /**
         * Returns the class name of the toolbar in case of both exclusive and normal mode.
         *
         * @protected
         * @return {String} The class name which have to be applied to the DOM element.
         */
        _getToolbarClassName: function() {
            return this.props.renderExclusive ? 'alloy-editor-toolbar' : 'alloy-editor-toolbar-add';
        }
    });

    global.AlloyEditor.Toolbars[ToolbarAdd.key] = global.AlloyEditor.ToolbarAdd = ToolbarAdd;
}());