# Alloy Editor

Alloy Editor is a modern WYSIWYG editor built on top of CKEditor, designed to create modern and gorgeous web content.

Works on IE9+, Chrome, Firefox and Safari.

## Demo

-   [Embedded self-guided demo](http://alloyeditor.com)
-   [Screencasts and code samples for specific features](https://alloyeditor.com/docs/features/)

## Features

-   Smart toolbars appear right near the selected text and offer different functionality based on context
-   Easily add your own buttons (see the "marquee" example in [the docs](https://alloyeditor.com/docs/develop/create/create_buttons.html))
-   Paste images from clipboard, or Drag&Drop them from another application
-   Insert images from the device's camera!
-   Paste rich text from any web page and preserve its formatting
-   The full styling power of CKEditor...
-   ...with a much more modern UI
-   The core is fully separated from the UI
-   The example UI is built with React
-   Plugin architecture

## Setup `alloyeditor` in [liferay-portal](https://github.com/liferay/liferay-portal)

1. Make sure your `master` branch is up to date with [`upstream`](https://github.com/liferay/alloy-editor)
   ​

```sh
git pull upstream master
```

2. Install the dependencies with `yarn`
3. Work on your local changes / (optional change)
4. Build a new release of `alloyeditor` with `yarn build`
5. Link the new release with `yarn link`
   ​
   Additionally can inspect the `~/.config/yarn/link` (on linux/mac) or `%APPDATA%\Local\Yarn\Data\link` (on Windows)
   directory to make sure the symbolic link was created
   ​
   Now, you can update the `alloyeditor` package in liferay-portal:
   ​
6. Navigate to the [`frontend-editor-alloyeditor-web`](https://github.com/liferay/liferay-portal/tree/87c99caee95de6738bb434d9ba86b84e6f4c87d1/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module
7. Link latest `alloyeditor` with `yarn link alloyeditor`
8. Deploy the module with `gradlew deploy`

## Developing `alloyeditor` in [liferay-portal](https://github.com/liferay/liferay-portal)

After Setup update `alloyeditor`

1. Make local changes
2. Build a new release of `alloyeditor` with `yarn build`

Update `alloyeditor` in liferay-portal:

1. Re-deploy the [frontend-editor-alloyeditor-web](https://github.com/liferay/liferay-portal/tree/master/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module: `gradlew deploy`

## Updating `alloyeditor` version in [liferay-portal](https://github.com/liferay/liferay-portal)

To update `alloyeditor` version in liferay-portal:

1. Navigate to the [frontend-editor-alloyeditor-web](https://github.com/liferay/liferay-portal/tree/master/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module
2. Update the `alloyeditor` dependency in the `package.json` file
3. Re-deploy the module with `gradlew clean deploy`.

An example can be seen in [this](https://github.com/liferay/alloy-editor/commit/0525c86b6d09c85b720ceaf52807f7a96feaeb2b#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) commit ([`package.json`](https://github.com/liferay/alloy-editor/blob/0525c86b6d09c85b720ceaf52807f7a96feaeb2b/package.json) file)

## Documentation

Look for documentation and examples on [http://alloyeditor.com/](http://alloyeditor.com/)

### License

[LGPL License](LICENSE.md)

[![Build Status](https://travis-ci.org/liferay/alloy-editor.svg)](https://travis-ci.org/liferay/alloy-editor)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/alloy-editor.svg)](https://saucelabs.com/u/alloy-editor)
