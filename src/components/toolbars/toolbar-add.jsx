/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';
import ReactDOM from 'react-dom';

import EditorContext from '../../adapter/editor-context';
import ToolbarButtons from '../base/toolbar-buttons';
import WidgetDropdown from '../base/widget-dropdown';
import WidgetExclusive from '../base/widget-exclusive';
import WidgetFocusManager from '../base/widget-focus-manager';
import ButtonIcon from '../buttons/button-icon.jsx';

const POSITION_LEFT = 1;
const POSITION_RIGHT = 2;

/**
 * The ToolbarAdd class provides functionality for adding content to the editor.
 *
 * @class ToolbarAdd
 * @uses ToolbarButtons
 * @uses WidgetDropdown
 * @uses WidgetExclusive
 * @uses WidgetFocusManager
 */
class ToolbarAdd extends React.Component {
	static contextType = EditorContext;

	constructor(props) {
		super(props);

		this.state = {};
	}

	/**
	 * Lifecycle. Invoked once, only on the client (not on the server),
	 * immediately after the initial rendering occurs.
	 *
	 * @instance
	 * @memberof ToolbarAdd
	 * @method componentDidMount
	 */
	componentDidMount() {
		this._updatePosition();
	}

	/**
	 * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
	 * This method is not called for the initial render.
	 *
	 * @instance
	 * @memberof ToolbarAdd
	 * @method componentDidUpdate
	 * @param {Object} prevProps The previous state of the component's properties.
	 * @param {Object} prevState Component's previous state.
	 */
	componentDidUpdate(_prevProps, _prevState) {
		this._updatePosition();

		// In case of exclusive rendering, focus the first descendant (button)
		// so the user will be able to start interacting with the buttons immediately.

		if (this.props.renderExclusive) {
			this.focus();
		}
	}

	/**
	 * Lifecycle. Renders the buttons for adding content or hides the toolbar
	 * if user interacted with a non-editable element.
	 *
	 * @instance
	 * @memberof ToolbarAdd
	 * @method render
	 * @return {Object|null} The content which should be rendered.
	 */
	render() {
		// Some operations such as `requestExclusive` may force editor to blur which will
		// invalidate the `props.editorEvent` stored value, without causing a `props` change.
		// For example, if the editor is empty, `ae_placeholder` plugin will remove
		// the target from the DOM and will prevent `add` toolbar from rendering.
		//
		// It should be safe to assume that if you have been able to render the toolbar
		// and request the exclusive mode, then rendering might be kept until the exclusive mode is left.

		if (
			!this.state.itemExclusive &&
			this.props.editorEvent &&
			this.props.editorEvent.data.nativeEvent.target &&
			!this.props.editorEvent.data.nativeEvent.target.isContentEditable
		) {
			return null;
		}

		const buttons = this._getButtons();
		const className = this._getToolbarClassName();

		return (
			<div
				aria-label={AlloyEditor.Strings.add}
				className={className}
				data-tabindex={this.props.config.tabIndex || 0}
				onFocus={this.focus.bind(this)}
				onKeyDown={this.handleKey.bind(this)}
				role="toolbar"
				tabIndex="-1">
				<div className="ae-container">{buttons}</div>
			</div>
		);
	}

	/**
	 * Returns a list of buttons that will eventually render to HTML.
	 *
	 * @instance
	 * @memberof ToolbarAdd
	 * @method _getButtons
	 * @protected
	 * @return {Object} The buttons which have to be rendered.
	 */
	_getButtons() {
		let buttons;

		if (this.props.renderExclusive) {
			buttons = this.getToolbarButtons(this.props.config.buttons);
		} else {
			if (this.props.selectionData && this.props.selectionData.region) {
				buttons = (
					<button
						aria-label={AlloyEditor.Strings.add}
						className="ae-button ae-button-add"
						onClick={this.props.requestExclusive.bind(
							this,
							ToolbarAdd.key
						)}
						title={AlloyEditor.Strings.add}>
						<ButtonIcon symbol="plus" />
					</button>
				);
			}
		}

		return buttons;
	}

