/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

/**
 * The ButtonSeparator function renders a simple separator.
 */
function ButtonSeparator(_props) {
	return <span className="ae-separator" />;
}

/**
 * The name which will be used as an alias of the button in the configuration.
 *
 * @default separator
 * @memberof ButtonSeparator
 * @property {String} key
 * @static
 */
ButtonSeparator.key = 'separator';

export default ButtonSeparator;
