# Alloy Editor's website

This branch of the [alloy-editor](https://github.com/liferay/alloy-editor.git) repository contains the source for Alloy Editor's [website](https://alloyeditor.com).

*NOTE*: This is still work in progress and you might run into some issues. If this is the case, don't hesitate to file an issue of submit a pull request.

# Requirements

- [nodejs](https://nodejs.org)
- [yarn](https://yarnpkg.com)

# Setup

- Clone the `website` branch of the *alloy-editor* repository :

```sh
git clone git@github.com:liferay/alloy-editor.git -b website
```

- Install the dependencies

```sh
yarn
```

# Development

- Start a local development server with:

```sh
yarn start
```

Open http://localhost:8000 in your favorite browser to view the website


- Build the production version of the site with:

```sh
yarn build
```

- To view the "production build" of the website, you can use:

```sh
yarn serve
```
# Deployment

You'll need [the WeDeploy command-line tool](https://help.wedeploy.com/command-line-tool/how-can-i-install-the-cli-tool):

```sh
# Download and install the tool, if you don't have it already:
curl -O https://cdn.wedeploy.com/cli/latest/wedeploy.sh
sh wedeploy.sh

# After building, run the tool from the "public" directory:
cd public
we deploy -p alloyeditor
```
