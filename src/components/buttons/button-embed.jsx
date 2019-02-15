import React from 'react';
import ButtonEmbedEdit from './button-embed-edit.jsx';
import ButtonIcon from './button-icon.jsx';
import useButtonKeystroke from '../hooks/use-button-keystroke';

/**
 * The ButtonEmbed component provides functionality for creating and editing
 * an embed link in a document.  ButtonEmbed renders in two different
 * modes:
 *
 * - Normal: Just a button that allows to switch to the editing mode
 * - Exclusive: The ButtonEmbedEdit UI with all the link editing controls.
 */
function ButtonEmbed({
	keystroke = {
		fn: () => {},
		keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /* L */,
		name: 'embed',
	},

	renderExclusive,
	requestExclusive,
	tabIndex,

	...restProps
}) {
	const execCommand = () => requestExclusive(ButtonEmbed.key);
	useButtonKeystroke({
		...keystroke,
		fn: execCommand,
	});

	if (renderExclusive) {
		return <ButtonEmbedEdit {...restProps} />;
	} else {
		return (
			<button
				aria-label={AlloyEditor.Strings.link}
				className="ae-button"
				data-type="button-embed"
				onClick={execCommand}
				tabIndex={tabIndex}
				title={AlloyEditor.Strings.link}>
				<ButtonIcon symbol="plus" />
			</button>
		);
	}
}

/**
 * The name which will be used as an alias of the button in the configuration.
 */
ButtonEmbed.key = 'embed';

export default ButtonEmbed;
