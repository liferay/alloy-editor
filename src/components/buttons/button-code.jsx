import React from 'react';
import ButtonIcon from './button-icon.jsx';
import useButtonActionStyle from '../hooks/use-button-action-style';
import useButtonStateClasses from '../hooks/use-button-state-classes';

/**
 * The ButtonCode component provides a button that wraps a selection in
 * `pre` element.
 */
function ButtonCode({
	style = {
		element: 'pre',
	},
	tabIndex,
}) {
	const {applyStyle} = useButtonActionStyle(style);
	const buttonClasses = useButtonStateClasses(style);
	const cssClass = `ae-button ${buttonClasses}`;

	return (
		<button
			aria-label={AlloyEditor.Strings.code}
			aria-pressed={cssClass.indexOf('pressed') !== -1}
			className={cssClass}
			data-type="button-code"
			onClick={applyStyle}
			tabIndex={tabIndex}
			title={AlloyEditor.Strings.code}>
			<ButtonIcon symbol="code" />
		</button>
	);
}

/**
 * The name which will be used as an alias of the button in the configuration.
 */
ButtonCode.key = 'code';

export default ButtonCode;
// export default ButtonActionStyle(ButtonStateClasses(ButtonStyle(ButtonCode)));
