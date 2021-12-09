/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from '../../adapter/editor-context';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonAccessibilityImageAlt class provides functionality for changing text color in a document.
 *
 * @class ButtonAccessibilityImageAlt
 *
 */
class ButtonAccessibilityImageAlt extends React.Component {
	static contextType = EditorContext;

	static key = 'imageAlt';

	constructor(props) {
		super(props);

		this.state = this._getInitialState();
	}

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * Focuses on the link input to immediately allow editing. This should only happen if the component
	 * is rendered in exclusive mode to prevent aggressive focus stealing.
	 *
	 * @instance
	 * @memberof ButtonAccessibilityImageAlt
	 * @method componentDidMount
	 */
	componentDidMount() {
		if (this.props.renderExclusive || this.props.manualSelection) {
			// We need to wait for the next rendering cycle before focusing to avoid undesired
			// scrolls on the page

			this._focusAltInput();
		}
	}

	/**
	 * Lifecycle. Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @instance
	 * @memberof ButtonAccessibilityImageAlt
	 * @method componentWillReceiveProps
	 */
	componentWillReceiveProps() {
		this.setState(this._getInitialState());
	}

	/**
	 * The return value will be used as the initial value of this.state.
	 *
	 * @instance
	 * @memberof ButtonAccessibilityImageAlt
	 * @method _getInitialState
	 * @protected
	 * @return {Object}
	 */
	_getInitialState() {
		// Can't access context from contructor, so get editor from props.

		const {editor} = this.props.context;

		const selection = editor.get('nativeEditor').getSelection();

		const element =
			selection.getSelectedElement() || selection.getStartElement();

		this._element = element;

		const imageElement = this._element.findOne('img');

		const imageAlt = imageElement
			? imageElement.getAttribute('alt')
			: this._element.getAttribute('alt');

		return {
			imageAlt,
		};
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		if (this.props.renderExclusive) {
			return (
				<div className="ae-container-edit-link">
					<div className="ae-container-input xxl">
						<input
							aria-label="alt"
							className="ae-input"
							onChange={this._handleAltChange}
							onKeyDown={this._handleKeyDown}
							placeholder="alt"
							ref="refAltInput"
							title="alt"
							type="text"
							value={this.state.imageAlt}
						/>
					</div>
					<button
						aria-label={AlloyEditor.Strings.confirm}
						className="ae-button"
						onClick={this._updateImageAlt}
						title={AlloyEditor.Strings.confirm}>
						<ButtonIcon symbol="check" />
					</button>
				</div>
			);
		} else {
			return (
				<button
					className="ae-button"
					onClick={this._requestExclusive}
					tabIndex={this.props.tabIndex}>
					<small className="ae-icon small">Alt</small>
				</button>
			);
		}
	}

	/**
	 * Focuses the user cursor on the widget's input.
	 *
	 * @protected
	 * @method _focusAltInput
	 */
	_focusAltInput() {
		const instance = this;

		const focusAltEl = function() {
			ReactDOM.findDOMNode(instance.refs.refAltInput).focus();
		};

		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(focusAltEl);
		} else {
			setTimeout(focusAltEl, 0);
		}
	}

	/**
	 * Event attached to alt input that fires when its value is changed
	 *
	 * @protected
	 * @method  _handleAltChange
	 * @param {MouseEvent} event
	 */
	_handleAltChange = event => {
		this.setState({
			imageAlt: event.target.value,
		});

		this._focusAltInput();
	};

	/**
	 * Event attached to al tinput that fires when key is down
	 * This method check that enter key is pushed to update the component´s state
	 *
	 * @protected
	 * @method  _handleKeyDown
	 * @param {MouseEvent} event
	 */
	_handleKeyDown = event => {
		if (event.keyCode === 13) {
			event.preventDefault();

			this._updateImageAlt();
		}
	};

	/**
	 * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
	 *
	 * @protected
	 * @method _requestExclusive
	 */
	_requestExclusive = () => {
		this.props.requestExclusive(ButtonAccessibilityImageAlt.key);
	};

	/**
	 * Method called by clicking ok button or pushing key enter to update imageAlt state and to update alt property from the image that is selected
	 * This method calls cancelExclusive to show the previous toolbar before enter to edit alt property
	 *
	 * @protected
	 * @method  _updateImageAlt
	 */
	_updateImageAlt = () => {
		const editor = this.context.editor.get('nativeEditor');

		const imageAlt = this.refs.refAltInput.value;

		this.setState({
			imageAlt,
		});

		const imageElement = this._element.findOne('img');
		const image = imageElement ? imageElement : this._element;

		image.setAttribute('alt', imageAlt);

		editor.fire('actionPerformed', this);

		// We need to cancelExclusive with the bound parameters in case the button is used
		// inside another in exclusive mode (such is the case of the alt button)

		this.props.cancelExclusive();
	};
}

export default EditorContext.toProps(ButtonAccessibilityImageAlt);
