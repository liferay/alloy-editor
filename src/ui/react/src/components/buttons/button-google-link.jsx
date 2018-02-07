(function () {
  'use strict';

  /**
   * The ButtonParioLink class provides functionality for creating and editing a link in a document. ButtonParioLink
   * renders in two different modes:
   *
   * - Normal: Just a button that allows to switch to the edition mode
   * - Exclusive: The ButtonParioLinkEdit UI with all the link edition controls.
   *
   * @class ButtonParioLink
   * @uses ButtonCfgProps
   * @uses ButtonKeystroke
   * @uses ButtonStateClasses
   */
  var ButtonParioLink = createReactClass({
      mixins: [AlloyEditor.ButtonKeystroke, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCfgProps],

      // Allows validating props being passed to the component.
      propTypes: {
          /**
           * The editor instance where the component is being used.
           *
           * @instance
           * @memberof ButtonParioLink
           * @property {Object} editor
           */
          editor: PropTypes.object.isRequired,

          /**
           * The label that should be used for accessibility purposes.
           *
           * @instance
           * @memberof ButtonParioLink
           * @property {String} label
           */
          label: PropTypes.string,

          /**
           * The tabIndex of the button in its toolbar current state. A value other than -1
           * means that the button has focus and is the active element.
           *
           * @instance
           * @memberof ButtonParioLink
           * @property {Number} tabIndex
           */
          tabIndex: PropTypes.number,

          selectedText: PropTypes.string
      },

      // Lifecycle. Provides static properties to the widget.
      statics: {
          /**
           * The name which will be used as an alias of the button in the configuration.
           *
           * @default link
           * @memberof ButtonParioLink
           * @property {String} key
           * @static
           */
          key: 'parioLink'
      },

      /**
       * Lifecycle. Returns the default values of the properties used in the widget.
       *
       * @instance
       * @memberof ButtonParioLink
       * @method getDefaultProps
       * @return {Object} The default properties.
       */
      getDefaultProps: function() {
          return {
              keystroke: {
                  fn: '_requestExclusive',
                  keys: CKEDITOR.CTRL + 76 /*L*/
              }
          };
      },

      /**
       * Checks if the current selection is contained within a link.
       *
       * @instance
       * @memberof ButtonParioLink
       * @method isActive
       * @return {Boolean} True if the selection is inside a link, false otherwise.
       */
      isActive: function() {
          return (new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null);
      },

      /**
       * Lifecycle. Renders the UI of the button.
       *
       * @instance
       * @memberof ButtonParioLink
       * @method render
       * @return {Object} The content which should be rendered.
       */
      render: function() {
          var cssClass = 'ae-button ' + this.getStateClasses();
          var renderExclusive = this.props.renderExclusive;

          if (this.props.renderExclusive) {
              var props = this.mergeButtonCfgProps();
          }

        return (
            <div className="pario-editor-button">
                {renderExclusive ? (
                    <div>
                        <span className="render-above-bar">
                            <AlloyEditor.ButtonParioLinkEdit innerText={this.state.selectedText} {...props} />
                        </span>

                        <button aria-label={AlloyEditor.Strings.link} className={cssClass} data-type="button-link" onClick={this._requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                            <i className="material-icons">link</i>
                        </button>
                    </div>
                ) : (
                <button aria-label={AlloyEditor.Strings.link} className={cssClass} data-type="button-link" onClick={this._requestExclusive} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.link}>
                    <i className="material-icons">link</i>
                </button>
                )}
            </div>
        );
      },

      /**
       * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
       *
       * @instance
       * @memberof ButtonParioLink
       * @method _requestExclusive
       * @protected
       */
      _requestExclusive: function() {
        var selection = this.props.editor.get('nativeEditor').getSelection();

        if (selection) {
            this.setState({
                selectedText: selection.getSelectedText()
            });
        }

        console.log(AlloyEditor);

        this.props.requestExclusive(ButtonParioLink.key);
      }
  });

  AlloyEditor.Buttons[ButtonParioLink.key] = AlloyEditor.ButtonParioLink = ButtonParioLink;
}());