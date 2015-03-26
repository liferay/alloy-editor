(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonEditLink class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @class ButtonLinkEdit
     */
    var ButtonLinkEdit = React.createClass({
        mixins: [global.WidgetClickOutside],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'linkEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing.
         */
        componentDidMount: function () {
            // We need to wait for the next rendering cycle before focusing to avoid undesired
            // scrolls on the page
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this._focusLinkInput);
            } else {
                setTimeout(this._focusLinkInput, 0);
            }
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         */
        getInitialState: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';

            return {
                element: link,
                linkHref: href
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            return (
                <div className="alloy-editor-container-edit-link">
                    <button aria-label="Cancel" className="alloy-editor-button" disabled={!this.state.element} onClick={this._removeLink}>
                        <span className="alloy-editor-icon-unlink"></span>
                    </button>
                    <div className="alloy-editor-container-input">
                        <input className="alloy-editor-input" onChange={this._handleLinkChange} onKeyDown={this._handleKeyDown} placeholder="Type or paste link here" ref="linkInput" type="text" value={this.state.linkHref}></input>
                        <button className="alloy-editor-button alloy-editor-icon-remove" onClick={this._clearLink} style={clearLinkStyle}></button>
                    </div>
                    <button aria-label="Confirm" className="alloy-editor-button" disabled={!this.state.linkHref} onClick={this._updateLink}>
                        <span className="alloy-editor-icon-ok"></span>
                    </button>
                </div>
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @protected
         * @method _clearLink
         */
        _clearLink: function() {
            this.setState({
                linkHref: ''
            });
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @protected
         * @method _focusLinkInput
         */
        _focusLinkInput: function() {
            React.findDOMNode(this.refs.linkInput).focus();
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @param {SyntheticEvent} event The keyboard event.
         *
         * @protected
         * @method _handleKeyDown
         */
        _handleKeyDown: function(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._updateLink();
            } else if (event.keyCode === KEY_ESC) {
                this.props.cancelExclusive();
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @param {SyntheticEvent} event The change event.
         *
         * @protected
         * @method _handleLinkChange
         */
        _handleLinkChange: function(event) {
            this.setState({
                linkHref: event.target.value
            });
        },

        /**
         * Removes the link in the editor element.
         *
         * @protected
         * @method _removeLink
         */
        _removeLink: function() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);
            var selection = editor.getSelection();
            var bookmarks = selection.createBookmarks();

            linkUtils.remove(this.state.element);

            selection.selectBookmarks(bookmarks);

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Updates the link in the editor element. If the element didn't exist previously, it will
         * create a new <a> element with the href specified in the link input.
         *
         * @protected
         * @method _updateLink
         */
        _updateLink: function() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);

            if (this.state.linkHref) {
                if (this.state.element) {
                    linkUtils.update(this.state.linkHref, this.state.element);
                } else {
                    linkUtils.create(this.state.linkHref);
                }

                editor.fire('actionPerformed', this);
            }

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        }
    });

    global.AlloyEditor.Buttons[ButtonLinkEdit.key] = global.AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
}());