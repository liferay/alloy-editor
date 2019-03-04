import React from 'react';
import EditorContext from '../../adapter/editor-context';

export default function ButtonIcon({className = '', symbol}) {
	return (
		<EditorContext.Consumer>
			{({editor}) => {
				const nativeEditor = editor.get('nativeEditor');
				const spritemap = nativeEditor.config.spritemap || '';
				const path = `${spritemap}#${symbol}`;
				const classNamePrefix = className ? ` ${className}` : '';
				const combinedClassName = `ae-svg-icon${classNamePrefix}`;

				return (
					<svg className={combinedClassName} width="18" height="18">
						<use href={path} />
					</svg>
				);
			}}
		</EditorContext.Consumer>
	);
}
