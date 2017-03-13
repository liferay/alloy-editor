(function () {
    'use strict';

    /**
     * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @uses WidgetDropdown
     * @uses WidgetFocusManager
     * @uses ButtonCfgProps
     *
     * @class ButtonLinkEdit
     */
    var ButtonLinkEdit = React.createClass({
        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetFocusManager, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed values for the target attribute.
             *
             * @property {Array} allowedTargets
             */
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * Indicate if we add http:// protocol to link or not
             *
             * @property {Boolean} appendProtocol
             */
            appendProtocol: React.PropTypes.bool,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Default value of the link target attribute.
             *
             * @property {String} defaultLinkTarget
             */
            defaultLinkTarget: React.PropTypes.string,

            /**
             * Indicates whether the link target selector should appear.
             *
             * @property {Boolean} showTargetSelector
             */
            showTargetSelector: React.PropTypes.bool,

            /**
             * List of items to be rendered as possible values for the link or a function, which is
             * supposed to retrieve the data. The function should return a Promise.
             * The returned items must be objects with at least two properties:
             * - title
             * - url
             *
             * @property {Function|Array} data
             */
            data: React.PropTypes.oneOfType([
                React.PropTypes.func,
                React.PropTypes.arrayOf(React.PropTypes.object)
            ])
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
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

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

            return (
                <div className="ae-container-edit-link">
                    <button aria-label="Upload" className="ae-button" onClick={this._uploadFile} title="Upload">
                    	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1792 1792" className="icon" data-identifier="fa-cloud-upload"><path d="M1216 864q0-14-9-23L855 489q-9-9-23-9t-23 9L458 840q-10 12-10 24 0 14 9 23t23 9h224v352q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5V896h224q13 0 22.5-9.5t9.5-22.5zm640 288q0 159-112.5 271.5T1472 1536H384q-185 0-316.5-131.5T-64 1088q0-130 70-240t188-165q-2-30-2-43 0-212 150-362t362-150q156 0 285.5 87T1178 446q71-62 166-62 106 0 181 75t75 181q0 76-41 138 130 31 213.5 135.5T1856 1152z"/></svg>
                    </button>
                    <div className="ae-container-input xxl">
                        <div className="ae-container-input flexible">
                            <input className="ae-input" onChange={this._handleLinkHrefChange} onKeyDown={this._handleKeyDown} placeholder="Search for page, file, or link" ref="linkInput" type="text" value={this.state.linkHref}></input>
                            {autocompleteDropdown}
                        </div>
                        <button aria-label={AlloyEditor.Strings.clearInput} className="ae-button ae-icon-remove" onClick={this._clearLink} style={clearLinkStyle} title={AlloyEditor.Strings.clear}></button>
                    </div>
                    <button aria-label="Preview" className="ae-button" onClick={this._previewLink} title="Preview">
                    	<svg xmlns="http://www.w3.org/2000/svg" viewBox="9.479 15.573 29.73 16.376" data-trimmed="trimmed" width="1em" height="1em" className="icon" data-identifier="glyphicons-eye-open"><path d="M24.347 15.583c-9.844 0-14.868 8.906-14.868 8.906s7.065 7.469 14.868 7.469 14.868-7.469 14.868-7.469-5.025-8.906-14.868-8.906zm-.87 9.271l-.734.734a3.032 3.032 0 0 1-1.178-1.459l.813-.812a2 2 0 0 0 1.099 1.537zm-3.137-1.802c0 2.212 1.794 4.009 4.007 4.009s4.007-1.797 4.007-4.009c0-1.37-.691-2.579-1.742-3.302 1.092.167 2.15.441 3.154.782a5.95 5.95 0 0 1 .562 2.52 5.982 5.982 0 0 1-11.963 0c0-.88.195-1.714.537-2.466.997-.36 2.059-.656 3.175-.832a4.001 4.001 0 0 0-1.737 3.298zm-3.896-1.394a8.092 8.092 0 0 0-.129 1.394 8 8 0 0 0 2.28 5.601c-2.918-1.272-5.216-3.159-6.312-4.164.809-.744 2.276-1.852 4.161-2.831zm13.553 7.101a8.004 8.004 0 0 0 2.235-7.218c2.108 1.006 3.771 2.176 4.615 2.949-1.124 1.032-3.691 2.996-6.85 4.269z"/></svg>
                    </button>
                    <button aria-label={AlloyEditor.Strings.removeLink} className="ae-button" disabled={!this.state.element} onClick={this._removeLink} title={AlloyEditor.Strings.remove}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1792 1792" className="icon" data-identifier="fa-unlink"><path d="M503 1271l-256 256q-10 9-23 9-12 0-23-9-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23zm169 41v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm-224-224q0 14-9 23t-23 9H96q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm1264 128q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-334-335q-21-21-42-56l239-18 273 274q27 27 68 27.5t68-26.5l147-146q28-28 28-67 0-40-28-68l-274-275 18-239q35 21 56 42l336 336q84 86 84 204zm-617-724l-239 18-273-274q-28-28-68-28-39 0-68 27L300 381q-28 28-28 67 0 40 28 68l274 274-18 240q-35-21-56-42L164 652q-84-86-84-204 0-120 85-203L312 99q83-83 203-83 121 0 204 85l334 335q21 21 42 56zm633 84q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zM1184 32v320q0 14-9 23t-23 9-23-9-9-23V32q0-14 9-23t23-9 23 9 9 23zm407 151l-256 256q-11 9-23 9t-23-9q-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23z"/></svg>
                    </button>
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
         * @protected
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
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
         * @protected
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
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
         * @protected
         * @method _handleLinkTargetChange
         * @param {SyntheticEvent} event The click event.
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
         * @protected
         * @method _handleLinkAutocompleteClick
         * @param {SyntheticEvent} event The click event.
         */
        _handleLinkAutocompleteClick: function(event) {
            this.setState({
                itemDropdown: null,
                linkHref: event.target.getAttribute('data-value'),
                linkTarget: event.target.getAttribute('data-target')
            });

            this._focusLinkInput();
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
         * Update autocompleteSelected state to focus and select autocomplete´s dropdown
         *
         * @protected
         * @method _setAutocompleteState
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
         * @protected
         * @method _updateLink
         */
        _updateLink: function() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor, {appendProtocol: this.props.appendProtocol});
            if (this.state.linkHref) {
                var url = this.state.linkHref;
                var linkAttrs = {
                    target: SF.link.targetForUrl(url)
                };
                var modifySelection = { advance: true };
                if (this.state.element) {
                    linkAttrs.href = url;

                    linkUtils.update(linkAttrs, this.state.element, modifySelection);
                } else {
                    linkUtils.create(url, linkAttrs, modifySelection);
                }

                editor.fire('actionPerformed', this);
            }

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        },
        
        _previewLink: function() {
            window.open(this.state.linkHref);
        },
        
        _uploadFile: function() {
            var that = this;
            parent.uploadFile(function(fileUrl) {
                that._handleLinkHrefChange( {
                    target: {
                        value: fileUrl
                    }
                });
                that.setState({
                    linkTarget: "_blank"
                });
            });
        }
    });

    AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
}());