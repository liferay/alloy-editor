/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

import React from 'react';

/**
 * React context to avoid explicitly passing the editor instance all
 * through the component hierarchy via props.
 */
const EditorContext = React.createContext({});

/**
 * Helper that passes the editor context in via a prop.
 *
 * Context can only be accessed in `render()` and in lifecycle methods
 * (`componentDidMount()` etc). If a component needs to access context
 * elsewhere, such as in a constructor, the context needs to be passed
 * in via a prop.
 */
EditorContext.toProps = Component => {
	const forwardingComponent = React.forwardRef((props, ref) => (
		<EditorContext.Consumer>
			{context => <Component {...props} context={context} ref={ref} />}
		</EditorContext.Consumer>
	));
	forwardingComponent.key = Component.key;

	return forwardingComponent;
};

export default EditorContext;
