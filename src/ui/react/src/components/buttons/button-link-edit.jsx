(function () {
    'use strict';

    /**
     * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @class ButtonLinkEdit
     * @uses ButtonCfgProps
     * @uses WidgetDropdown
     * @uses WidgetFocusManager
     */
    var ButtonLinkEdit = createReactClass({
        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetFocusManager, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed values for the target attribute.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Array} allowedTargets
             */
            allowedTargets: PropTypes.arrayOf(PropTypes.object),

            /**
             * Indicate if we add http:// protocol to link or not
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Boolean} appendProtocol
             */
            appendProtocol: PropTypes.bool,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Default value of the link target attribute.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {String} defaultLinkTarget
             */
            defaultLinkTarget: PropTypes.string,

            /**
             * Indicates whether the link target selector should appear.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Boolean} showTargetSelector
             */
            showTargetSelector: PropTypes.bool,

            /**
             * List of items to be rendered as possible values for the link or a function, which is
             * supposed to retrieve the data. The function should return a Promise.
             * The returned items must be objects with at least two properties:
             * - title
             * - url
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Function|Array} data
             */
            data: PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.arrayOf(PropTypes.object)
            ])
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default linkEdit
             * @memberof ButtonLinkEdit
             * @property {String} key
             * @static
             */
            key: 'linkEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method componentDidMount
         */
        componentDidMount: function () {
            if (this.props.renderExclusive || this.props.manualSelection) {
                // We need to wait for the next rendering cycle before focusing to avoid undesired
                // scrolls on the page
                this._focusLinkInput();
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                appendProtocol: true,
                autocompleteUrl: '',
                circular: true,
                customIndexStart: true,
                defaultLinkTarget: '',
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                },
                showTargetSelector: true
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method getInitialState
         */
        getInitialState: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';
            var target = link ? link.getAttribute('target') : this.props.defaultLinkTarget;

            return {
                autocompleteSelected: false,
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
         * @instance
         * @memberof ButtonLinkEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var targetSelector = {
                allowedTargets: this.props.allowedTargets,
                editor: this.props.editor,
                handleLinkTargetChange: this._handleLinkTargetChange,
                selectedTarget: this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault
            };

            targetSelector = this.mergeDropdownProps(targetSelector, AlloyEditor.ButtonLinkTargetEdit.key);

            var autocompleteDropdown;

            if (this.props.data) {
                var dataFn = this.props.data;

                if (!AlloyEditor.Lang.isFunction(dataFn)) {
                    var items = this.props.data;

                    dataFn = function(term) {
                        return items;
                    };
                }

                var autocompleteDropdownProps = {
                    autocompleteSelected: this.state.autocompleteSelected,
                    data: dataFn,
                    editor: this.props.editor,
                    handleLinkAutocompleteClick: this._handleLinkAutocompleteClick,
                    onDismiss: this.props.toggleDropdown,
                    setAutocompleteState: this._setAutocompleteState,
                    term: this.state.linkHref
                };

                autocompleteDropdownProps = this.mergeDropdownProps(autocompleteDropdownProps, AlloyEditor.ButtonLinkAutocompleteList.key);

                autocompleteDropdown = <AlloyEditor.ButtonLinkAutocompleteList {...autocompleteDropdownProps} />;
            }

            var targetButtonEdit;

            if (this.props.showTargetSelector) {
                targetButtonEdit = <AlloyEditor.ButtonLinkTargetEdit {...targetSelector} />;
            }

            var buttonClearLink;

            if (this.state.linkHref) {
                buttonClearLink = <button aria-label={AlloyEditor.Strings.clearInput} className="ae-button ae-icon-remove" onClick={this._clearLink} title={AlloyEditor.Strings.clear}></button>
            }

            var placeholderProp = {};

            if (!CKEDITOR.env.ie && AlloyEditor.Strings) {
                placeholderProp.placeholder = AlloyEditor.Strings.editLink;
            }

            return (
                <div className="ae-container-edit-link">
                    <button aria-label={AlloyEditor.Strings.removeLink} className="ae-button" disabled={!this.state.element} onClick={this._removeLink} title={AlloyEditor.Strings.remove}>
                        <span className="ae-icon-unlink"></span>
                    </button>
                    <div className="ae-container-input xxl">
                        {targetButtonEdit}
                        <div className="ae-container-input">
                            <input className="ae-input" onChange={this._handleLinkHrefChange} onKeyDown={this._handleKeyDown} { ...placeholderProp } ref="linkInput" type="text" value={this.state.linkHref}></input>
                            {autocompleteDropdown}
                        </div>
                        {buttonClearLink}
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
         * @instance
         * @memberof ButtonLinkEdit
         * @method _clearLink
         * @protected
         */
        _clearLink: function() {
            this.setState({
                linkHref: ''
            });

            this._focusLinkInput();
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _focusLinkInput
         * @protected
         */
        _focusLinkInput: function() {
            var instance = this;

            var focusLinkEl = function() {
                ReactDOM.findDOMNode(instance.refs.linkInput).focus();
            };

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(focusLinkEl);
            } else {
                setTimeout(focusLinkEl, 0);
            }

        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         */
        _handleKeyDown: function(event) {
            if (event.keyCode === 13 || event.keyCode === 27) {
                event.preventDefault();
            }

            if (event.keyCode === 13) {
                this._updateLink();
            } else if (event.keyCode === 40) {
                this.setState({
                    autocompleteSelected: true
                });
            } else if (event.keyCode === 27) {
                var editor = this.props.editor.get('nativeEditor');

                new CKEDITOR.Link(editor).advanceSelection();

                this.props.editor.get('nativeEditor').fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         * @protected
         */
        _handleLinkHrefChange: function(event) {
            this.setState({
                linkHref: event.target.value
            });

            this._focusLinkInput();
        },

        /**
         * Updates the component state when the link target changes on user interaction.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleLinkTargetChange
         * @param {SyntheticEvent} event The click event.
         * @protected
         */
        _handleLinkTargetChange: function(event) {
            this.setState({
                itemDropdown: null,
                linkTarget: event.target.getAttribute('data-value')
            });

            this._focusLinkInput();
        },

        /**
         * Updates the component state when an autocomplete link result is selected by user interaction.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleLinkAutocompleteClick
         * @param {SyntheticEvent} event The click event.
         * @protected
         */
        _handleLinkAutocompleteClick: function(event) {
            this.setState({
                itemDropdown: null,
                linkHref: event.target.getAttribute('data-value')
            });

            this._focusLinkInput();
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href and that either that or the link target are different
         * from the original link.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _isValidState
         * @protected
         * @return {Boolean} [description]
         */
        _isValidState: function() {
            var validState =
                this.state.linkHref && (
                    this.state.linkHref !== this.state.initialLink.href ||
                    this.state.linkTarget !== this.state.initialLink.target
                );

            return validState;
        },

        /**
         * Removes the link in the editor element.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _removeLink
         * @protected
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
         * Update autocompleteSelected state to focus and select autocomplete´s dropdown
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _setAutocompleteState
         * @protected
         */
        _setAutocompleteState: function(state) {
            this.setState({
                autocompleteSelected: state.selected
            });
        },

        /**
         * Updates the link in the editor element. If the element didn't exist previously, it will
         * create a new <a> element with the href specified in the link input.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _updateLink
         * @protected
         */
        _updateLink: function() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor, {appendProtocol: this.props.appendProtocol});
            var linkAttrs = {
                target: this.state.linkTarget
            };
            var modifySelection = { advance: true };

            if (this.state.linkHref) {
                if (this.state.element) {
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
        }
    });

    AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
}());