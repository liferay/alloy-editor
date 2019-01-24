import ButtonEmbedVideoEdit from './button-embed-video-edit.jsx';
import ButtonIcon from './button-icon.jsx';
import ButtonProps from '../base/button-props.js';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * The ButtonEmbedVideo class provides functionality for changing text color in a document.
 *
 * @class ButtonEmbedVideo
 * @uses ButtonProps
 */
class ButtonEmbedVideo extends React.Component {
	static key = 'embedVideo';

	static propTypes = {
		/**
		 * The editor instance where the component is being used.
		 *
		 * @instance
		 * @memberof ButtonEmbedVideo
		 * @property {Object} editor
		 */
		editor: PropTypes.object.isRequired,

		/**
		 * The label that should be used for accessibility purposes.
		 *
		 * @instance
		 * @memberof ButtonEmbedVideo
		 * @property {String} label
		 */
		label: PropTypes.string,

		/**
		 * The tabIndex of the button in its toolbar current state. A value other than -1
		 * means that the button has focus and is the active element.
		 *
		 * @instance
		 * @memberof ButtonEmbedVideo
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
			return <ButtonEmbedVideoEdit {...this.props} />;
		} else {
			return (
				<button
					className="ae-button"
					data-type="button-embed-video"
					onClick={this.props.requestExclusive}
					tabIndex={this.props.tabIndex}>
					<ButtonIcon editor={this.props.editor} symbol="video" />
				</button>
			);
		}
	}
}

export default ButtonProps(ButtonEmbedVideo);
