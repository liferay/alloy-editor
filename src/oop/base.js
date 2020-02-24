/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import Attribute from './attribute';
import Lang from './lang';
import extend from './oop';

/**
 * Quick and dirty impl of Base class.
 *
 * @class Base
 * @constructor
 */
function Base(config) {
	Base.superclass.constructor.call(this, config);

	this.init(config);
}

extend(Base, Attribute, {
	/**
	 * Calls the `initializer` method of each class which extends Base starting from the parent to the child.
	 * Will pass the configuration object to each initializer method.
	 *
	 * @instance
	 * @memberof Base
	 * @method init
	 * @param {Object} config Configuration object
	 */
	init(config) {
		this._callChain('initializer', config);
	},

	/**
	 * Calls the `destructor` method of each class which extends Base starting from the parent to the child.
	 *
	 * @instance
	 * @memberof Base
	 * @method destroy
	 */
	destroy() {
		this._callChain('destructor');
	},

	/**
	 * Calls a method of each class, which is being present in the hierarchy starting from parent to the child.
	 *
	 * @instance
	 * @memberof Base
	 * @method _callChain
	 * @param {Object|Array} args The arguments with which the method should be invoked
	 * @param {String} wat  The method, which should be invoked
	 * @protected
	 */
	_callChain(wat, args) {
		let arr = [];

		let ctor = this.constructor;

		while (ctor) {
			if (Lang.isFunction(ctor.prototype[wat])) {
				arr.push(ctor.prototype[wat]);
			}

			ctor = ctor.superclass ? ctor.superclass.constructor : null;
		}

		arr = arr.reverse();

		args = Lang.isArray(args) ? args : [args];

		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];

			item.apply(this, args);
		}
	},
});

export default Base;
