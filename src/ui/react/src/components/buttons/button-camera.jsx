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
    var ButtonCamera = React.createClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default camera
             */
            key: 'camera'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
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
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

                return (
                    <button aria-label={AlloyEditor.Strings.camera} className="ae-button" data-type="button-image-camera" disabled={disabled} onClick={this.props.requestExclusive.bind(ButtonCamera.key)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.camera}>
                        <span className="ae-icon-camera"></span>
                    </button>
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonCamera.key] = AlloyEditor.ButtonCamera = ButtonCamera;
}());