	/**
	 * Returns the class name of the toolbar in case of both exclusive and normal mode.
	 *
	 * @instance
	 * @memberof ToolbarAdd
	 * @method _getToolbarClassName
	 * @protected
	 * @return {String} The class name which have to be applied to the DOM element.
	 */
	_getToolbarClassName() {
		let cssClass = 'ae-toolbar-add';

		if (this.props.renderExclusive) {
			cssClass = 'ae-toolbar ' + this.getArrowBoxClasses();
		}

		return cssClass;
	}

	/**
	 * Calculates and sets the position of the toolbar in exclusive or normal mode.
	 *
	 * @instance
	 * @memberof ToolbarAdd
	 * @method _updatePosition
	 * @protected
	 */
	_updatePosition() {
		let region;

		// If component is not mounted, there is nothing to do

		if (!ReactDOM.findDOMNode(this)) {
			return;
		}

		if (this.props.renderExclusive) {
			this.updatePosition();
			this.show();
		} else {
			if (this.props.selectionData) {
				region = this.props.selectionData.region;
			}

			if (region) {
				const domNode = ReactDOM.findDOMNode(this);

				const domElement = new CKEDITOR.dom.element(domNode);

				const startRect = region.startRect || region;

				const nativeEditor = this.context.editor.get('nativeEditor');

				const clientRect = nativeEditor.editable().getClientRect();

				let offsetLeft;

				const position =
					this.props.config.position || this.props.position;

				if (position === POSITION_LEFT) {
					offsetLeft =
						clientRect.left -
						domNode.offsetWidth -
						this.props.gutterExclusive.left +
						'px';
				} else {
					offsetLeft =
						clientRect.right +
						this.props.gutterExclusive.left +
						'px';
				}

				domNode.style.left = offsetLeft;

				domNode.style.top =
					Math.floor((region.bottom + region.top) / 2) + 'px';

				const uiNode = this.context.editor.get('uiNode');

				const scrollTop = uiNode ? uiNode.scrollTop : 0;

				if (nativeEditor.element.getStyle('overflow') !== 'auto') {
					domNode.style.top =
						Math.floor(
							region.top -
								domNode.offsetHeight / 2 +
								startRect.height / 2 +
								scrollTop
						) + 'px';
				} else {
					domNode.style.top =
						Math.floor(
							nativeEditor.element.$.offsetTop +
								startRect.height / 2 -
								domNode.offsetHeight / 2
						) + 'px';
				}

				domNode.style.opacity = 1;

				domElement.removeClass('ae-arrow-box');

				this.cancelAnimation();
			}
		}
	}
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default add
 * @memberof ToolbarAdd
 * @property {String} key
 * @static
 */
ToolbarAdd.key = 'add';

/**
 * Defines the constant for positioning the Toolbar on left of the editable area.
 *
 * @default 1
 * @memberof ToolbarAdd
 * @property {String} left
 * @static
 */
ToolbarAdd.left = POSITION_LEFT;

/**
 * Defines the constant for positioning the Toolbar on right of the editable area.
 *
 * @default 2
 * @memberof ToolbarAdd
 * @property {String} right
 * @static
 */
ToolbarAdd.right = POSITION_RIGHT;

/**
 * Lifecycle. Returns the default values of the properties used in the widget.
 *
 * @instance
 * @memberof ToolbarAdd
 * @method getDefaultProps
 * @return {Object} The default properties.
 */
ToolbarAdd.defaultProps = {
	circular: true,
	descendants: '.ae-button',
	gutterExclusive: {
		left: 10,
		top: 0,
	},
	keys: {
		dismiss: [27],
		next: [39, 40],
		prev: [37, 38],
	},
	position: POSITION_LEFT,
};

export default WidgetDropdown(
	WidgetExclusive(WidgetFocusManager(ToolbarButtons(ToolbarAdd)))
);
