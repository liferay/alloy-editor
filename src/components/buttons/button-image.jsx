import ButtonIcon from './button-icon.jsx';
import React from 'react';

/**
 * The ButtonImage class inserts an image to the content.
 *
 * @class ButtonImage
 */
class ButtonImage extends React.Component {
    /**
     * The name which will be used as an alias of the button in the configuration.
     *
     * @default image
     * @memberof ButtonImage
     * @property {String} key
     * @static
     */
    static key = 'image';

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @instance
     * @memberof ButtonImage
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        var inputSyle = {display: 'none'};

        return (
            <div>
                <button aria-label={AlloyEditor.Strings.image} className="ae-button" data-type="button-image" onClick={this.handleClick.bind(this)} tabIndex={this.props.tabIndex} title={AlloyEditor.Strings.image}>
                    <ButtonIcon editor={this.props.editor} symbol="document-image" />
                </button>

                <input accept="image/*" onChange={this._onInputChange.bind(this)} ref={this.fileInput} style={inputSyle} type="file"/>
            </div>
        );
    }

    /**
     * Simulates click on the input element. This will open browser's native file open dialog.
     *
     * @instance
     * @memberof ButtonImage
     * @method handleClick
     * @param {SyntheticEvent} event The received click event on the button.
     */
    handleClick() {
        this.fileInput.current.click();
    }

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
    _onInputChange() {
        var inputEl = this.fileInput.current;

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
}

export default ButtonImage;
