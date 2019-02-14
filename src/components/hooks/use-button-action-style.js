import {useContext} from 'react';
import useButtonStyle from './use-button-style';
import EditorContext from '../../adapter/editor-context';

/**
 * A hook that wraps the CKEDITOR `applyStyle` and removeStyle` API.
 */
export default function useButtonActionStyle(buttonStyle) {
	const editor = useContext(EditorContext).editor.get('nativeEditor');

	const [isActive, style] = useButtonStyle(buttonStyle);

	return function applyStyle() {
		editor.getSelection().lock();

		if (isActive) {
			editor.removeStyle(style);
		} else {
			editor.applyStyle(style);
		}

		editor.getSelection().unlock();

		editor.fire('actionPerformed');
	};
}
