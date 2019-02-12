import ButtonCommand from '../base/button-command.js';
import ButtonIcon from './button-icon.jsx';
import EditorContext from '../../adapter/editor-context';
import React from 'react';

/**
 * The ButtonRemoveImage class removes an image using a CKEDITOR.command.
 *
 * @class ButtonRemoveImage
 * @uses ButtonCommand
 */
class ButtonRemoveImage extends React.Component {
	static contextType = EditorContext;

	static defaultProps = {
		command: 'removeImage',
		modifiesSelection: true,
	};

	static key = 'removeImage';

	/**
	 * @inheritDoc
	 */
	constructor(props) {
		super(props);

		const nativeEditor = props.editor.get('nativeEditor');

		nativeEditor.addCommand('removeImage', {
			exec: editor => {
				const selection = editor.getSelection();
				if (selection) {
					const ranges = selection.getRanges();
					const startContainer = ranges[0].startContainer;
					const nextRange = new CKEDITOR.dom.range(startContainer);
					nextRange.setStart(startContainer, 0);
					nextRange.setEnd(startContainer, 0);

					const selectedElement = selection.getSelectedElement();
					if (
						selectedElement &&
						selectedElement.getName() === 'img'
					) {
						const native = selection.getNative();
						if (native) {
							native.removeAllRanges();
						}

						selection.selectRanges([nextRange]);

						selectedElement.remove();
					}
				}
			},
		});
	}

	/**
	 * @inheritDoc
	 */
	render() {
		return (
			<button className="ae-button" onClick={this.execCommand}>
				<ButtonIcon symbol="times-circle" />
			</button>
		);
	}
}

export default ButtonCommand(ButtonRemoveImage);
