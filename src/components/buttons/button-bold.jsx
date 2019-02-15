import React from 'react';
import ButtonIcon from './button-icon.jsx';
import useExecCommand from '../hooks/use-exec-command';
import useButtonStateClasses from '../hooks/use-button-state-classes';
import useButtonStyle from '../hooks/use-button-style';
import useButtonKeystroke from '../hooks/use-button-keystroke';

/**
 * The ButtonBold component provides functionality for styling a selection
 * with strong (bold) style.
 */
function ButtonBold({
	command = 'bold',
	keystroke = {
		fn: () => {},
		keys: CKEDITOR.CTRL + 66 /* B*/,
		name: 'bold',
	},
	style = 'coreStyles_bold',

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
			aria-label={AlloyEditor.Strings.bold}
			aria-pressed={isActive}
			className={classNames}
			data-type="button-bold"
			onClick={execCommand}
			tabIndex={tabIndex}
			title={AlloyEditor.Strings.bold}>
			<ButtonIcon symbol="bold" />
		</button>
	);
}

/**
 * The name which will be used as an alias of the button in the configuration.
 */
ButtonBold.key = 'bold';

export default ButtonBold;
