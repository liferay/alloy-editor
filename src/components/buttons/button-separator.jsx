import React from 'react';

/**
 * The ButtonSeparator function renders a simple separator.
 */
function ButtonSeparator(props) {
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
