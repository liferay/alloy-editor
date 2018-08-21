(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonEmbedEdit class provides functionality for creating and editing an embed link in a document.
     * Provides UI for creating and editing an embed link.
     *
     * @class ButtonEmbedEdit
     */
    var ButtonEmbedEdit = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonEmbedEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default embedEdit
             * @memberof ButtonEmbedEdit
             * @property {String} key
             * @static
             */
            key: 'embedEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method componentDidMount
         */
        componentDidMount: function () {
            if (this.props.renderExclusive || this.props.manualSelection) {
                // We need to wait for the next rendering cycle before focusing to avoid undesired
                // scrolls on the page
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(this._focusLinkInput);
                } else {
                    setTimeout(this._focusLinkInput, 0);
                }
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method getInitialState
         */
        getInitialState: function() {
            var editor = this.props.editor.get('nativeEditor');
            var embed;

            var selection = editor.getSelection();

            if (selection) {
                var selectedElement = selection.getSelectedElement();

                if (selectedElement) {
                    embed = selectedElement.findOne('[data-widget="ae_embed"]');
                }
            }

            var href = embed ? embed.getAttribute('data-ae-embed-url') : '';

            return {
                element: embed,
                initialLink: {
                    href: href
                },
                linkHref: href
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            return (
                <div className="ae-container-edit-link">
                    <button aria-label={AlloyEditor.Strings.deleteEmbed} className="ae-button" data-type="button-embed-remove" disabled={!this.state.element} onClick={this._removeEmbed} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.deleteEmbed}>
                        <span className="ae-icon-bin"></span>
                    </button>
                    <div className="ae-container-input xxl">
                        <input className="ae-input" onChange={this._handleLinkHrefChange} onKeyDown={this._handleKeyDown} placeholder={AlloyEditor.Strings.editLink} ref="linkInput" type="text" value={this.state.linkHref}></input>
                        <button aria-label={AlloyEditor.Strings.clearInput} className="ae-button ae-icon-remove" onClick={this._clearLink} style={clearLinkStyle} title={AlloyEditor.Strings.clear}></button>
                    </div>
                    <button aria-label={AlloyEditor.Strings.confirm} className="ae-button" disabled={!this._isValidState()} onClick={this._embedLink} title={AlloyEditor.Strings.confirm}>
                        <span className="ae-icon-ok"></span>
                    </button>
                </div>
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _clearLink
         * @protected
         */
        _clearLink: function() {
            this.setState({
                linkHref: ''
            });
        },

        /**
         * Triggers the embedUrl command to transform the link into an embed media object
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _embedLink
         * @protected
         */
        _embedLink: function() {
            var nativeEditor = this.props.editor.get('nativeEditor');

            nativeEditor.execCommand('embedUrl', {
                url: this.state.linkHref
            });

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _focusLinkInput
         * @protected
         */
        _focusLinkInput: function() {
            ReactDOM.findDOMNode(this.refs.linkInput).focus();
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         */
        _handleKeyDown: function(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._embedLink();
            } else if (event.keyCode === KEY_ESC) {
                var editor = this.props.editor.get('nativeEditor');

                // We need to cancelExclusive with the bound parameters in case the button is used
                // inside another in exclusive mode (such is the case of the link button)
                this.props.cancelExclusive();

                editor.fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         * @protected
         */
        _handleLinkHrefChange: function(event) {
            this.setState({
                linkHref: event.target.value
            });
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href that's different from the original one.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _isValidState
         * @protected
         * @return {Boolean} True if the state is valid, false otherwise
         */
        _isValidState: function() {
            var validState =
                this.state.linkHref && (
                    this.state.linkHref !== this.state.initialLink.href
                );

            return validState;
        },

        /**
         * Removes the embed in the editor element.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _removeEmbed
         * @protected
         */
        _removeEmbed: function() {
            var editor = this.props.editor.get('nativeEditor');

            var embedWrapper = this.state.element.getAscendant(function(element) {
                return element.hasClass('cke_widget_wrapper');
            });

            embedWrapper.remove();

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.Buttons[ButtonEmbedEdit.key] = AlloyEditor.ButtonEmbedEdit = ButtonEmbedEdit;
}());