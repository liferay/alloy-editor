import {useContext} from 'react';
import EditorContext from '../../adapter/editor-context';

/**
 * A hook that executes a command via CKEDITOR's API.
 */
export default function useExecCommand(command, modifiesSelection) {
	const editor = useContext(EditorContext).editor.get('nativeEditor');

	return data => {
		editor.execCommand(command, data);

		if (modifiesSelection) {
			editor.selectionChange(true);
		}

		// TODO: find out what relies on `this` here:
		editor.fire('actionPerformed', this);
	};
}
