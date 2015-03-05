(function () {
    'use strict';

    /**
     * The ButtonEditLink class provides functionality for creating and editing a link in a document.
     * This is more than a button, and renders all the required UI to CRUD a link.
     *
     * @class ButtonEditLink
     */
    var ButtonEditLink = React.createClass({
        mixins: [React.addons.LinkedStateMixin, global.WidgetClickOutside],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'editlink'
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         */
        getInitialState: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection(),
                href = link ? link.getAttribute('href') : '';

            return {
                element: link,
                linkHref: href
            };
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
         * Removes the link in the editor element.
         *
         * @protected
         * @method _removeLink
         */
        _removeLink: function() {
            var editor = this.props.editor.get('nativeEditor'),
                linkUtils = new CKEDITOR.Link(editor),
                selection = editor.getSelection(),
                bookmarks = selection.createBookmarks();

            linkUtils.remove(this.state.element);

            selection.selectBookmarks(bookmarks);

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
        _udpateLink: function() {
            var editor = this.props.editor.get('nativeEditor'),
                linkUtils = new CKEDITOR.Link(editor);

            if (this.state.element) {
                linkUtils.update(this.state.linkHref, this.state.element);
            } else {
                linkUtils.create(this.state.linkHref);
            }

            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var linkHref = this.linkState('linkHref'),
                disabledActions = linkHref.value === '',
                clearLinkStyle = { opacity: disabledActions ? 0 : 1};

            return (
                <div className="alloy-editor-container">
                    <button aria-label="Cancel" className="alloy-editor-button" disabled={!this.state.element} onClick={this._removeLink}>
                        <span className="alloy-editor-icon-unlink"></span>
                    </button>
                    <div className="alloy-editor-container-input">
                        <input className="alloy-editor-input" placeholder="Type or paste link here" type="text" valueLink={linkHref}></input>
                        <span className="alloy-editor-button alloy-editor-icon-remove" onClick={this._clearLink} style={clearLinkStyle}></span>
                    </div>
                    <button aria-label="Confirm" className="alloy-editor-button" disabled={disabledActions} onClick={this._udpateLink}>
                        <span className="alloy-editor-icon-ok"></span>
                    </button>
                </div>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonEditLink.key] = global.AlloyEditor.ButtonEditLink = ButtonEditLink;
}());