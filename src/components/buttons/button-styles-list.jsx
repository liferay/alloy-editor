import ButtonDropdown from './button-dropdown.jsx';
import ButtonStylesListItem from './button-styles-list-item.jsx';
import ButtonStylesListItemRemove from './button-styles-list-item-remove.jsx';
import ButtonsStylesListHeader from './button-styles-list-header.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import WidgetFocusManager from '../base/widget-focus-manager.js';

/**
 * The ButtonStylesList class provides functionality for showing a list of styles that can be
 * applied to the current selection..
 *
 * @class ButtonStylesList
 * @uses WidgetFocusManager
 */
class ButtonStylesList extends React.Component {
    /**
     * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
     *
     * Focuses on the list node to allow keyboard interaction.
     *
     * @instance
     * @memberof ButtonStylesList
     * @method componentDidMount
     */
    componentDidMount() {
        ReactDOM.findDOMNode(this).focus();
    }

    /**
     * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
     *
     * @instance
     * @memberof ButtonStylesList
     * @method componentWillMount
     */
    componentWillMount() {
        var blockStyles = [];
        var inlineStyles = [];
        var objectStyles = [];

        this.props.styles.forEach(function(item) {
            var style = new CKEDITOR.style(item.style);

            if (style.type === CKEDITOR.STYLE_BLOCK) {
                blockStyles.push(item);
            } else if (style.type === CKEDITOR.STYLE_INLINE) {
                inlineStyles.push(item);
            } else if (style.type === CKEDITOR.STYLE_OBJECT) {
                objectStyles.push(item);
            }
        });

        this._blockStyles = blockStyles;
        this._inlineStyles = inlineStyles;
        this._objectStyles = objectStyles;
    }

    /**
     * Lifecycle. Renders the UI of the list.
     *
     * @instance
     * @memberof ButtonStylesList
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var removeStylesItem;

        if (this.props.showRemoveStylesItem) {
            removeStylesItem = <ButtonStylesListItemRemove editor={this.props.editor} onDismiss={this.props.toggleDropdown} />;
        }

        return (
            <ButtonDropdown {...this.props}>
                {removeStylesItem}

                <ButtonsStylesListHeader name={AlloyEditor.Strings.blockStyles} styles={this._blockStyles} />
                {this._renderStylesItems(this._blockStyles)}

                <ButtonsStylesListHeader name={AlloyEditor.Strings.inlineStyles} styles={this._inlineStyles} />
                {this._renderStylesItems(this._inlineStyles)}

                <ButtonsStylesListHeader name={AlloyEditor.Strings.objectStyles} styles={this._objectStyles} />
                {this._renderStylesItems(this._objectStyles)}
            </ButtonDropdown>
        );
    }

    /**
     * Renders instances of ButtonStylesListItem with the preview of the correspondent block, inline or object styles.
     *
     * @instance
     * @memberof ButtonStylesList
     * @method _renderStylesItems
     * @param {Array} styles List of styles for which preview should be rendered.
     * @protected
     * @return {Array} Rendered instances of ButtonStylesListItem class
     */
    _renderStylesItems(styles) {
        var editor = this.props.editor;
        var items;

        if (styles && styles.length) {
            items = styles.map(function(item) {
                return (
                    <li key={item.name} role="option">
                        <ButtonStylesListItem activeStyle={this.props.activeStyle} editor={editor} name={item.name} style={item.style} />
                    </li>
                );
            }.bind(this));
        }

        return items;
    }
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @memberof ButtonStylesList
 * @static
 * @property {String} key
 * @default buttonStylesList
 */
ButtonStylesList.key = 'buttonStylesList';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonStylesList
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonStylesList.defaultProps = {
    circular: false,
    descendants: '.ae-toolbar-element',
    keys: {
        dismiss: [27],
        dismissNext: [39],
        dismissPrev: [37],
        next: [40],
        prev: [38]
    },
    showRemoveStylesItem: true
};

export default WidgetFocusManager(
    ButtonStylesList
);