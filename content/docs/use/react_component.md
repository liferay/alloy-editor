---
title: Creating a React component
description: You can use AlloyEditor on the server as well. To do this, you can create a React component that renders the editable content and creates an instance of AlloyEditor in the browser. This will be a significant performance improvement.
order: 3
---

###### You can use AlloyEditor on the server as well. To do this, you can create a React component that renders the editable content and creates an instance of AlloyEditor in the browser. This will be a significant performance improvement.

## Talk is cheap. Show me the code (to quote Linus Torvalds)

Instead of just explaining how to do it, we actually created an example <a href="https://github.com/ipeychev/alloyeditor-react-component">repository</a> on GitHub, which contains code and <a href="https://github.com/ipeychev/alloyeditor-react-component/blob/master/README.md">instructions</a> for usage. Please follow the <a href="https://github.com/ipeychev/alloyeditor-react-component/blob/master/README.md">instructions</a> there.

The repository is an example project, which renders a page on the server and creates an instance of AlloyEditor in the browser. The same React component is used on both client and server. Something cool to note is that instead of creating just one bundle file, two bundles are created - one for the application files and another one for the AlloyEditor file itself. In this case, you will leverage the browser's cache.