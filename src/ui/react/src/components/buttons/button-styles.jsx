(function () {
    'use strict';

    /**
     * The ButtonStyles class provides functionality for styling a selection with a list of
     * configurable and customizable styles. The allowed styles follow CKEDITOR.Style configuration
     * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
     *
     * @class ButtonStyles
     */
    var ButtonStyles = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Indicates whether the remove styles item should appear in the styles list.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Boolean} showRemoveStylesItem
             */
            showRemoveStylesItem: PropTypes.bool,

            /**
             * List of the styles the button is able to handle.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Array} styles
             */
            styles: PropTypes.arrayOf(PropTypes.object),

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default styles
             * @memberof ButtonStyles
             * @property {String} key
             * @static
             */
            key: 'styles'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonStyles
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var activeStyle = AlloyEditor.Strings.normal;

            var styles = this._getStyles();

            styles.forEach(function(item) {
                if (this._checkActive(item.style)) {
                    activeStyle = item.name;
                }
            }.bind(this));

            var buttonStylesList;

            if (this.props.expanded) {
                buttonStylesList = <AlloyEditor.ButtonStylesList activeStyle={activeStyle} editor={this.props.editor} onDismiss={this.props.toggleDropdown} showRemoveStylesItem={this.props.showRemoveStylesItem} styles={styles} />;
            }

            return (
                <div className="ae-container-dropdown ae-has-dropdown">
                    <button aria-expanded={this.props.expanded} aria-label={AlloyEditor.Strings.styles + ' ' + activeStyle} className="ae-toolbar-element" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.styles + ' ' + activeStyle}>
                        <div className="ae-container">
                            <span className="ae-container-dropdown-selected-item">{activeStyle}</span>
                            <span className="ae-icon-arrow"></span>
                        </div>
                    </button>
                    {buttonStylesList}
                </div>
            );
        },

        /**
         * Checks if the given style definition is applied to the current selection in the editor.
         *
         * @instance
         * @memberof ButtonStyles
         * @method _checkActive
         * @param {Object} styleConfig Style definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
         * @protected
         * @return {Boolean} Returns true if the style is applied to the selection, false otherwise.
         */
        _checkActive: function(styleConfig) {
            var nativeEditor = this.props.editor.get('nativeEditor');

            // Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
            // to a 'span' element works for most of those cases with no defined element.
            styleConfig = CKEDITOR.tools.merge({element: 'span'}, styleConfig);

            var style = new CKEDITOR.style(styleConfig);

            return style.checkActive(nativeEditor.elementPath(), nativeEditor);
        },

        /**
         * Returns an array of styles. Each style consists from two properties:
         * - name - the style name, for example "h1"
         * - style - an object with one property, called `element` which value
         * represents the style which have to be applied to the element.
         *
         * @instance
         * @memberof ButtonStyles
         * @method _getStyles
         * @protected
         * @return {Array<object>} An array of objects containing the styles.
         */
        _getStyles: function() {
            return this.props.styles || [
                {
                    name: AlloyEditor.Strings.h1,
                    style: {
                        element: 'h1'
                    }
                },
                {
                    name: AlloyEditor.Strings.h2,
                    style: {
                        element: 'h2'
                    }
                },
                {
                    name: AlloyEditor.Strings.formatted,
                    style: {
                        element: 'pre'
                    }
                },
                {
                    name: AlloyEditor.Strings.cite,
                    style: {
                        element: 'cite'
                    }
                },
                {
                    name: AlloyEditor.Strings.code,
                    style: {
                        element: 'code'
                    }
                }
            ];
        }
    });

    AlloyEditor.Buttons[ButtonStyles.key] = AlloyEditor.ButtonStyles = ButtonStyles;
}());