/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Lang from '../../oop/lang';

const DIRECTION_NONE = 0;
const DIRECTION_NEXT = 1;
const DIRECTION_PREV = -1;

const ACTION_NONE = 0;
const ACTION_MOVE_FOCUS = 1;
const ACTION_DISMISS_FOCUS = 2;

/**
 * WidgetFocusManager is a mixin that provides keyboard navigation inside a widget. To do this,
 * it exposes the following props and methods:
 *
 * @class WidgetFocusManager
 */
const WidgetFocusManager = {
	// Allows validating props being passed to the component.

	propTypes: {
		/**
		 * Callback method to be invoked when the focus manager is to be dismissed. This happens
		 * in the following scenarios if a dismiss callback has been specified:
		 * - A dismiss key has been pressed
		 * - In a non-circular focus manager, when:
		 *     - The active descendant is the first one and a prev key has been pressed.
		 *     - The active descendant is the last one and a next key has been pressed.
		 *
		 * @instance
		 * @memberof WidgetFocusManager
		 * @property {Function} onDismiss
		 */
		onDismiss: PropTypes.func,

		/**
		 * Indicates if focus should be set to the first/last descendant when the limits are reached.
		 *
		 * @instance
		 * @memberof WidgetFocusManager
		 * @property {boolean} circular
		 */
		circular: PropTypes.bool.isRequired,

		/**
		 * Indicate if should focus the first child of a container
		 * @instance
		 * @memberof WidgetFocusManager
		 * @property {Boolean} focusFirstChild
		 */
		focusFirstChild: PropTypes.bool,

		/**
		 * String representing the CSS selector used to define the elements that should be handled.
		 *
		 * @instance
		 * @memberof WidgetFocusManager
		 * @property {String} descendants
		 */
		descendants: PropTypes.string.isRequired,

		/**
		 * Object representing the keys used to navigate between descendants. The format for the prop is:
		 * `{dismiss: value, dismissNext: value, dismissPrev: value, next: value, prev: value}` where
		 * value can be both a number or an array of numbers with the allowed keyCodes.
		 *
		 * @instance
		 * @memberof WidgetFocusManager
		 * @property {Object} keys
		 */
		keys: PropTypes.object.isRequired,
	},

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method componentDidMount
	 */
	componentDidMount() {
		this._refresh();
	},

	/**
	 * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
	 * Refreshes the descendants list.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method componentDidUpdate
	 */
	componentDidUpdate() {
		this._refresh();
	},

	/**
	 * Focuses the current active descendant.
	 *
	 * Several Widgets can be nested in a component hierarchy by attaching this focus method to
	 * the widget DOM node, transferring the DOM focus control to the inner FocusManager.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method focus
	 */
	focus(event) {
		if (!event || this._isValidTarget(event.target)) {
			if (this._descendants && this._descendants.length) {
				const activeDescendantEl = this._descendants[
					this._activeDescendant
				];

				// When user clicks with the mouse, the activeElement is already set and there
				// is no need to focus it. Focusing of the active descendant (usually some button) is required
				// in case of keyboard navigation, because the focused element might be not the first button,
				// but the div element, which contains the button.

				if (
					document.activeElement !== activeDescendantEl &&
					!this.props.focusFirstChild
				) {
					if (
						this._descendants.indexOf(document.activeElement) === -1
					) {
						activeDescendantEl.focus();
					}
				}

				if (event) {
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	},

	/**
	 * Handles the key events on a DOM node to execute the appropriate navigation when needed.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @param {Object} event The Keyboard event that was detected on the widget DOM node.
	 * @method handleKey
	 */
	handleKey(event) {
		if (this._isValidTarget(event.target) && this._descendants) {
			const action = this._getFocusAction(event);

			if (action.type) {
				event.stopPropagation();
				event.preventDefault();

				if (action.type === ACTION_MOVE_FOCUS) {
					this._moveFocus(action.direction);
				}

				if (action.type === ACTION_DISMISS_FOCUS) {
					this.props.onDismiss(action.direction);
				}
			}
		}
	},

	/**
	 * Moves the focus among descendants in the especified direction.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method moveFocus
	 * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
	 */
	moveFocus(direction) {
		direction = Lang.isNumber(direction) ? direction : 0;

		this._moveFocus(direction);
	},

	/**
	 * Returns the action, if any, that a keyboard event in the current focus manager state
	 * should produce.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _getFocusAction
	 * @param {object} event The Keyboard event.
	 * @protected
	 * @return {Object} An action object with type and direction properties.
	 */
	_getFocusAction(event) {
		const action = {
			type: ACTION_NONE,
		};

		if (this.props.keys) {
			const direction = this._getFocusMoveDirection(event);

			if (direction) {
				action.direction = direction;
				action.type = ACTION_MOVE_FOCUS;
			}

			const dismissAction = this._getFocusDismissAction(event, direction);

			if (dismissAction.dismiss) {
				action.direction = dismissAction.direction;
				action.type = ACTION_DISMISS_FOCUS;
			}
		}

		return action;
	},

	/**
	 * Returns the dismiss action, if any, the focus manager should execute to yield the focus. This
	 * will happen in any of these scenarios if a dismiss callback has been specified:
	 * - A dismiss key has been pressed
	 * - In a non-circular focus manager, when:
	 *     - The active descendant is the first one and a prev key has been pressed.
	 *     - The active descendant is the last one and a next key has been pressed.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _getFocusDismissAction
	 * @param {Number} focusMoveDirection The focus movement direction (if any).
	 * @param {Object} event The Keyboard event.
	 * @protected
	 * @return {Object} A dismiss action with dismiss and direction properties.
	 */
	_getFocusDismissAction(event, focusMoveDirection) {
		const dismissAction = {
			direction: focusMoveDirection,
			dismiss: false,
		};

		if (this.props.onDismiss) {
			if (this._isValidKey(event.keyCode, this.props.keys.dismiss)) {
				dismissAction.dismiss = true;
			}
			if (this._isValidKey(event.keyCode, this.props.keys.dismissNext)) {
				dismissAction.dismiss = true;
				dismissAction.direction = DIRECTION_NEXT;
			}
			if (this._isValidKey(event.keyCode, this.props.keys.dismissPrev)) {
				dismissAction.dismiss = true;
				dismissAction.direction = DIRECTION_PREV;
			}

			if (
				!dismissAction.dismiss &&
				!this.props.circular &&
				focusMoveDirection
			) {
				dismissAction.dismiss =
					(focusMoveDirection === DIRECTION_PREV &&
						this._activeDescendant === 0) ||
					(focusMoveDirection === DIRECTION_NEXT &&
						this._activeDescendant ===
							this._descendants.length - 1);
			}
		}

		return dismissAction;
	},

	/**
	 * Returns the direction, if any, in which the focus should be moved. In presence of the
	 * shift key modifier, the direction of the movement is inverted.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _getFocusMoveDirection
	 * @param {Object} event The Keyboard event.
	 * @protected
	 * @return {Number} The computed direction of the expected focus movement.
	 */
	_getFocusMoveDirection(event) {
		let direction = DIRECTION_NONE;

		if (this._isValidKey(event.keyCode, this.props.keys.next)) {
			direction = DIRECTION_NEXT;
		}
		if (this._isValidKey(event.keyCode, this.props.keys.prev)) {
			direction = DIRECTION_PREV;
		}

		if (event.shifKey) {
			direction *= -1;
		}

		return direction;
	},

	/**
	 * Indicates if a given keyCode is valid for the given set of keys.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _isValidKey
	 * @param {Array|Number} keys A key set. Can be a number an array of numbers representing the allowed keyCodes.
	 * @param {Number} keyCode An event keyCode.
	 * @protected
	 * @return {Boolean} A boolean value indicating if the key is valid.
	 */
	_isValidKey(keyCode, keys) {
		return Lang.isArray(keys)
			? keys.indexOf(keyCode) !== -1
			: keyCode === keys;
	},

	/**
	 * Indicates if a given element is valid for focus management. User input elements such as
	 * input, select or textarea are excluded.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _isValidKey
	 * @param {DOMNode} element A DOM element.
	 * @protected
	 * @return {Boolean} A boolean value indicating if the element is valid.
	 */
	_isValidTarget(element) {
		const tagName = element.tagName.toLowerCase();

		return (
			tagName !== 'input' &&
			tagName !== 'select' &&
			tagName !== 'textarea'
		);
	},

	/**
	 * Moves the focus among descendants in the especified direction.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _moveFocus
	 * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
	 * @protected
	 */
	_moveFocus(direction) {
		const numDescendants = this._descendants.length;

		let descendant = this._descendants[this._activeDescendant];

		descendant.setAttribute('tabIndex', -1);

		this._activeDescendant += direction;

		if (this.props.circular) {
			// Calculate proper modulo result since remainder operator doesn't behave in the
			// same way for negative numbers

			this._activeDescendant =
				((this._activeDescendant % numDescendants) + numDescendants) %
				numDescendants;
		} else {
			this._activeDescendant = Math.max(
				Math.min(this._activeDescendant, numDescendants - 1),
				0
			);
		}

		descendant = this._descendants[this._activeDescendant];

		descendant.setAttribute('tabIndex', 0);
		descendant.focus();
	},

	/**
	 * Refreshes the descendants list by executing the CSS selector again and resets the descendants tabIndex.
	 *
	 * @instance
	 * @memberof WidgetFocusManager
	 * @method _refresh
	 * @protected
	 */
	_refresh() {
		const domNode = ReactDOM.findDOMNode(this);

		if (domNode) {
			const descendants = domNode.querySelectorAll(
				this.props.descendants
			);

			let priorityDescendants = [];

			this._descendants = [];

			Array.prototype.slice.call(descendants).forEach(item => {
				const dataTabIndex = item.getAttribute('data-tabindex');

				if (dataTabIndex) {
					priorityDescendants.push(item);
				} else {
					this._descendants.push(item);
				}
			});

			priorityDescendants = priorityDescendants.sort((a, b) => {
				return (
					Lang.toInt(a.getAttribute('data-tabindex')) >
					Lang.toInt(b.getAttribute('data-tabindex'))
				);
			});

			this._descendants = priorityDescendants.concat(this._descendants);

			this._activeDescendant = 0;

			this._descendants.some((item, index) => {
				if (item.getAttribute('tabindex') === '0') {
					this._activeDescendant = index;
					this.focus();

					return true;
				}
			});
		}
	},
};

export default WidgetFocusManager;
