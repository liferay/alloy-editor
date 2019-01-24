import ButtonKeystroke from '../base/button-keystroke.js';
import ButtonLink from './button-link.jsx';
import ButtonLinkEditBrowse from './button-link-edit-browse.jsx';
import ButtonProps from '../base/button-props.js';
import ButtonStateClasses from '../base/button-state-classes.js';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * The ButtonLinkBrowse class provides functionality for changing text color in a document.
 *
 * @uses ButtonKeystroke
 * @uses ButtonProps
 * @uses ButtonStateClasses
 *
 * @class ButtonLinkBrowse
 */
class ButtonLinkBrowse extends React.Component {
	static defaultProps = {
		keystroke: {
			fn: '_requestExclusive',
			keys: CKEDITOR.CTRL + 76 /* L*/,
		},
	};

	static key = 'linkBrowse';

	static propTypes = {
		/**
		 * The editor instance where the component is being used.
		 *
		 * @property {Object} editor
		 */
		editor: PropTypes.object.isRequired,

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
		this.props.requestExclusive(LinkBrowse.key);
	}
}

export default ButtonProps(
	ButtonStateClasses(ButtonKeystroke(ButtonLinkBrowse))
);
