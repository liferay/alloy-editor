(function () {
    'use strict';

    /**
     * The ButtonCamera class renders in two different ways:
     *
     * - Normal: Just a button that allows to switch to the edition mode.
     * - Exclusive: Renders ButtonCameraImage in order to take photo from the camera.
     *
     * @class ButtonCamera
     */
    var ButtonCamera = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             * @instance
             * @memberof ButtonCamera
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             * @instance
             * @memberof ButtonCamera
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             * @instance
             * @memberof ButtonCamera
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default camera
             * @memberof ButtonCamera
             * @property {String} key
             * @static
             */
            key: 'camera'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCamera
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    <AlloyEditor.ButtonCameraImage {...this.props} />
                );
            } else {
                var disabled = !(navigator.getUserMedia ||
                    (navigator.webkitGetUserMedia && location.protocol === 'https') ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

                var label = disabled ? AlloyEditor.Strings.cameraDisabled : AlloyEditor.Strings.camera;

                return (
                    <button aria-label={label} className="ae-button" data-type="button-image-camera" disabled={disabled} onClick={this.props.requestExclusive.bind(ButtonCamera.key)} tabIndex={this.props.tabIndex} title={label}>
                        <span className="ae-icon-camera"></span>
                    </button>
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonCamera.key] = AlloyEditor.ButtonCamera = ButtonCamera;
}());