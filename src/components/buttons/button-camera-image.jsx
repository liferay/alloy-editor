/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

import EditorContext from '../../adapter/editor-context';

/**
 * The ButtonCameraImage class takes photo from camera and inserts it to the content.
 *
 * @class ButtonCameraImage
 */
class ButtonCameraImage extends React.Component {
	static contextType = EditorContext;

	/**
	 * Lifecycle. Returns the default values of the properties used in the widget.
	 *
	 * @instance
	 * @memberof ButtonCameraImage
	 */
	static defaultProps = {
		videoWidth: 320,
	};

	/**
	 * The name which will be used as an alias of the button in the configuration.
	 *
	 * @default cameraImage
	 * @memberof ButtonCameraImage
	 * @property {String} key
	 * @static
	 */
	static key = 'cameraImage';

	constructor(props) {
		super(props);
		this._buttonTakePhotoRef = React.createRef();
		this._canvasContainerRef = React.createRef();
		this._videoContainerRef = React.createRef();
	}

	/**
	 * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
	 *
	 * Focuses the take photo button.
	 *
	 * @instance
	 * @memberof ButtonCameraImage
	 * @method componentDidMount
	 */
	componentDidMount() {
		this._buttonTakePhotoRef.current.focus();
	}

	/**
	 * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
	 *
	 * @instance
	 * @memberof ButtonCameraImage
	 * @method componentWillUnmount
	 */
	componentWillUnmount() {
		if (this._stream) {
			if (this._stream.stop) {
				this._stream.stop();
			} else if (this._stream.getVideoTracks) {
				this._stream.getVideoTracks().forEach(track => {
					track.stop();
				});
			}
			this._stream = null;
		}
	}

	/**
	 * Lifecycle. Renders the UI of the button.
	 *
	 * @instance
	 * @memberof ButtonCameraImage
	 * @method render
	 * @return {Object} The content which should be rendered.
	 */
	render() {
		const getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;

		getUserMedia.call(
			navigator,
			{
				video: true,
				audio: false,
			},
			this._handleStreamSuccess,
			this._handleStreamError
		);

		return (
			<div className="ae-camera">
				<video ref={this._videoContainerRef}>
					Video stream not available.
				</video>
				<button
					className="ae-camera-shoot"
					onClick={this.takePhoto}
					ref={this._buttonTakePhotoRef}>
					Take photo
				</button>
				<canvas
					className="ae-camera-canvas"
					ref={this._canvasContainerRef}
				/>
			</div>
		);
	}

	/**
	 * Takes photo from the video stream and inserts in into editor's content.
	 *
	 * @fires ButtonCameraImage#imageCameraAdd
	 * @instance
	 * @memberof ButtonCameraImage
	 * @method takePhoto
	 */
	takePhoto = () => {
		const videoEl = this._videoContainerRef.current;
		const canvasEl = this._canvasContainerRef.current;

		const context = canvasEl.getContext('2d');

		const height = this._videoHeight;
		const width = this.props.videoWidth;

		if (width && height) {
			canvasEl.width = width;
			canvasEl.height = height;

			context.drawImage(videoEl, 0, 0, width, height);

			const imgURL = canvasEl.toDataURL('image/png');

			const el = CKEDITOR.dom.element.createFromHtml(
				'<img src="' + imgURL + '">'
			);

			const editor = this.context.editor.get('nativeEditor');

			editor.insertElement(el);

			this.props.cancelExclusive();

			editor.fire('actionPerformed', this);

			editor.fire('imageCameraAdd', el);
		}
	};

	/**
	 * Displays error message in case of video stream capturing failure.
	 *
	 * @instance
	 * @memberof ButtonCameraImage
	 * @method _handleStreamError
	 * @param {Event} error The fired event in case of error.
	 * @protected
	 */
	_handleStreamError = error => {
		window.alert('An error occurred! ' + error);
	};

	/**
	 * Starts streaming video in the video element and sets width/height to the video
	 * and canvas elements.
	 *
	 * @instance
	 * @memberof ButtonCameraImage
	 * @method _handleStreamSuccess
	 * @param {Object} stream The video stream
	 * @protected
	 */
	_handleStreamSuccess = stream => {
		const videoEl = this._videoContainerRef.current;
		const canvasEl = this._canvasContainerRef.current;

		videoEl.addEventListener(
			'canplay',
			() => {
				let height =
					videoEl.videoHeight /
					(videoEl.videoWidth / this.props.videoWidth);

				if (isNaN(height)) {
					height = this.props.videoWidth / (4 / 3);
				}

				videoEl.setAttribute('width', this.props.videoWidth);
				videoEl.setAttribute('height', height);
				canvasEl.setAttribute('width', this.props.videoWidth);
				canvasEl.setAttribute('height', height);

				this._videoHeight = height;
			},
			false
		);

		this._stream = stream;

		if (navigator.mozGetUserMedia) {
			videoEl.mozSrcObject = stream;
		} else {
			videoEl.srcObject = stream;
		}

		videoEl.play();

		this._buttonTakePhotoRef.current.disabled = false;
	};

	/**
	 * Fired when an image is being taken from the camera and added as an element to the editor.
	 *
	 * @event ButtonCameraImage#imageCameraAdd
	 * @memberof ButtonCameraImage
	 * @param {CKEDITOR.dom.element} el The created img element in editor.
	 */
}

export default ButtonCameraImage;
