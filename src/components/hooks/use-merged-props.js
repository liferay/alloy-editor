import {useContext} from 'react';
import EditorContext from '../../adapter/editor-context';

/**
 * useMergedProps is a hook that merges React props and the user's configuration
 * in the native CKEDITOR buttonCfg.
 */
export default function useMergedProps(props) {
	const editor = useContext(EditorContext).editor.get('nativeEditor');
	return function mergeConfig() {
		const buttonCfg = editor.config.buttonCfg || {};
		return CKEDITOR.tools.merge(props, buttonCfg['linkEdit']);
	};
}
