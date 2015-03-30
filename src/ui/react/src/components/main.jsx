(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @class UI
     */
    var UI = React.createClass({
        mixins: [global.WidgetExclusive, global.WidgetFocusManager],

        propTypes: {
            circular: React.PropTypes.bool,
            descendants: React.PropTypes.string,
            documentInteractDelay: React.PropTypes.number,
            editor: React.PropTypes.object.isRequired,
            keys: React.PropTypes.object,
            toolbars: React.PropTypes.object.isRequired
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
                documentInteractDelay: 50,
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

            this._onDocInteractTask = CKEDITOR.tools.debounce(this._onDocInteract, this.props.documentInteractDelay, this);

            document.addEventListener('mousedown', this._onDocInteractTask);
            document.addEventListener('keydown', this._onDocInteractTask);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function () {
            this._onDocInteractTask.detach();

            document.removeEventListener('mousedown', this._onDocInteractTask);
            document.removeEventListener('keydown', this._onDocInteractTask);
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @param {Object} nextProps The new properties of the component.
         * @param {Object} nextState The new state of the component.
         * @return {Boolean} True if the component should update its UI, false otherwise
         */
        shouldComponentUpdate: function(nextProps, nextState) {
            // Prevent updating if the editor's UI starts to interact with the editor.
            // For example, this may happen when he clicks outside the editor and then
            // clicks inside. In this case there is no need to update, instead we will wait
            // for editorInteraction event to do the job.
            return !(this.state.hidden && !nextState.hidden);
        },

        /**
         * Lifecycle. Renders the UI of the editor. This may include several toolbars and buttons.
         * The editor's UI also takes care of rendering the items in exclusive mode.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var toolbars = Object.keys(this.props.toolbars).map(function(toolbar) {
                return global.AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });

            toolbars = this.filterExclusive(toolbars).map(function(toolbar) {
                var props = this.mergeExclusiveProps({
                    config: this.props.toolbars[toolbar.key],
                    editor: this.props.editor,
                    editorEvent: this.state.editorEvent,
                    key: toolbar.key,
                    selectionData: this.state.selectionData,
                    trigger: this.state.trigger
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            var className = 'alloy-editor-toolbars';

            if (this.state.hidden) {
                className += ' hidden';
            }

            return (
                <div className={className} onKeyDown={this.handleKey}>
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
                itemExclusive: null,
                selectionData: event.data.selectionData,
                editorEvent: event,
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
         * Check if the active element in the document is the editable area or it is
         * part of the editor's UI.
         *
         * @method _onDocInteract
         * @protected
         * @param {SynteticEvent} event The received event as result of user's interaction
         */
        _onDocInteract: function(event) {
            var nodeEl = new CKEDITOR.dom.element(React.findDOMNode(this));

            var targetNode = new CKEDITOR.dom.node(document.activeElement);
            var editable = this.props.editor.get('nativeEditor').editable();
            var hidden = !(editable.$ === document.activeElement || editable.contains(targetNode, true) ||
                nodeEl.contains(targetNode));

            this.setState({
                hidden: hidden
            });
        }
    });

    global.AlloyEditor.UI = UI;
}());