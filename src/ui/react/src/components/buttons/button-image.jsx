(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */
    var ButtonImage = createReactClass({
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonImage
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonImage
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonImage
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default image
             * @memberof ButtonImage
             * @property {String} key
             * @static
             */
            key: 'image'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonImage
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var inputSyle = {display: 'none'};

            return (
                <div>
                    <button aria-label={AlloyEditor.Strings.image} className="ae-button" data-type="button-image" onClick={this.handleClick} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.image}>
                        <span className="ae-icon-image"></span>
                    </button>

                    <input accept="image/*" onChange={this._onInputChange} ref="fileInput" style={inputSyle} type="file"/>
                </div>
            );
        },

        /**
         * Simulates click on the input element. This will open browser's native file open dialog.
         *
         * @instance
         * @memberof ButtonImage
         * @method handleClick
         * @param {SyntheticEvent} event The received click event on the button.
         */
        handleClick: function(event) {
            ReactDOM.findDOMNode(this.refs.fileInput).click();
        },

        /**
         * On input change, reads the chosen file and fires an event `beforeImageAdd` with the image which will be added
         * to the content. The image file will be passed in the `imageFiles` property.
         * If any of the listeners returns `false` or cancels the event, the image won't be added to the content.
         * Otherwise, an event `imageAdd` will be fired with the inserted element into the editable area.
         * The passed params will be:
         * - `el` - the created img element
         * - `file` - the original image file from the input element
         *
         * @fires ButtonImage#beforeImageAdd
         * @fires ButtonImage#imageAdd
         * @instance
         * @memberof ButtonImage
         * @method _onInputChange
         * @protected
         */
        _onInputChange: function() {
            var inputEl = ReactDOM.findDOMNode(this.refs.fileInput);

            // On IE11 the function might be called with an empty array of
            // files. In such a case, no actions will be taken.
            if (!inputEl.files.length) {
                return;
            }

            var reader = new FileReader();
            var file = inputEl.files[0];

            reader.onload = function(event) {
                var editor = this.props.editor.get('nativeEditor');

                var result = editor.fire('beforeImageAdd', {
                    imageFiles: file
                });

                if (!!result) {
                    var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                    editor.insertElement(el);

                    editor.fire('actionPerformed', this);

                    var imageData = {
                        el: el,
                        file: file
                    };


                    editor.fire('imageAdd', imageData);
                }
            }.bind(this);

            reader.readAsDataURL(file);

            inputEl.value = '';
        }

        /**
         * Fired before adding images to the editor.
         *
         * @event ButtonImage#beforeImageAdd
         * @instance
         * @memberof ButtonImage
         * @param {Array} imageFiles Array of image files
         */

        /**
         * Fired when an image is being added to the editor successfully.
         *
         * @event ButtonImage#imageAdd
         * @instance
         * @memberof ButtonImage
         * @param {CKEDITOR.dom.element} el The created image with src as Data URI
         * @param {File} file The image file
         */
    });

    AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
}());