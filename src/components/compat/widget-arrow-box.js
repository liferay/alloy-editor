/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import Lang from '../../oop/lang';

/**
 * Provides functionality for displaying Widget Arrow box on top or on bottom of the widget
 * depending on the point of user interaction with the editor.
 *
 * @class WidgetArrowBox
 */
const WidgetArrowBox = {
	/**
	 * Returns the list of arrow box classes associated to the current element's state. It relies
	 * on the getInteractionPoint method to calculate the selection direction.
	 *
	 * @instance
	 * @memberof WidgetArrowBox
	 * @method getArrowBoxClasses
	 * @return {String} A string with the arrow box CSS classes.
	 */
	getArrowBoxClasses() {
		let arrowBoxClasses = 'ae-arrow-box';

		if (
			Lang.isFunction(this.getInteractionPoint) &&
			this.getInteractionPoint()
		) {
			if (
				this.getInteractionPoint().direction ===
				CKEDITOR.SELECTION_TOP_TO_BOTTOM
			) {
				arrowBoxClasses += ' ae-arrow-box-top';
			} else {
				arrowBoxClasses += ' ae-arrow-box-bottom';
			}
		}

		return arrowBoxClasses;
	},
};

export default WidgetArrowBox;
