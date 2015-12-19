(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @class ButtonLinkEdit
     */
    var ButtonLinkEdit = React.createClass({
        mixins: [AlloyEditor.WidgetDropdown],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed values for the target attribute.
             *
             * @property {Array} allowedTargets
             */
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the link target selector should appear.
             *
             * @property {Boolean} showTargetSelector
             */
            showTargetSelector: React.PropTypes.bool
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default linkEdit
             */
            key: 'linkEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @method componentDidMount
         */
        componentDidMount: function () {
            if (this.props.renderExclusive) {
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
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                showTargetSelector: true
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @method getInitialState
         */
        getInitialState: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';
            var target = link ? link.getAttribute('target') : '';

            return {
                element: link,
                initialLink: {
                    href: href,
                    target: target
                },
                linkHref: href,
                linkTarget: target
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            var targetSelector;

            if (this.props.showTargetSelector) {
                var targetSelectorProps = {
                    allowedTargets: this._getAllowedTargetItems(),
                    editor: this.props.editor,
                    handleLinkTargetChange: this._handleLinkTargetChange,
                    onDismiss: this.props.toggleDropdown,
                    selectedTarget: this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault
                };

                targetSelectorProps = this.mergeDropdownProps(targetSelectorProps, AlloyEditor.ButtonLinkTargetEdit.key);

                targetSelector = <AlloyEditor.ButtonLinkTargetEdit {...targetSelectorProps} />;
            }

            return (
                <div className="ae-container-edit-link">
                    <button aria-label={AlloyEditor.Strings.removeLink} className="ae-button" disabled={!this.state.element} onClick={this._removeLink} title={AlloyEditor.Strings.remove}>
                        <span className="ae-icon-unlink"></span>
                    </button>
                    <div className="ae-container-input xxl">
                        {targetSelector}
                        <input className="ae-input" onChange={this._handleLinkHrefChange} onKeyUp={this._handleKeyUp} placeholder={AlloyEditor.Strings.editLink} ref="linkInput" type="text" value={this.state.linkHref}></input>
                        <button aria-label={AlloyEditor.Strings.clearInput} className="ae-button ae-icon-remove" onClick={this._clearLink} style={clearLinkStyle} title={AlloyEditor.Strings.clear}></button>
                    </div>
                    <button aria-label={AlloyEditor.Strings.confirm} className="ae-button" disabled={!this._isValidState()} onClick={this._updateLink} title={AlloyEditor.Strings.confirm}>
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
            ReactDOM.findDOMNode(this.refs.linkInput).focus();
        },

        /**
         * Returns an array of allowed target items. Each item consists of two properties:
         * - label - the label for the item, for example "_self (same tab)"
         * - value - the value that will be set for the link target attribute
         *
         * @method _getALlowedTargetItems
         * @protected
         * @return {Array<object>} An array of objects containing the allowed items.
         */
        _getAllowedTargetItems: function() {
            return this.props.allowedLinkTargets || [{
                label: AlloyEditor.Strings.linkTargetSelf,
                value: '_self'
            }, {
                label: AlloyEditor.Strings.linkTargetBlank,
                value: '_blank'
            }, {
                label: AlloyEditor.Strings.linkTargetParent,
                value: '_parent'
            }, {
                label: AlloyEditor.Strings.linkTargetTop,
                value: '_top'
            }];
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @protected
         * @method _handleKeyUp
         * @param {SyntheticEvent} event The keyboard event.
         */
        _handleKeyUp: function(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._updateLink();
            } else if (event.keyCode === KEY_ESC) {
                var editor = this.props.editor.get('nativeEditor');

                new CKEDITOR.Link(editor).advanceSelection();

                this.props.editor.get('nativeEditor').fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @protected
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         */
        _handleLinkHrefChange: function(event) {
            this.setState({
                linkHref: event.target.value
            });
        },

        /**
         * Updates the component state when the link target changes on user interaction.
         *
         * @protected
         * @method _handleLinkTargetChange
         * @param {SyntheticEvent} event The click event.
         */
        _handleLinkTargetChange: function(event) {
            this.setState({
                itemDropdown: null,
                linkTarget: event.target.getAttribute('data-value')
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

            linkUtils.remove(this.state.element, { advance: true });

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
            var linkAttrs = {
                target: this.state.linkTarget
            };
            var modifySelection = { advance: true };

            if (this.state.linkHref) {
                if (this.state.element) {
                    linkAttrs.href = this.state.linkHref;

                    linkUtils.update(linkAttrs, this.state.element, modifySelection);
                } else {
                    linkUtils.create(this.state.linkHref, linkAttrs, modifySelection);
                }

                editor.fire('actionPerformed', this);
            }

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href and that either that or the link target are different
         * from the original link.
         *
         * @protected
         * @method _isValidState
         * @return {Boolean} [description]
         */
        _isValidState: function() {
            var validState =
                this.state.linkHref && (
                    this.state.linkHref !== this.state.initialLink.href ||
                    this.state.linkTarget !== this.state.initialLink.target
                );

            return validState;
        }
    });

    AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
}());