import React from 'react';
import ButtonIcon from './button-icon.jsx';
import useButtonStyle from '../hooks/use-button-style';
import useExecCommand  from '../hooks/use-exec-command';

/**
 * The ButtonHline component inserts a horizontal line.
 */
function ButtonHline({
	// TODO: find out whether anybody ever overrides this, or the style prop
	command = 'horizontalrule',
	style = {element: 'hr'},
	tabIndex,
	modifiesSelection
}) {
	const execCommand = useExecCommand(command, modifiesSelection);
	const [isActive, _style] = useButtonStyle(style);
	const {horizontalrule} = AlloyEditor.Strings;

	return (
		<button
			aria-label={horizontalrule}
			className="ae-button"
			data-type="button-hline"
			onClick={execCommand}
			tabIndex={tabIndex}
			title={horizontalrule}>
			<ButtonIcon symbol="hr" />
		</button>
	);
}

/**
 * The name which will be used as an alias of the button in the configuration.
 */
ButtonHline.key = 'hline';

export default ButtonHline;
