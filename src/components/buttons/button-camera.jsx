/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import ButtonCameraImage from './button-camera-image.jsx';
import ButtonIcon from './button-icon.jsx';

/**
 * The ButtonCamera class renders in two different ways:
 *
 * - Normal: Just a button that allows to switch to the edition mode.
 * - Exclusive: Renders ButtonCameraImage in order to take photo from the camera.
 *
 * @class ButtonCamera
 */
class ButtonCamera extends React.Component {
	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default camera
	 * @memberof ButtonCamera
	 * @property {String} key
	 * @static
	 */
	static key = 'camera';

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonCamera
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		if (this.props.renderExclusive) {
			return <ButtonCameraImage {...this.props} />;
		} else {
			const disabled = !(
				navigator.getUserMedia ||
				(navigator.webkitGetUserMedia &&
					location.protocol === 'https') ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia
			);

			const label = disabled
				? AlloyEditor.Strings.cameraDisabled
				: AlloyEditor.Strings.camera;

			return (
				<button
					aria-label={label}
					className="ae-button"
					data-type="button-image-camera"
					disabled={disabled}
					onClick={this.props.requestExclusive.bind(ButtonCamera.key)}
					tabIndex={this.props.tabIndex}
					title={label}>
					<ButtonIcon symbol="camera" />
				</button>
			);
		}
	}
}

export default ButtonCamera;
