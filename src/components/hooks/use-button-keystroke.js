import {useContext, useEffect, useRef} from 'react';
import EditorContext from '../../adapter/editor-context';
import Lang from '../../oop/lang';

/**
 * useButtonKeystroke is a hook for processing a `keystroke` prop that
 * configures a function to be invoked upon the keystroke activation.
 */
export default function useButtonKeystroke(keystroke) {
	const editor = useContext(EditorContext).editor.get('nativeEditor');
	const defaultKeystrokeCommand = useRef();
	useEffect(function mount() {
		const commandName = `keystroke:${keystroke.name}`;

		let command = editor.getCommand(commandName);

		if (!command) {
			command = new CKEDITOR.command(editor, {
				exec: keystroke.fn,
			});

			editor.addCommand(commandName, command);
		}

		defaultKeystrokeCommand.current =
			editor.keystrokeHandler.keystrokes[keystroke.keys];

		editor.setKeystroke(keystroke.keys, commandName);

		return function unmount() {
			editor.setKeystroke(
				keystroke.keys,
				defaultKeystrokeCommand.current
			);
		};
	}, []);
}
