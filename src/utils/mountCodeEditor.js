import CodeEditor from '../components/CodeEditor';
import React from 'react';
import ReactDOM from 'react-dom';

const mountCodeEditor = (containerId, code) => {
    const container = document.getElementById(containerId);
    ReactDOM.unmountComponentAtNode(container);
    ReactDOM.render(<CodeEditor code={code} />, container);
};

export default mountCodeEditor;