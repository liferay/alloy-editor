(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */
    var ButtonImage = React.createClass({
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
             * @default image
             */
            key: 'image'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
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

                    <input onChange={this._onInputChange} ref="fileInput" style={inputSyle} type="file" />
                </div>
            );
        },

        /**
         * Simulates click on the input element. This will open browser's native file open dialog.
         *
         * @method handleClick
         * @param {SyntheticEvent} event The received click event on the button.
         */
        handleClick: function(event) {
            React.findDOMNode(this.refs.fileInput).click();
        },

        /**
         * On input change, reads the chosen file and creates an img element with src the image data as Data URI.
         * Then, fires an {{#crossLink "ButtonImage/imageAdd:event"}}{{/crossLink}} via CKEditor's
         * message system. The passed params will be:
         * - `el` - the created img element
         * - `file` - the original image file from the input element
         *
         * @protected
         * @method _onInputChange
         */
        _onInputChange: function() {
            var reader = new FileReader();
            var inputEl = React.findDOMNode(this.refs.fileInput);

            reader.onload = function(event) {
                var editor = this.props.editor.get('nativeEditor');

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                editor.insertElement(el);

                editor.fire('actionPerformed', this);

                var imageData = {
                    el: el,
                    file: inputEl.files[0]
                };

                editor.fire('imageAdd', imageData);
            }.bind(this);

            reader.readAsDataURL(inputEl.files[0]);

            inputEl.value = '';
        }

        /**
         * Fired when an image file is added as an element to the editor.
         *
         * @event imageAdd
         * @param {CKEDITOR.dom.element} el The created image with src as Data URI.
         */
    });

    AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
}());