(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */
    var ButtonImage = React.createClass({
        mixins: [global.ButtonStateClasses],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'image'
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function() {
            if (this._inputEl) {
                this._inputEl.parentNode.removeChild(this._inputEl);

                this._inputEl = null;
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (!this._inputEl) {
                var el = document.createElement('input');
                el.setAttribute('type', 'file');
                el.setAttribute('style', 'display: none;');

                this._inputEl = document.body.insertBefore(el, document.body.firstChild);

                this._inputEl.addEventListener('change', this._onInputChange);
            }

            return (
                <button className="alloy-editor-button" data-type="button-image" onClick={this.handleClick} tabIndex={this.props.tabIndex}>
                    <span className="alloy-editor-icon-image"></span>
                </button>
            );
        },

        /**
         * Simulates click on the input element. This will open browser's native file open dialog.
         *
         * @param {SyntheticEvent} event The received click event on the button.
         */
        handleClick: function(event) {
            CKEDITOR.tools.simulate(this._inputEl, 'click');
        },

        /**
         * On input change, reads the chosen file and creates an img element with src as Data URI.
         * Then, fires an {{#crossLink "ButtonImage/imageadd:event"}}{{/crossLink}} via CKEditor's
         * message system.
         *
         * @method _onInputChange
         * @protected
         */
        _onInputChange: function() {
            var reader = new FileReader();

            reader.onload = function(event) {
                var editor = this.props.editor.get('nativeEditor');

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                editor.insertElement(el);

                var imageData = {
                    el: el,
                    file: this._inputEl.files[0]
                };

                editor.fire('imageadd', imageData);
            }.bind(this);

            reader.readAsDataURL(this._inputEl.files[0]);

            this._inputEl.value = '';
        }

        /**
         * Fired when an image file is added as an element in the editor.
         *
         * @event imageadd
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    global.AlloyEditor.Buttons[ButtonImage.key] = global.AlloyEditor.ButtonImage = ButtonImage;
}());