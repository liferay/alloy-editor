/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import PropTypes from 'prop-types';
import React from 'react';

import ButtonKeystroke from '../base/button-keystroke';
import ButtonProps from '../base/button-props';
import ButtonLinkEditBrowse from './button-link-edit-browse.jsx';
import ButtonLink from './button-link.jsx';

/**
 * The ButtonLinkBrowse class provides functionality for changing text color in a document.
 *
 * @uses ButtonKeystroke
 * @uses ButtonProps
 *
 * @class ButtonLinkBrowse
 */
class ButtonLinkBrowse extends React.Component {
	static defaultProps = {
		keystroke: {
			fn: '_requestExclusive',
			keys: CKEDITOR.CTRL + 76 /* L*/,
			name: 'linkBrowse',
		},
	};

	static key = 'linkBrowse';

	static propTypes = {
		/**
		 * The label that should be used for accessibility purposes.
		 *
		 * @property {String} label
		 */
		label: PropTypes.string,

		/**
		 * The tabIndex of the button in its toolbar current state. A value other than -1
		 * means that the button has focus and is the active element.
		 *
		 * @property {Number} tabIndex
		 */
		tabIndex: PropTypes.number,
	};

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		if (this.props.renderExclusive) {
			this.props = this.mergeButtonCfgProps();

			return <ButtonLinkEditBrowse {...this.props} />;
		} else {
			return <ButtonLink {...this.props} />;
		}
	}

	/**
	 * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
	 *
	 * @protected
	 * @method _requestExclusive
	 */
	_requestExclusive() {
		this.props.requestExclusive(ButtonLinkBrowse.key);
	}
}

export default ButtonProps(ButtonKeystroke(ButtonLinkBrowse));
