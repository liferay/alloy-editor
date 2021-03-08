/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import Lang from '../../oop/lang';

/**
 * ButtonStateClasses is a mixin that decorates the domElement of a component
 * with different CSS classes based on the current state of the element.
 *
 * To check for state, the component can expose the following methods:
 * - `Function` **isActive** to check the active state
 *
 * @class ButtonStateClasses
 */
export default WrappedComponent =>
	class ButtonStateClasses extends WrappedComponent {
		/**
		 * Returns the list of state classes associated to the current element's state, according
		 * to the results of the isActive method.
		 *
		 * @instance
		 * @memberof ButtonStateClasses
		 * @method getStateClasses
		 * @return {String} A string with the state CSS classes.
		 */
		getStateClasses() {
			let stateClasses = '';

			// Check for active state

			if (Lang.isFunction(this.isActive) && this.isActive()) {
				stateClasses += 'ae-button-pressed';
			}

			return stateClasses;
		}
	};
