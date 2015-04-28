(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */
    var ButtonImage = React.createClass({
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
                    <button className="alloy-editor-button" data-type="button-image" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                        <span className="alloy-editor-icon-image"></span>
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
            CKEDITOR.tools.simulate(React.findDOMNode(this.refs.fileInput), 'click');
        },

        /**
         * On input change, reads the chosen file and creates an img element with src as Data URI.
         * Then, fires an {{#crossLink "ButtonImage/imageadd:event"}}{{/crossLink}} via CKEditor's
         * message system.
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
         * @event imageadd
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
}());