This document describres how to setup and use `alloyeditor` for development in [liferay-portal](https://github.com/liferay/liferay-portal)

## Setting up `alloyeditor` in [liferay-portal](https://github.com/liferay/liferay-portal)

1. Make sure your `master` branch is up to date with [`upstream`](https://github.com/liferay/alloy-editor)

```sh
git pull upstream master
```

2. Install the dependencies with `yarn`
3. Work on your local changes
4. Build a new release of `alloyeditor` with `yarn build`
5. Link the new release with `yarn link`

    Additionally can inspect the `~/.config/yarn/link` (on Linux/macOS) or `%APPDATA%\Local\Yarn\Data\link` (on Windows)
    directory to make sure the symbolic link was created.

Now, you can update the `alloyeditor` package in liferay-portal:

6. Navigate to the [`frontend-editor-alloyeditor-web`](https://github.com/liferay/liferay-portal/tree/87c99caee95de6738bb434d9ba86b84e6f4c87d1/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module
7. Link latest `alloyeditor` with `yarn link alloyeditor`
8. Deploy the module with `gradlew deploy`

## Developing `alloyeditor` in [liferay-portal](https://github.com/liferay/liferay-portal)

Make sure you've setup everything correctly, as indicated in the previous step.

1. Work on your local changes
2. Build a new release of `alloyeditor` with `yarn build`
3. Make sure `alloyeditor` is linked correctly.

You can now update `alloyeditor` in liferay-portal:

1. Re-deploy the [frontend-editor-alloyeditor-web](https://github.com/liferay/liferay-portal/tree/master/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module with `gradlew deploy`

## Updating `alloyeditor`'s version in [liferay-portal](https://github.com/liferay/liferay-portal)

To update `alloyeditor`'s version in liferay-portal:

1. Navigate to the [frontend-editor-alloyeditor-web](https://github.com/liferay/liferay-portal/tree/master/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module
2. Update the `alloyeditor` dependency in the `package.json` file
3. Re-deploy the module with `gradlew clean deploy`.

An example can be seen in [this](https://github.com/liferay/alloy-editor/commit/0525c86b6d09c85b720ceaf52807f7a96feaeb2b#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) commit ([`package.json`](https://github.com/liferay/alloy-editor/blob/0525c86b6d09c85b720ceaf52807f7a96feaeb2b/package.json) file)
