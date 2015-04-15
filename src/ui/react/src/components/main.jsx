(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @class UI
     */
    var UI = React.createClass({
        mixins: [AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager],

        /**
         * Lifecycle. Invoked once before the component is mounted.
         */
        getInitialState: function() {
            return {
                hidden: false
            };
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '[class*=alloy-editor-toolbar-]',
                eventsDelay: 0,
                keys: {
                    next: 9
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         */
        componentDidMount: function () {
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
            editor.on('key', this._onEditorKey, this);

            // Set up events for hiding the UI when user stops interacting with the editor.
            // This may happen when he just clicks outside of the editor. However,
            // this does not include a situation when he clicks on some button, part of
            // editor's UI.

            // It is not easy to debounce _setUIHidden on click, because if we
            // debounce it, when the handler is being invoked, the target may be no more part
            // of the editor's UI - onActionPerformed causes re-render.
            this._clickListener = function (event) {
                this._setUIHidden(event.target);
            }.bind(this);

            this._keyDownListener = CKEDITOR.tools.debounce(function(event) {
                this._setUIHidden(document.activeElement);
            }, this.props.eventsDelay, this);

            document.addEventListener('click', this._clickListener);
            document.addEventListener('keydown', this._keyDownListener);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function() {
            if (this._clickListener) {
                document.removeEventListener('click', this._clickListener);
            }

            if (this._keyDownListener) {
                this._keyDownListener.detach();
                document.removeEventListener('keydown', this._keyDownListener);
            }
        },

        /**
         * Lifecycle. Renders the UI of the editor. This may include several toolbars and buttons.
         * The editor's UI also takes care of rendering the items in exclusive mode.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.state.hidden) {
                return null;
            }

            var toolbars = Object.keys(this.props.toolbars).map(function(toolbar) {
                return AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });

            toolbars = this.filterExclusive(toolbars).map(function(toolbar) {
                var props = this.mergeExclusiveProps({
                    config: this.props.toolbars[toolbar.key],
                    editor: this.props.editor,
                    editorEvent: this.state.editorEvent,
                    key: toolbar.key,
                    selectionData: this.state.selectionData,
                    selections: this.props.selections,
                    trigger: this.state.trigger
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            return (
                <div className="alloy-editor-toolbars" onKeyDown={this.handleKey}>
                    {toolbars}
                </div>
            );
        },

        /**
         * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
         *
         * @protected
         * @param {SynteticEvent} event The provided event
         */
        _onActionPerformed: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();

            this.setState({
                itemExclusive: null,
                selectionData: editor.getSelectionData(),
                trigger: event.data
            });
        },

        /**
         * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
         * provides it via component's state property.
         *
         * @protected
         * @param {SynteticEvent} event The provided event
         */
        _onEditorInteraction: function(event) {
            this.setState({
                editorEvent: event,
                hidden: false,
                itemExclusive: null,
                selectionData: event.data.selectionData,
                trigger: null
            });
        },

        /**
         * Focuses on the active toolbar when the combination ALT+F10 is pressed inside the editor.
         *
         * @protected
         */
        _onEditorKey: function(event) {
            var nativeEvent = event.data.domEvent.$;

            if (nativeEvent.altKey && nativeEvent.keyCode === 121) {
                this.focus();
            }
        },

        /**
         * Checks if the target with which the user interacted is part of editor's UI or it is
         * the editable area. If none of these, sets the state of editor's UI to be hidden.
         *
         * @param {DOMElement} target The DOM element with which user interacted lastly.
         */
        _setUIHidden: function(target) {
            var domNode = React.findDOMNode(this);

            if (domNode) {
                var editable = this.props.editor.get('nativeEditor').editable();
                var targetNode = new CKEDITOR.dom.node(target);

                var res = (editable.$ === target) || editable.contains(targetNode) ||
                    (new CKEDITOR.dom.element(domNode)).contains(targetNode);

                if (!res) {
                    this.setState({
                        hidden: true
                    });
                }
            }
        }
    });

    AlloyEditor.UI = UI;
}());