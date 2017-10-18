(function () {
    'use strict';

    var POSITION_LEFT = 1;
    var POSITION_RIGHT = 2;

    /**
     * The ToolbarAdd class provides functionality for adding content to the editor.
     *
     * @class ToolbarAdd
     * @uses ToolbarButtons
     * @uses WidgetArrowBox
     * @uses WidgetDropdown
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     * @uses WidgetPosition
     */
    var ToolbarAdd = createReactClass({
        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The toolbar configuration.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} config
             */
            config: PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The payload from "editorInteraction" event
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} editorEvent
             */
            editorEvent: PropTypes.object,

            /**
             * The gutter to be applied to the widget when rendered in exclusive mode
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} gutterExclusive
             */
            gutterExclusive: PropTypes.object,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Provides a callback which should be executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Function} onDismiss
             */
            onDismiss: PropTypes.func,

            /**
             * Whether the Toolbar should be shown on left or on right of the editable area. Could be one of these:
             * - ToolbarAdd.left
             * - ToolbarAdd.right
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Enum} position
             */
            position: PropTypes.oneOf([POSITION_LEFT, POSITION_RIGHT]),

            /**
             * The data, returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} selectionData
             */
            selectionData: PropTypes.object
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default add
             * @memberof ToolbarAdd
             * @property {String} key
             * @static
             */
            key: 'add',

            /**
             * Defines the constant for positioning the Toolbar on left of the editable area.
             *
             * @default 1
             * @memberof ToolbarAdd
             * @property {String} left
             * @static
             */
            left: POSITION_LEFT,

            /**
             * Defines the constant for positioning the Toolbar on right of the editable area.
             *
             * @default 2
             * @memberof ToolbarAdd
             * @property {String} right
             * @static
             */
            right: POSITION_RIGHT
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.ae-button',
                gutterExclusive: {
                    left: 10,
                    top: 0
                },
                keys: {
                    dismiss: [27],
                    next: [39, 40],
                    prev: [37, 38]
                },
                position: POSITION_LEFT
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method componentDidMount
         */
        componentDidMount: function () {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method componentDidUpdate
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function (prevProps, prevState) {
            this._updatePosition();

            // In case of exclusive rendering, focus the first descendant (button)
            // so the user will be able to start interacting with the buttons immediately.
            if (this.props.renderExclusive) {
                this.focus();
            }
        },

        /**
         * Lifecycle. Renders the buttons for adding content or hides the toolbar
         * if user interacted with a non-editable element.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method render
         * @return {Object|null} The content which should be rendered.
         */
        render: function() {
            // Some operations such as `requestExclusive` may force editor to blur which will
            // invalidate the `props.editorEvent` stored value, without causing a `props` change.
            // For example, if the editor is empty, `ae_placeholder` plugin will remove
            // the target from the DOM and will prevent `add` toolbar from rendering.
            //
            // It should be safe to assume that if you have been able to render the toolbar
            // and request the exclusive mode, then rendering might be kept until the exclusive mode is left.
            if (!this.state.itemExclusive &&
                    this.props.editorEvent &&
                    this.props.editorEvent.data.nativeEvent.target &&
                    !this.props.editorEvent.data.nativeEvent.target.isContentEditable) {
                return null;
            }

            var buttons = this._getButtons();
            var className = this._getToolbarClassName();

            return (
                <div aria-label={AlloyEditor.Strings.add} className={className} data-tabindex={this.props.config.tabIndex || 0} onFocus={this.focus} onKeyDown={this.handleKey} role="toolbar" tabIndex="-1">
                    <div className="ae-container">
                        {buttons}
                    </div>
                </div>
            );
        },

        /**
         * Returns a list of buttons that will eventually render to HTML.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method _getButtons
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
                        <button aria-label={AlloyEditor.Strings.add} className="ae-button ae-button-add" onClick={this.props.requestExclusive.bind(this, ToolbarAdd.key)} title={AlloyEditor.Strings.add}>
                            <span className="ae-icon-add"></span>
                        </button>
                    );
                }
            }

            return buttons;
        },

        /**
         * Returns the class name of the toolbar in case of both exclusive and normal mode.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method _getToolbarClassName
         * @protected
         * @return {String} The class name which have to be applied to the DOM element.
         */
        _getToolbarClassName: function() {
            var cssClass = 'ae-toolbar-add';

            if (this.props.renderExclusive) {
                cssClass = 'ae-toolbar ' + this.getArrowBoxClasses();
            }

            return cssClass;
        },

        /**
         * Calculates and sets the position of the toolbar in exclusive or normal mode.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method _updatePosition
         * @protected
         */
        _updatePosition: function() {
            var region;

            // If component is not mounted, there is nothing to do
            if (!ReactDOM.findDOMNode(this)) {
                return;
            }

            if (this.props.renderExclusive) {
                this.updatePosition();
                this.show();
            } else {
                if (this.props.selectionData) {
                    region = this.props.selectionData.region;
                }

                if (region) {
                    var domNode = ReactDOM.findDOMNode(this);

                    var domElement = new CKEDITOR.dom.element(domNode);

                    var startRect = region.startRect || region;

                    var nativeEditor = this.props.editor.get('nativeEditor');

                    var clientRect = nativeEditor.editable().getClientRect();

                    var offsetLeft;

                    var position = this.props.config.position || this.props.position;

                    if (position === POSITION_LEFT) {
                        offsetLeft = clientRect.left - domNode.offsetWidth - this.props.gutterExclusive.left + 'px';
                    } else {
                        offsetLeft = clientRect.right + this.props.gutterExclusive.left + 'px';
                    }

                    domNode.style.left = offsetLeft;

                    domNode.style.top = Math.floor((region.bottom + region.top) / 2) + 'px';

                    if (nativeEditor.element.getStyle('overflow') !== 'auto') {
                        domNode.style.top = Math.floor(region.top - domNode.offsetHeight/2 + startRect.height/2) + 'px';
                    } else {
                        domNode.style.top = Math.floor( nativeEditor.element.$.offsetTop + (startRect.height / 2) - (domNode.offsetHeight / 2) ) + 'px';
                    }

                    domNode.style.opacity = 1;

                    domElement.removeClass('ae-arrow-box');

                    this.cancelAnimation();
                }
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarAdd.key] = AlloyEditor.ToolbarAdd = ToolbarAdd;
}());