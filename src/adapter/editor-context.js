import React from 'react';

/**
 * React context to avoid explicitly passing the editor instance all
 * through the component hierarchy via props.
 */
const EditorContext = React.createContext({});

export default EditorContext;
