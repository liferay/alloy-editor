/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';

/**
 * Provides functionality for calculating the point of interaction of the user with the Editor.
 *
 * @class WidgetInteractionPoint
 */
const WidgetInteractionPoint = {
	// Allows validating props being passed to the component.

	propTypes: {
		/**
		 * The provided editor event.
		 *
		 * @instance
		 * @memberof WidgetInteractionPoint
		 * @property {SyntheticEvent} editorEvent
		 */
		editorEvent: PropTypes.object,
	},

	/**
	 * Returns the position, in page coordinates, according to which a widget should appear.
	 * Depending on the direction of the selection, the wdiget may appear above of or on bottom of the selection.
	 *
	 * It depends on the props editorEvent to analyze the following user-interaction parameters:
	 * - {Object} selectionData The data about the selection in the editor as returned from
	 * {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
	 * - {Number} pos Contains the coordinates of the position, considered as most appropriate.
	 * This may be the point where the user released the mouse, or just the beginning or the end of
	 * the selection.
	 *
	 * @instance
	 * @memberof WidgetInteractionPoint
	 * @method getInteractionPoint
	 * @return {Object} An Object which contains the following properties:
	 * direction, x, y, where x and y are in page coordinates and direction can be one of these:
	 * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
	 */
	getInteractionPoint() {
		const eventPayload = this.props.editorEvent
			? this.props.editorEvent.data
			: null;

		if (!eventPayload) {
			return;
		}

		const selectionData = eventPayload.selectionData;

		const nativeEvent = eventPayload.nativeEvent;

		const pos = {
			x: eventPayload.nativeEvent.pageX,
			y: selectionData.region.top,
		};

		let direction = selectionData.region.direction;

		const endRect = selectionData.region.endRect;

		const startRect = selectionData.region.startRect;

		if (endRect && startRect && startRect.top === endRect.top) {
			direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
		}

		let x;
		let y;

		// If we have the point where user released the mouse, show Toolbar at this point
		// otherwise show it on the middle of the selection.

		if (pos.x && pos.y) {
			x = this._getXPoint(selectionData, pos.x);

			if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
				y = Math.min(pos.y, selectionData.region.top);
			} else {
				y = Math.max(
					pos.y,
					this._getYPoint(selectionData, nativeEvent)
				);
			}
		} else {
			x = selectionData.region.left + selectionData.region.width / 2;

			if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
				y = this._getYPoint(selectionData, nativeEvent);
			} else {
				y = selectionData.region.top;
			}
		}

		return {
			direction,
			x,
			y,
		};
	},

	/**
	 * Returns the position of the Widget.
	 *
	 * @instance
	 * @memberof WidgetInteractionPoint
	 * @method _getXPoint
	 * @param {Object} eventX The X coordinate received from the native event (mouseup).
	 * @param {Object} selectionData The data about the selection in the editor as returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
	 * @protected
	 * @return {Number} The calculated X point in page coordinates.
	 */
	_getXPoint(selectionData, eventX) {
		const region = selectionData.region;

		const left = region.startRect ? region.startRect.left : region.left;
		const right = region.endRect ? region.endRect.right : region.right;

		let x;

		if (left < eventX && right > eventX) {
			x = eventX;
		} else {
			const leftDist = Math.abs(left - eventX);
			const rightDist = Math.abs(right - eventX);

			if (leftDist < rightDist) {
				// user raised the mouse on left on the selection

				x = left;
			} else {
				x = right;
			}
		}

		return x;
	},

	/**
	 * Returns the position of the Widget.
	 *
	 * @instance
	 * @memberof WidgetInteractionPoint
	 * @method _getYPoint
	 * @param {Object} nativeEvent The data about event is fired
	 * @param {Object} selectionData The data about the selection in the editor as returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
	 * @protected
	 * @return {Number} The calculated Y point in page coordinates.
	 */
	_getYPoint(selectionData, nativeEvent) {
		let y = 0;

		if (selectionData && nativeEvent) {
			const elementTarget = new CKEDITOR.dom.element(nativeEvent.target);

			if (
				elementTarget.$ &&
				elementTarget.getStyle('overflow') === 'auto'
			) {
				y =
					nativeEvent.target.offsetTop +
					nativeEvent.target.offsetHeight;
			} else {
				y = selectionData.region.bottom;
			}
		}

		return y;
	},
};

export default WidgetInteractionPoint;
