(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     *
     * @class UI
     */
    var UI = React.createClass({
        mixins: [AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Localized messages for live aria updates. Should include the following messages:
             * - noToolbar: Notification for no available toolbar in the editor.
             * - oneToolbar: Notification for just one available toolbar in the editor.
             * - manyToolbars: Notification for more than one available toolbar in the editor.
             *
             * @property {Object} ariaUpdates
             */
            ariaUpdates: React.PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The delay (ms), after which key or mouse events will be processed.
             *
             * @property {Number} eventsDelay
             */
            eventsDelay: React.PropTypes.number,

            /**
             * The toolbars configuration for this editor instance
             *
             * @property {Object} toolbars
             */
            toolbars: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @method getInitialState
         */
        getInitialState: function() {
            return {
                hidden: false
            };
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '[class^=ae-toolbar-]',
                eventsDelay: 0,
                keys: {
                    next: 9
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @method componentDidMount
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

            // It is not easy to debounce _setUIHidden on mousedown, because if we
            // debounce it, when the handler is being invoked, the target might be no more part
            // of the editor's UI - onActionPerformed causes re-render.
            this._mousedownListener = function (event) {
                this._setUIHidden(event.target);
            }.bind(this);

            this._keyDownListener = CKEDITOR.tools.debounce(function(event) {
                this._setUIHidden(document.activeElement);
            }, this.props.eventsDelay, this);

            editor.once('contentDom', function() {
                document.addEventListener('mousedown', this._mousedownListener);
                document.addEventListener('keydown', this._keyDownListener);
            }.bind(this));
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * Fires 'ariaUpdate' event passing ARIA related messages.
         *
         * @method componentDidUpdate
         */
        componentDidUpdate: function (prevProps, prevState) {
            var domNode = React.findDOMNode(this);

            if (domNode) {
                this.props.editor.get('nativeEditor').fire('ariaUpdate', {
                    message: this._getAvailableToolbarsMessage(domNode)
                });
            }
        },

        _getAriaUpdateTemplate: function(ariaUpdate) {
            if (!this._ariaUpdateTemplates) {
                this._ariaUpdateTemplates = {};
            }

            if (!this._ariaUpdateTemplates[ariaUpdate]) {
                this._ariaUpdateTemplates[ariaUpdate] = new CKEDITOR.template(this._getAriaUpdates()[ariaUpdate]);
            }

            return this._ariaUpdateTemplates[ariaUpdate];
        },

        /**
         * Returns the templates for ARIA messages.
         *
         * @protected
         * @method _getAriaUpdates
         * @return {Object} ARIA relates messages. Default:
         * {
         *      noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
         *      oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
         *      manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
         *  }
         */
        _getAriaUpdates: function() {
            return this.props.ariaUpdates || {
                noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
                oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
                manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
            };
        },

        /**
         * Returns an ARIA message which represents the number of currently available toolbars.
         *
         * @method _getAvailableToolbarsMessage
         * @protected
         * @param {CKEDITOR.dom.element} domNode The DOM node from which the available toolbars will be retrieved.
         * @return {String} The ARIA message for the number of available toolbars
         */
        _getAvailableToolbarsMessage: function(domNode) {
            var toolbarsNodeList = domNode.querySelectorAll('[role="toolbar"]');

            if (!toolbarsNodeList.length) {
                return this._getAriaUpdates().noToolbar;
            } else {
                var toolbarNames = Array.prototype.slice.call(toolbarsNodeList).map(function(toolbar) {
                    return toolbar.getAttribute('aria-label');
                });

                var ariaUpdate = toolbarNames.length === 1 ? 'oneToolbar' : 'manyToolbars';

                return this._getAriaUpdateTemplate(ariaUpdate).output({
                    toolbars: toolbarNames.join(',').replace(/,([^,]*)$/, ' and ' + '$1')
                });
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function() {
            if (this._mousedownListener) {
                document.removeEventListener('mousedown', this._mousedownListener);
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
         * @method render
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
                    onDismiss: this._onDismissToolbarFocus,
                    selectionData: this.state.selectionData
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            return (
                <div className="ae-toolbars" onKeyDown={this.handleKey}>
                    {toolbars}
                </div>
            );
        },

        /**
         * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
         *
         * @protected
         * @method _onActionPerformed
         * @param {SynteticEvent} event The provided event
         */
        _onActionPerformed: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();

            this.setState({
                itemExclusive: null,
                selectionData: editor.getSelectionData()
            });
        },

        /**
         * Executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
         *
         * @protected
         * @method _onDismissToolbarFocus
         */
        _onDismissToolbarFocus: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();
        },

        /**
         * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
         * provides it via component's state property.
         *
         * @protected
         * @method _onEditorInteraction
         * @param {SynteticEvent} event The provided event
         */
        _onEditorInteraction: function(event) {
            this.setState({
                editorEvent: event,
                hidden: false,
                itemExclusive: null,
                selectionData: event.data.selectionData
            });
        },

        /**
         * Focuses on the active toolbar when the combination ALT+F10 is pressed inside the editor.
         *
         * @protected
         * @method _onEditorKey
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
         * @protected
         * @method _setUIHidden
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