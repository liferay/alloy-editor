/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';
import WidgetDropdown from '../base/widget-dropdown';
import WidgetFocusManager from '../base/widget-focus-manager';
import ButtonIcon from './button-icon.jsx';
import ButtonLinkAutocompleteList from './button-link-autocomplete-list.jsx';
import ButtonLinkTargetEdit from './button-link-target-edit.jsx';

/**
 * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
 * Provides UI for creating, editing and removing a link.
 *
 * @class ButtonLinkEdit
 * @uses WidgetDropdown
 * @uses WidgetFocusManager
 */
class ButtonLinkEdit extends React.Component {
	static contextType = EditorContext;

	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonLinkEdit
	 * @method getDefaultProps
	 * @return {Object} The default properties.
	 */
	static defaultProps = {
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
			prev: [38],
		},
		showTargetSelector: true,
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default linkEdit
	 * @memberof ButtonLinkEdit
	 * @property {String} key
	 * @static
	 */
	static key = 'linkEdit';

	constructor(props) {
		super(props);

		this.linkInput = React.createRef();
		this.state = this._getInitialState();
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
		this.setState(this._getInitialState());
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
		let targetSelector = {
			allowedTargets: this.props.allowedTargets,
			editor: this.context.editor,
			handleLinkTargetChange: this._handleLinkTargetChange,
			selectedTarget:
				this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault,
		};

		targetSelector = this.mergeDropdownProps(
			targetSelector,
			ButtonLinkTargetEdit.key
		);

		let autocompleteDropdown;

		if (this.props.data) {
			let dataFn = this.props.data;

			if (!Lang.isFunction(dataFn)) {
				const items = this.props.data;

				dataFn = () => items;
			}

			let autocompleteDropdownProps = {
				autocompleteSelected: this.state.autocompleteSelected,
				data: dataFn,
				editor: this.context.editor,
				handleLinkAutocompleteClick: this._handleLinkAutocompleteClick,
				onDismiss: this.props.toggleDropdown,
				setAutocompleteState: this._setAutocompleteState,
				term: this.state.linkHref,
			};

			autocompleteDropdownProps = this.mergeDropdownProps(
				autocompleteDropdownProps,
				ButtonLinkAutocompleteList.key
			);

			autocompleteDropdown = (
				<ButtonLinkAutocompleteList {...autocompleteDropdownProps} />
			);
		}

		let buttonClearLink;

		if (this.state.linkHref) {
			buttonClearLink = (
				<button
					aria-label={AlloyEditor.Strings.clearInput}
					className="ae-button ae-button-clear"
					onClick={this._clearLink}
					title={AlloyEditor.Strings.clear}>
					<ButtonIcon symbol="times-circle" />
				</button>
			);
		}

		const placeholderProp = {};

		if (!CKEDITOR.env.ie && AlloyEditor.Strings) {
			placeholderProp.placeholder = AlloyEditor.Strings.editLink;
		}

		return (
			<div className="ae-container-edit-link">
				<button
					aria-label={AlloyEditor.Strings.removeLink}
					className="ae-button"
					disabled={!this.state.element}
					onClick={this._removeLink}
					title={AlloyEditor.Strings.remove}>
					<ButtonIcon symbol="chain-broken" />
				</button>
				<div className="ae-container-input xxl">
					{this.props.showTargetSelector && (
						<ButtonLinkTargetEdit {...targetSelector} />
					)}
					<div className="ae-container-input">
						<input
							className="ae-input"
							onChange={this._handleLinkHrefChange}
							onKeyDown={this._handleKeyDown}
							{...placeholderProp}
							ref={this.linkInput}
							type="text"
							value={this.state.linkHref}
						/>
						{autocompleteDropdown}
					</div>
					{buttonClearLink}
				</div>
				<button
					aria-label={AlloyEditor.Strings.confirm}
					className="ae-button"
					disabled={!this._isValidState()}
					onClick={this._updateLink}
					title={AlloyEditor.Strings.confirm}>
					<ButtonIcon className="ae-icon-svg-check" symbol="check" />
				</button>
			</div>
		);
	}

