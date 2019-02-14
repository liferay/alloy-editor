import {useContext, useMemo} from 'react';
import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';

/**
 * A hook that provides a style prop and some methods to apply the resulting
 * style and checking if it is present in a given path or selection.
 */
export default function useButtonStyle(buttonStyle) {
	const editor = useContext(EditorContext).editor.get('nativeEditor');

	const style = useMemo(
		() => {
			if (Lang.isString(buttonStyle)) {
				const parts = buttonStyle.split('.');
				let currentMember = editor.config;
				let property = parts.shift();

				while (
					property &&
					Lang.isObject(currentMember) &&
					Lang.isObject(currentMember[property])
				) {
					currentMember = currentMember[property];
					property = parts.shift();
				}

				if (Lang.isObject(currentMember)) {
					buttonStyle = currentMember;
				}
			}

			return new CKEDITOR.style(buttonStyle);
		},
		[buttonStyle]
	);

	const elementPath = editor.elementPath();
	const isActive = style.checkActive(elementPath, editor);

	return [isActive, style];
}
