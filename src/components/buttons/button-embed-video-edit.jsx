/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';

const KEY_ENTER = 13;
const KEY_ESC = 27;

/**
 * The ButtonEmbedVideoEdit class provides functionality for changing text color in a document.
 *
 * @uses ButtonIcon
 *
 * @class ButtonEmbedVideoEdit
 */
class ButtonEmbedVideoEdit extends React.Component {
	static contextType = EditorContext;

	static key = 'embedVideoEdit';

	constructor(props) {
		super(props);

		this.state = this.getInitialState();
	}

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * Focuses on the link input to immediately allow editing. This should only happen if the component
	 * is rendered in exclusive mode to prevent aggressive focus stealing.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method componentDidMount
	 */
	componentDidMount() {
		if (this.props.renderExclusive || this.props.manualSelection) {
			// We need to wait for the next rendering cycle before focusing to avoid undesired
			// scrolls on the page

			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(this._focusVideoUrlInput);
			} else {
				setTimeout(this._focusVideoUrlInput, 0);
			}
		}
	}

	/**
	 * Lifecycle. Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method componentWillReceiveProps
	 */
	componentWillReceiveProps() {
		const newState = this.getInitialState();

		this.setState({
			all: undefined,
			keys: undefined,
			new: newState,
			old: undefined,
		});
	}

	/**
	 * Lifecycle. Invoked once before the component is mounted.
	 * The return value will be used as the initial value of this.state.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method getInitialState
	 */
	getInitialState() {
		// Can't access context from constructor, so get editor from props.

		const editor = this.props.context.editor.get('nativeEditor');
		let element;

		const selection = editor.getSelection();

		if (selection) {
			const selectedElement = selection.getSelectedElement();

			if (selectedElement) {
				element = selectedElement.findOne('[data-widget="videoembed"]');
			}
		}

		const videoURL = element
			? element.getAttribute('data-embed-video-url')
			: '';

		return {
			element,
			initialEmbed: {
				videoURL,
			},
			videoURL,
		};
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const inputPlaceholder = AlloyEditor.Strings.pasteVideoLink;

		const clearVideoURLStyle = {
			opacity: this.state.videoURL ? 1 : 0,
		};

		return (
			<div className="ae-container-embed-video-edit">
				<div className="ae-container-input xxl">
					<input
						className="ae-input"
						onChange={this._handleVideoURLChange}
						onKeyDown={this._handleKeyDown}
						placeholder={inputPlaceholder}
						ref="linkInput"
						type="text"
						value={this.state.videoURL}
					/>
					<button
						aria-label={AlloyEditor.Strings.clearInput}
						className="ae-button ae-icon-remove"
						onClick={this._clearLink}
						style={clearVideoURLStyle}
						title={AlloyEditor.Strings.clear}
					/>
				</div>
				<button
					aria-label={AlloyEditor.Strings.confirm}
					className="ae-button"
					disabled={!this._isValidState()}
					onClick={this._embedVideoURL}
					title={AlloyEditor.Strings.confirm}>
					<ButtonIcon symbol="check" />
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
	 * @memberof ButtonEmbedVideoEdit
	 * @method _clearLink
	 * @protected
	 */
	_clearLink() {
		this.setState({
			videoURL: '',
		});
	}

	/**
	 * Triggers the embedVideoUrl command to transform the link into an embed media object
	 *
	 * @instance
	 * @memberof EmbedVideoEdit
	 * @method _embedVideoURL
	 * @protected
	 */
	_embedVideoURL = () => {
		const nativeEditor = this.context.editor.get('nativeEditor');

		nativeEditor.execCommand('embedUrl', {
			type: 'video',
			url: this.state.videoURL,
		});

		// We need to cancelExclusive with the bound parameters in case the button is used
		// inside another in exclusive mode (such is the case of the link button)

		this.props.cancelExclusive();
	};

	/**
	 * Focuses the user cursor on the widget's input.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method _focusVideoUrlInput
	 * @protected
	 */
	_focusVideoUrlInput = () => {
		ReactDOM.findDOMNode(this.refs.linkInput).focus();
	};

	/**
	 * Monitors key interaction inside the input element to respond to the keys:
	 * - Enter: Creates/updates the link.
	 * - Escape: Discards the changes.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method _handleKeyDown
	 * @param {SyntheticEvent} event The keyboard event.
	 * @protected
	 */
	_handleKeyDown = event => {
		if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
			event.preventDefault();
		}

		if (event.keyCode === KEY_ENTER) {
			this._embedVideoURL();
		} else if (event.keyCode === KEY_ESC) {
			this.props.cancelExclusive();
		}
	};

	/**
	 * Updates the component state when the link input changes on user interaction.
	 *
	 * @instance
	 * @memberof ButtonEmbedVideoEdit
	 * @method _handleVideoURLChange
	 * @param {SyntheticEvent} event The change event.
	 * @protected
	 */
	_handleVideoURLChange = event => {
		this.setState({
			videoURL: event.target.value,
		});
	};

	/**
	 * Verifies that the current link state is valid so the user can save the link. A valid state
	 * means that we have a non-empty videoURL that's different from the original one.
	 *
	 * @instance
	 * @memberof EmbedVideoEdit
	 * @method _isValidState
	 * @protected
	 * @return {Boolean} True if the state is valid, false otherwise
	 */
	_isValidState() {
		const validState =
			this.state.videoURL &&
			this.state.videoURL !== this.state.initialEmbed.videoURL;

		return validState;
	}
}

export default EditorContext.toProps(ButtonEmbedVideoEdit);
