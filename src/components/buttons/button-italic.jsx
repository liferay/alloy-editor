import React from 'react';
import ButtonIcon from './button-icon.jsx';
import useExecCommand from '../hooks/use-exec-command';
import useButtonStateClasses from '../hooks/use-button-state-classes';
import useButtonStyle from '../hooks/use-button-style';
import useButtonKeystroke from '../hooks/use-button-keystroke';

/**
 * The ButtonItalic component provides functionality for styling a
 * selection with italic (em) style.
 */
function ButtonItalic({
	command = 'italic',
	keystroke = {
		// TODO: given that this property can't be given a meaningful default
		// value, consider not providing it.
		fn: () => {},
		keys: CKEDITOR.CTRL + 73 /* I*/,
		name: 'italic',
	},
	style = 'coreStyles_italic',

	// TODO: kill this feature? nobody ever passes this prop
	modifiesSelection,

	tabIndex,
}) {
	const execCommand = useExecCommand(command, modifiesSelection);
	const stateClasses = useButtonStateClasses(style);
	const [isActive, _style] = useButtonStyle(style);
	const classNames = `ae-button ${stateClasses}`;

	useButtonKeystroke({
		...keystroke,
		fn: execCommand,
	});

	return (
		<button
			aria-label={AlloyEditor.Strings.italic}
			aria-pressed={isActive}
			className={classNames}
			data-type="button-italic"
			onClick={execCommand}
			tabIndex={tabIndex}
			title={AlloyEditor.Strings.italic}>
			<ButtonIcon symbol="italic" />
		</button>
	);
}
/**
 * The name which will be used as an alias of the button in the configuration.
 */
ButtonItalic.key = 'italic';

export default ButtonItalic;
