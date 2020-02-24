/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

/**
 * Debounce util function. If a function execution is expensive, it might be debounced. This means
 * that it will be executed after some amount of time after its last call. For example, if we attach a
 * a function on scroll event, it might be called hundreds times per second. In this case it may be
 * debounced with, let's say 100ms. The real execution of this function will happen 100ms after last
 * scroll event.
 *
 * @memberof CKEDITOR.tools
 * @method debounce
 * @param {Array} args An array of arguments which the callback will receive.
 * @param {Function} callback The callback which has to be called after given timeout.
 * @param {Number} timeout Timeout in milliseconds after which the callback will be called.
 * @param {Object} context The context in which the callback will be called. This argument is optional.
 * @static
 */
function debounce(callback, timeout, context, args = []) {
	let debounceHandle;

	const callFn = function(...callArgs) {
		/* eslint-disable no-invalid-this */
		const callContext = context || this;
		/* eslint-enable no-invalid-this */

		clearTimeout(debounceHandle);

		debounceHandle = setTimeout(() => {
			callback.apply(callContext, [...callArgs, ...args]);
		}, timeout);
	};

	callFn.detach = function() {
		clearTimeout(debounceHandle);
	};

	return callFn;
}

CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || debounce;

export default debounce;
