import React from 'react';
import ButtonIcon from './button-icon.jsx';
import useExecCommand from '../hooks/use-exec-command';
import useButtonStateClasses from '../hooks/use-button-state-classes';
import useButtonStyle from '../hooks/use-button-style';
import useButtonKeystroke from '../hooks/use-button-keystroke';

/**
 * The ButtonUnderline component provides functionality for underlining a
 * text selection.
 */
function ButtonUnderline({
	// TODO: should these even be props? nobody ever overrides them
	command = 'underline',
	keystroke = {
		fn: () => {},
		keys: CKEDITOR.CTRL + 85 /* U*/,
		name: 'underline',
	},
	style = 'coreStyles_underline',

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
			aria-label={AlloyEditor.Strings.underline}
			aria-pressed={isActive}
			className={classNames}
			data-type="button-underline"
			onClick={execCommand}
			tabIndex={tabIndex}
			title={AlloyEditor.Strings.underline}>
			<ButtonIcon symbol="underline" />
		</button>
	);
}

/**
 * The name which will be used as an alias of the button in the configuration.
 */
ButtonUnderline.key = 'underline';

export default ButtonUnderline;
