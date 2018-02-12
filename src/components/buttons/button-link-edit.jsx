import ButtonCfgProps from '../base/button-props.js';
import ButtonLinkAutocompleteList from './button-link-autocomplete-list.jsx';
import ButtonLinkTargetEdit from './button-link-target-edit.jsx';
import Lang from '../../oop/lang.js';
import React from 'react';
import ReactDOM from 'react-dom';
import WidgetDropdown from '../base/widget-dropdown.js';
import WidgetFocusManager from '../base/widget-focus-manager.js';

/**
 * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
 * Provides UI for creating, editing and removing a link.
 *
 * @class ButtonLinkEdit
 * @uses ButtonCfgProps
 * @uses WidgetDropdown
 * @uses WidgetFocusManager
 */
class ButtonLinkEdit extends React.Component {
    constructor(props) {
        super(props);

        var link = new CKEDITOR.Link(props.editor.get('nativeEditor')).getFromSelection();
        var href = link ? link.getAttribute('href') : '';
        var target = link ? link.getAttribute('target') : props.defaultLinkTarget;

        this.state = {
            autocompleteSelected: false,
            element: link,
            initialLink: {
                href: href,
                target: target
            },
            linkHref: href,
            linkTarget: target
        };
    }

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
    componentDidMount() {
        if (this.props.renderExclusive || this.props.manualSelection) {
            // We need to wait for the next rendering cycle before focusing to avoid undesired
            // scrolls on the page
            this._focusLinkInput();
        }
    }

    /**
     * Lifecycle. Invoked when a component is receiving new props.
     * This method is not called for the initial render.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method componentWillReceiveProps
     */
    componentWillReceiveProps() {
        this.replaceState(this.getInitialState());
    }

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var targetSelector = {
            allowedTargets: this.props.allowedTargets,
            editor: this.props.editor,
            handleLinkTargetChange: this._handleLinkTargetChange,
            selectedTarget: this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault
        };

        targetSelector = this.mergeDropdownProps(targetSelector, ButtonLinkTargetEdit.key);

        var autocompleteDropdown;

        if (this.props.data) {
            var dataFn = this.props.data;

            if (!Lang.isFunction(dataFn)) {
                var items = this.props.data;

                dataFn = () => items;
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

            autocompleteDropdownProps = this.mergeDropdownProps(autocompleteDropdownProps, ButtonLinkAutocompleteList.key);

            autocompleteDropdown = <ButtonLinkAutocompleteList {...autocompleteDropdownProps} />;
        }

        var targetButtonEdit;

        if (this.props.showTargetSelector) {
            targetButtonEdit = <ButtonLinkTargetEdit {...targetSelector} />;
        }

        var buttonClearLink;

        if (this.state.linkHref) {
            buttonClearLink = <button aria-label={AlloyEditor.Strings.clearInput} className="ae-button ae-icon-remove" onClick={this._clearLink.bind(this)} title={AlloyEditor.Strings.clear}></button>;
        }

        var placeholderProp = {};

        if (!CKEDITOR.env.ie && AlloyEditor.Strings) {
            placeholderProp.placeholder = AlloyEditor.Strings.editLink;
        }

        return (
            <div className="ae-container-edit-link">
                <button aria-label={AlloyEditor.Strings.removeLink} className="ae-button" disabled={!this.state.element} onClick={this._removeLink.bind(this)} title={AlloyEditor.Strings.remove}>
                    <span className="ae-icon-unlink"></span>
                </button>
                <div className="ae-container-input xxl">
                    {targetButtonEdit}
                    <div className="ae-container-input">
                        <input className="ae-input" onChange={this._handleLinkHrefChange.bind(this)} onKeyDown={this._handleKeyDown.bind(this)} { ...placeholderProp } ref="linkInput" type="text" value={this.state.linkHref}></input>
                        {autocompleteDropdown}
                    </div>
                    {buttonClearLink}
                </div>
                <button aria-label={AlloyEditor.Strings.confirm} className="ae-button" disabled={!this._isValidState()} onClick={this._updateLink.bind(this)} title={AlloyEditor.Strings.confirm}>
                    <span className="ae-icon-ok"></span>
                </button>
            </div>
        );
    }

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
    _clearLink() {
        this.setState({
            linkHref: ''
        });

        this._focusLinkInput();
    }

    /**
     * Focuses the user cursor on the widget's input.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _focusLinkInput
     * @protected
     */
    _focusLinkInput() {
        var instance = this;

        var focusLinkEl = function() {
            ReactDOM.findDOMNode(instance.refs.linkInput).focus();
        };

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(focusLinkEl);
        } else {
            setTimeout(focusLinkEl, 0);
        }
    }

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
    _handleKeyDown(event) {
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
    }

    /**
     * Updates the component state when the link input changes on user interaction.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _handleLinkHrefChange
     * @param {SyntheticEvent} event The change event.
     * @protected
     */
    _handleLinkHrefChange(event) {
        this.setState({
            linkHref: event.target.value
        });

        this._focusLinkInput();
    }

    /**
     * Updates the component state when the link target changes on user interaction.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _handleLinkTargetChange
     * @param {SyntheticEvent} event The click event.
     * @protected
     */
    _handleLinkTargetChange(event) {
        this.setState({
            itemDropdown: null,
            linkTarget: event.target.getAttribute('data-value')
        });

        this._focusLinkInput();
    }

    /**
     * Updates the component state when an autocomplete link result is selected by user interaction.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _handleLinkAutocompleteClick
     * @param {SyntheticEvent} event The click event.
     * @protected
     */
    _handleLinkAutocompleteClick(event) {
        this.setState({
            itemDropdown: null,
            linkHref: event.target.getAttribute('data-value')
        });

        this._focusLinkInput();
    }

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
    _isValidState() {
        var validState =
            this.state.linkHref && (
                this.state.linkHref !== this.state.initialLink.href ||
                this.state.linkTarget !== this.state.initialLink.target
            );

        return validState;
    }

    /**
     * Removes the link in the editor element.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _removeLink
     * @protected
     */
    _removeLink() {
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
    }

    /**
     * Update autocompleteSelected state to focus and select autocomplete´s dropdown
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _setAutocompleteState
     * @protected
     */
    _setAutocompleteState(state) {
        this.setState({
            autocompleteSelected: state.selected
        });
    }

    /**
     * Updates the link in the editor element. If the element didn't exist previously, it will
     * create a new <a> element with the href specified in the link input.
     *
     * @instance
     * @memberof ButtonLinkEdit
     * @method _updateLink
     * @protected
     */
    _updateLink() {
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
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default linkEdit
 * @memberof ButtonLinkEdit
 * @property {String} key
 * @static
 */
ButtonLinkEdit.key = 'linkEdit';

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ButtonLinkEdit
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ButtonLinkEdit.defaultProps = {
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

export default ButtonCfgProps(
    WidgetDropdown(
    WidgetFocusManager(
        ButtonLinkEdit
)));