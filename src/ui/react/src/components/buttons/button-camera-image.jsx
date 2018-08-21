(function () {
    'use strict';

    /**
     * The ButtonCameraImage class takes photo from camera and inserts it to the content.
     *
     * @class ButtonCameraImage
     */
    var ButtonCameraImage = createReactClass({
        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default cameraImage
             * @memberof ButtonCameraImage
             * @property {String} key
             * @static
             */
            key: 'cameraImage'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method getDefaultProps
         */
        getDefaultProps: function () {
            return {
                videoWidth: 320
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses the take photo button.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method componentDidMount
         */
        componentDidMount: function () {
            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).focus();
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method componentWillUnmount
         */
        componentWillUnmount: function() {
            if (this._stream) {
                if (this._stream.stop) {
                    this._stream.stop();
                } else if (this._stream.getVideoTracks) {
                    this._stream.getVideoTracks().forEach(function(track) {
                        track.stop();
                    });
                }
                this._stream = null;
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            getUserMedia.call(navigator, {
                video: true,
                audio: false
            }, this._handleStreamSuccess, this._handleStreamError);

            return (
                <div className="ae-camera">
                    <video ref="videoContainer">Video stream not available.</video>
                    <button className="ae-camera-shoot" onClick={this.takePhoto} ref="buttonTakePhoto">Take photo</button>
                    <canvas className="ae-camera-canvas" ref="canvasContainer"></canvas>
                </div>
            );
        },

        /**
         * Takes photo from the video stream and inserts in into editor's content.
         *
         * @fires ButtonCameraImage#imageCameraAdd
         * @instance
         * @memberof ButtonCameraImage
         * @method takePhoto
         */
        takePhoto: function() {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);

            var context = canvasEl.getContext('2d');

            var height = this._videoHeight;
            var width = this.props.videoWidth;

            if (width && height) {
                canvasEl.width = width;
                canvasEl.height = height;

                context.drawImage(videoEl, 0, 0, width, height);

                var imgURL = canvasEl.toDataURL('image/png');

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + imgURL + '">');

                var editor = this.props.editor.get('nativeEditor');

                editor.insertElement(el);

                this.props.cancelExclusive();

                editor.fire('actionPerformed', this);

                editor.fire('imageCameraAdd', el);
            }
        },

        /**
         * Displays error message in case of video stream capturing failure.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method _handleStreamError
         * @param {Event} error The fired event in case of error.
         * @protected
         */
        _handleStreamError: function(error) {
            window.alert('An error occurred! ' + error);
        },

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
        _handleStreamSuccess: function(stream) {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);

            videoEl.addEventListener('canplay', function(event) {
                var height = videoEl.videoHeight / (videoEl.videoWidth/this.props.videoWidth);

                if (isNaN(height)) {
                    height = this.props.videoWidth / (4/3);
                }

                videoEl.setAttribute('width', this.props.videoWidth);
                videoEl.setAttribute('height', height);
                canvasEl.setAttribute('width', this.props.videoWidth);
                canvasEl.setAttribute('height', height);

                this._videoHeight = height;
            }.bind(this), false);

            this._stream = stream;

            if (navigator.mozGetUserMedia) {
                videoEl.mozSrcObject = stream;
            } else {
                videoEl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            videoEl.play();

            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).disabled = false;
        }

        /**
         * Fired when an image is being taken from the camera and added as an element to the editor.
         *
         * @event ButtonCameraImage#imageCameraAdd
         * @memberof ButtonCameraImage
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    AlloyEditor.ButtonCameraImage = ButtonCameraImage;
}());