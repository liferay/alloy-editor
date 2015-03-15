(function () {
    'use strict';

    /**
     * The ButtonStyles class provides functionality for styling a selection with a list of
     * configuratble and customizable styles. The allowed styles follow CKEDITOR.Style configuration
     * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
     *
     * @class ButtonStyles
     */
    var ButtonStyles = React.createClass({
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'styles'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function () {
            return {
                styles: [
                    {
                        name: 'Head 1',
                        style: {
                            element: 'h1'
                        }
                    },
                    {
                        name: 'Head 2',
                        style: {
                            element: 'h2'
                        }
                    },
                    {
                        name: 'Big',
                        style: {
                            element: 'big'
                        }
                    },
                    {
                        name: 'Small',
                        style: {
                            element: 'small'
                        }
                    },
                    {
                        name: 'Code',
                        style: {
                            element: 'code'
                        }
                    }
                ]
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         */
        getInitialState: function() {
            return {
                expanded: false
            };
        },

        /**
         * Checks if the given style definition is applied to the current selection in the editor.
         *
         * @protected
         * @method _checkActive
         *
         * @param  {Object} styleCfg Style definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
         * @return {Boolean} Returns true if the style is applied to the selection, false otherwise.
         */
        _checkActive: function(styleCfg) {
            var nativeEditor = this.props.editor.get('nativeEditor');

            // Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
            // to a 'span' element works for most of those cases with no defined element.
            styleCfg = CKEDITOR.tools.merge({element: 'span'}, styleCfg);

            var style = new CKEDITOR.style(styleCfg);

            return style.checkActive(nativeEditor.elementPath(), nativeEditor);
        },

        /**
         * Toggles the expanded state of the widget showing and hiding the styles list.
         *
         * @protected
         * @method _toggleList
         */
        _toggleList: function() {
            this.setState({
                expanded: !this.state.expanded
            });
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var instance = this;

            var activeStyle = 'Styles';

            this.props.styles.forEach(function(item) {
                if (instance._checkActive(item.style)) {
                    activeStyle = item.name;
                }
            });

            return (
                <div className="alloy-editor-container-styles">
                    {(function() {
                        return this.state.expanded ? <global.AlloyEditor.ButtonStylesList editor={this.props.editor} styles={this.props.styles} trigger={this.props.trigger} /> : undefined;
                    }).call(this)}

                    <button className="alloy-editor-container alloy-editor-toolbar-element" onClick={this._toggleList} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-selected-style">{activeStyle}</span>
                        <span className="alloy-editor-icon-arrow"></span>
                    </button>
                </div>
            );
        }
    });

    global.AlloyEditor.Buttons[ButtonStyles.key] = global.AlloyEditor.ButtonStyles = ButtonStyles;
}());