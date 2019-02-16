import PropTypes from 'prop-types';
import React from 'react';
import ButtonLink from './button-link.jsx';
import ButtonLinkEditBrowse from './button-link-edit-browse.jsx';
import useButtonKeystroke from '../hooks/use-button-keystroke';
import useMergedProps from '../hooks/use-merged-props';

/**
 * The ButtonLinkBrowse component provides functionality for editing links in
 * the document.
 */
function ButtonLinkBrowse(props) {
	const {
		keystroke = {
			fn: () => {},
			keys: CKEDITOR.CTRL + 76 /* L*/,
			name: 'linkBrowse',
		},
		label,
		renderExclusive,
		requestExclusive,
		tabIndex,

		...restProps
	} = props;

	useButtonKeystroke({
		...keystroke,
		fn: () => requestExclusive(ButtonLinkBrowse.key),
	});

	const getMerged = useMergedProps(props);
	if (renderExclusive) {
		return <ButtonLinkEditBrowse {...getMerged()} />;
	} else {
		return <ButtonLink {...props} />;
	}
}

ButtonLinkBrowse.key = 'linkBrowse';

ButtonLinkBrowse.propTypes = {
	/**
	 * The label that should be used for accessibility purposes.
	 *
	 * @property {String} label
	 */
	label: PropTypes.string,

	/**
	 * The tabIndex of the button in its toolbar current state. A value
	 * other than -1 means that the button has focus and is the active
	 * element.
	 *
	 * @property {Number} tabIndex
	 */
	tabIndex: PropTypes.number,
};

export default ButtonLinkBrowse;
