(function () {
  'use strict';

  /**
   * The ButtonParioLinkEdit class provides functionality for creating and editing a link in a document.
   * Provides UI for creating, editing and removing a link.
   *
   * @class ButtonParioLinkEdit
   * @uses ButtonCfgProps
   * @uses WidgetDropdown
   * @uses WidgetFocusManager
   */
  var ButtonParioLinkEdit = createReactClass({
      mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetFocusManager, AlloyEditor.ButtonCfgProps],

      // Allows validating props being passed to the component.
      propTypes: {

          /**
           * Indicate if we add http:// protocol to link or not
           *
           * @instance
           * @memberof ButtonParioLinkEdit
           * @property {Boolean} appendProtocol
           */
          appendProtocol: PropTypes.bool,

          /**
           * The editor instance where the component is being used.
           *
           * @instance
           * @memberof ButtonParioLinkEdit
           * @property {Object} editor
           */
          editor: PropTypes.object.isRequired,

          /**
           * List of items to be rendered as possible values for the link or a function, which is
           * supposed to retrieve the data. The function should return a Promise.
           * The returned items must be objects with at least two properties:
           * - title
           * - url
           *
           * @instance
           * @memberof ButtonParioLinkEdit
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
           * @memberof ButtonParioLinkEdit
           * @property {String} key
           * @static
           */
          key: 'parioLinkEdit'
      },

      /**
       * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
       *
       * Focuses on the link input to immediately allow editing. This should only happen if the component
       * is rendered in exclusive mode to prevent aggressive focus stealing.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
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
       * @memberof ButtonParioLinkEdit
       * @method componentWillReceiveProps
       */
      componentWillReceiveProps: function(nextProps) {
          this.replaceState(this.getInitialState());
      },

      /**
       * Lifecycle. Returns the default values of the properties used in the widget.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
       * @method getDefaultProps
       * @return {Object} The default properties.
       */
      getDefaultProps: function() {
          return {
              appendProtocol: true,
              autocompleteUrl: '',
              circular: true,
              customIndexStart: true,
              descendants: '.ae-toolbar-element',
              keys: {
                  dismiss: [27],
                  dismissNext: [39],
                  dismissPrev: [37],
                  next: [40],
                  prev: [38]
              }
          };
      },

      /**
       * Lifecycle. Invoked once before the component is mounted.
       * The return value will be used as the initial value of this.state.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
       * @method getInitialState
       */
      getInitialState: function() {
          var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
          var href = link ? link.getAttribute('href') : '';
          var viewMode = link && link.hasAttribute('href') ? true : false;
          var innerText;

            if (link) {
                innerText = link.$.innerText;
            } else {
                innerText = this.props.innerText;
            }

          return {
              autocompleteSelected: false,
              element: link,
              initialLink: {
                  href: href,
                  innerText: innerText
              },
              innerText: innerText,
              linkHref: href,
              viewMode: viewMode
          };
      },

      /**
       * Lifecycle. Renders the UI of the button.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
       * @method render
       * @return {Object} The content which should be rendered.
       */
      render: function() {
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

          var placeholderProp = {};

          if (!CKEDITOR.env.ie && AlloyEditor.Strings) {
              placeholderProp.placeholder = AlloyEditor.Strings.editLink;
          }

          var viewMode = this.state.viewMode;

          return (
            <div className="pario-edit-link-container">
              {viewMode ? (
                <div className="pario-container-edit-link">
                  <span className="link-value">{this.state.linkHref}</span>

                  <button aria-label={AlloyEditor.Strings.confirm} className="ae-button" onClick={this._updateViewMode} title={AlloyEditor.Strings.confirm}>
                    <i className="material-icons">edit</i>
                  </button>

                  <button aria-label={AlloyEditor.Strings.confirm} className="ae-button" onClick={this._removeLink} title={AlloyEditor.Strings.confirm}>
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              ) : (
                <div className="pario-update-link-container">
                    <div className="link-content">
                        <div className="pario-update-link-container">
                            <div className="ae-container-input">
                                <span>Text</span>
                                <input className="ae-input" onChange={this._handleLinkText} onKeyDown={this._handleKeyDown} { ...placeholderProp } ref="textInput" type="text" value={this.state.innerText}></input>
                            </div>
                        </div>

                        <div className="pario-update-link-container">
                            <div className="ae-container-input">
                                <span>Link</span>
                                <input className="ae-input" onChange={this._handleLinkHrefChange} onKeyDown={this._handleKeyDown} { ...placeholderProp } ref="linkInput" type="text" value={this.state.linkHref}></input>
                                {autocompleteDropdown}
                            </div>
                        </div>
                    </div>
                    <div className="apply-button">
                        <button aria-label={AlloyEditor.Strings.confirm} className="ae-button" disabled={!this._isValidState()} onClick={this._updateLink} title={AlloyEditor.Strings.confirm}>
                            Apply
                        </button>
                    </div>
                </div>
              )}
            </div>
          );
      },

      /**
       * Clears the link input. This only changes the component internal state, but does not
       * affect the link element of the editor. Only the _removeLink and _updateLink methods
       * are translated to the editor element.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
       * @method _clearLink
       * @protected
       */
      _clearLink: function() {
          this.setState({
            linkHref: ''
          });

          this._focusLinkInput();
      },

      _updateViewMode: function() {
        this.setState({
          viewMode: !this.state.viewMode
        });

        this._focusLinkInput();
      },

      _focusTextInput: function() {
            var instance = this;

          var focusLinkEl = function() {
              ReactDOM.findDOMNode(instance.refs.textInput).focus();
          };

          if (window.requestAnimationFrame) {
              window.requestAnimationFrame(focusLinkEl);
          } else {
              setTimeout(focusLinkEl, 0);
          }
      },

      /**
       * Focuses the user cursor on the widget's input.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
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
       * @memberof ButtonParioLinkEdit
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

      _handleLinkText: function(event) {
          var element = this.state.element;

          this.setState({
            innerText: event.target.value
          })

          this._focusTextInput();
      },

      /**
       * Updates the component state when the link input changes on user interaction.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
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
       * Updates the component state when an autocomplete link result is selected by user interaction.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
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
       * @memberof ButtonParioLinkEdit
       * @method _isValidState
       * @protected
       * @return {Boolean} [description]
       */
      _isValidState: function() {
          var validState =
              this.state.linkHref && (
                  this.state.linkHref !== this.state.initialLink.href ||
                  this.state.innerText !== this.state.initialLink.innerText
              );

          return validState;
      },

      /**
       * Removes the link in the editor element.
       *
       * @instance
       * @memberof ButtonParioLinkEdit
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
       * @memberof ButtonParioLinkEdit
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
       * @memberof ButtonParioLinkEdit
       * @method _updateLink
       * @protected
       */
      _updateLink: function() {
          var editor = this.props.editor.get('nativeEditor');
          var linkUtils = new CKEDITOR.Link(editor, {appendProtocol: this.props.appendProtocol});
          var linkAttrs = {};
          var modifySelection = { advance: true };

          if (this.state.linkHref) {
              if (this.state.element) {
                  linkAttrs.href = this.state.linkHref;

                  linkUtils.update(linkAttrs, this.state.element, modifySelection, this.state.innerText);
              } else {
                  linkUtils.create(this.state.linkHref, linkAttrs, modifySelection, this.state.innerText);
              }

              editor.fire('actionPerformed', this);
          }

          // We need to cancelExclusive with the bound parameters in case the button is used
          // inside another in exclusive mode (such is the case of the link button)
          this.props.cancelExclusive();
      }
  });

  AlloyEditor.Buttons[ButtonParioLinkEdit.key] = AlloyEditor.ButtonParioLinkEdit = ButtonParioLinkEdit;
}());