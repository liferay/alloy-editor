import ButtonStylesList from './button-styles-list.jsx';
import React from 'react';

/**
 * The ButtonStyles class provides functionality for styling a selection with a list of
 * configurable and customizable styles. The allowed styles follow CKEDITOR.Style configuration
 * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
 *
 * @class ButtonStyles
 */
class ButtonStyles extends React.Component {
    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonStyles
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var activeStyle = AlloyEditor.Strings.normal;

        var styles = this._getStyles();

        styles.forEach(function(item) {
            if (this._checkActive(item.style)) {
                activeStyle = item.name;
            }
        }.bind(this));

        var buttonStylesList;

        if (this.props.expanded) {
            buttonStylesList = <ButtonStylesList activeStyle={activeStyle} editor={this.props.editor} onDismiss={this.props.toggleDropdown} showRemoveStylesItem={this.props.showRemoveStylesItem} styles={styles} />;
        }

        return (
            <div className="ae-container-dropdown ae-has-dropdown">
                <button aria-expanded={this.props.expanded} aria-label={AlloyEditor.Strings.styles + ' ' + activeStyle} className="ae-toolbar-element" onClick={this.props.toggleDropdown.bind(this)} role="combobox" tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.styles + ' ' + activeStyle}>
                    <div className="ae-container">
                        <span className="ae-container-dropdown-selected-item">{activeStyle}</span>
                        <span className="ae-icon-arrow"></span>
                    </div>
                </button>
                {buttonStylesList}
            </div>
        );
    }

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
    _checkActive(styleConfig) {
        var nativeEditor = this.props.editor.get('nativeEditor');

        // Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
        // to a 'span' element works for most of those cases with no defined element.
        styleConfig = CKEDITOR.tools.merge({element: 'span'}, styleConfig);

        var style = new CKEDITOR.style(styleConfig);

        return style.checkActive(nativeEditor.elementPath(), nativeEditor);
    }

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
    _getStyles() {
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
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default styles
 * @memberof ButtonStyles
 * @property {String} key
 * @static
 */
ButtonStyles.key = 'styles';

export default ButtonStyles;