	/**
	 * The return value will be used as the initial value of this.state.
	 *
	 * @instance
	 * @memberof ButtonLinkEdit
	 * @method _getInitialState
	 * @protected
	 * @return {Object}
	 */
	_getInitialState() {
		// Can't access context from contructor, so get editor from props.

		const {editor} = this.props.context;
		const {defaultLinkTarget} = this.props;

		const link = new CKEDITOR.Link(
			editor.get('nativeEditor')
		).getFromSelection();
		const href = (link && link.getAttribute('href')) || '';
		const target =
			(link && link.getAttribute('target')) || defaultLinkTarget;

		return {
			autocompleteSelected: false,
			element: link,
			initialLink: {
				href,
				target,
			},
			linkHref: href,
			linkTarget: target,
		};
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
	_clearLink = () => {
		this.setState({
			linkHref: '',
		});

		this._focusLinkInput();
	};

	/**
	 * Focuses the user cursor on the widget's input.
	 *
	 * @instance
	 * @memberof ButtonLinkEdit
	 * @method _focusLinkInput
	 * @protected
	 */
	_focusLinkInput() {
		const instance = this;

		const focusLinkEl = function() {
			instance.linkInput.current.focus();
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
	_handleKeyDown = event => {
		if (event.keyCode === 13 || event.keyCode === 27) {
			event.preventDefault();
		}

		if (event.keyCode === 13) {
			this._updateLink();
		} else if (event.keyCode === 40) {
			this.setState({
				autocompleteSelected: true,
			});
		} else if (event.keyCode === 27) {
			const editor = this.context.editor.get('nativeEditor');

			new CKEDITOR.Link(editor).advanceSelection();

			this.context.editor
				.get('nativeEditor')
				.fire('actionPerformed', this);
		}
	};

	/**
	 * Updates the component state when the link input changes on user interaction.
	 *
	 * @instance
	 * @memberof ButtonLinkEdit
	 * @method _handleLinkHrefChange
	 * @param {SyntheticEvent} event The change event.
	 * @protected
	 */
	_handleLinkHrefChange = event => {
		this.setState({
			linkHref: event.target.value,
		});

		this._focusLinkInput();
	};

	/**
	 * Updates the component state when the link target changes on user interaction.
	 *
	 * @instance
	 * @memberof ButtonLinkEdit
	 * @method _handleLinkTargetChange
	 * @param {SyntheticEvent} event The click event.
	 * @protected
	 */
	_handleLinkTargetChange = event => {
		this.setState({
			itemDropdown: null,
			linkTarget: event.target.getAttribute('data-value'),
		});

		this._focusLinkInput();
	};

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
			linkHref: event.target.getAttribute('data-value'),
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
		const validState =
			this.state.linkHref &&
			(this.state.linkHref !== this.state.initialLink.href ||
				this.state.linkTarget !== this.state.initialLink.target);

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
	_removeLink = () => {
		const editor = this.context.editor.get('nativeEditor');
		const linkUtils = new CKEDITOR.Link(editor);
		const selection = editor.getSelection();
		const bookmarks = selection.createBookmarks();

		linkUtils.remove(this.state.element, {advance: false});

		selection.selectBookmarks(bookmarks);

		// We need to cancelExclusive with the bound parameters in case the button is used
		// inside another in exclusive mode (such is the case of the link button)

		this.props.cancelExclusive();

		editor.fire('actionPerformed', this);
	};

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
			autocompleteSelected: state.selected,
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
	_updateLink = () => {
		const editor = this.context.editor.get('nativeEditor');
		const linkUtils = new CKEDITOR.Link(editor, {
			appendProtocol: this.props.appendProtocol,
		});
		let linkAttrs = {
			target: this.state.linkTarget || null,
		};
		const modifySelection = {advance: false};

		if (this.state.linkHref) {
			if (this.state.element) {
				linkAttrs.href = this.state.linkHref;

				linkUtils.update(
					linkAttrs,
					this.state.element,
					modifySelection
				);
			} else {
				if (!this.state.linkTarget) {
					linkAttrs = {};
				}

				linkUtils.create(
					this.state.linkHref,
					linkAttrs,
					modifySelection
				);
			}

			editor.fire('actionPerformed', this);
		}

		// We need to cancelExclusive with the bound parameters in case the button is used
		// inside another in exclusive mode (such is the case of the link button)

		this.props.cancelExclusive();
	};
}

export default EditorContext.toProps(
	WidgetDropdown(WidgetFocusManager(ButtonLinkEdit))
);
