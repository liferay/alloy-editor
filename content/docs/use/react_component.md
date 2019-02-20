---
title: Creating a React component
description: AlloyEditor can be used on the server too. On the server, a possible way of usage is to create a React component, which can render the content for editing and create an instance of AlloyEditor in the browser. This will be a significant performance improvement.
order: 3
---

###### AlloyEditor can be used on the server too. On the server, a possible way of usage is to create a React component, which can render the content for editing and create an instance of AlloyEditor in the browser. This will be a significant performance improvement.

## Talking is cheap, show me the code (to quote Linus Torvalds)

Instead just explaining how to do it, we actually created an example <a href="https://github.com/ipeychev/alloyeditor-react-component">repository</a> on GitHub, which contains code and <a href="https://github.com/ipeychev/alloyeditor-react-component/blob/master/README.md">instructions</a> for usage. Please follow the <a href="https://github.com/ipeychev/alloyeditor-react-component/blob/master/README.md">instructions</a> there.

The repository is an example project, which renders a page on the server an creates an instance of AlloyEditor in the browser. Same React component is used on both client and server and one cool thing is that instead to create just one bundle file, two bundles are created - one for the application files and another one for AlloyEditor file itself. In this case you will leverage browser's cache.