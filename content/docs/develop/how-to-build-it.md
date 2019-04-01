---
title: Build it
description: How to build a version of AlloyEditor.
order: 2
---

## Install NodeJS

Using your browser, navigate to http://nodejs.org and install NodeJS.

<div class="mt-5"></div>

## Download AlloyEditor

Use the __Clone__ or __Fork__ buttons in our [Github Repository page](https://github.com/liferay/alloy-editor) to get a copy of AlloyEditor.

After that, follow the instructions to clone (download) the project onto your computer.

<div class="mt-5"></div>

## Install AlloyEditor dependencies

Open a terminal on your computer and navigate to the AlloyEditor project you cloned locally.

### For AlloyEditor 2.0 and above

```bash
yarn install # or "npm install", if you don't have Yarn
```

### For AlloyEditor versions prior to 2.0

```bash
npm install -g gulp # or "sudo npm install -g gulp"
npm install
```

<div class="mt-5"></div>

## Build AlloyEditor

Navigate to the AlloyEditor project you cloned locally and run the commands below.

### For AlloyEditor 2.0 and above

```bash
yarn build # or "npm run build" if you don't have Yarn
```

<p class="small text-center mt-5">
  There are other scripts that you an use, like **yarn start** (**npm run start**) to run a live-reloading demo, or **yarn test** (**npm test**).
</p>

### For AlloyEditor versions prior to 2.0

```bash
gulp build
```

<p class="small text-center mt-5">
    There are other gulp tasks you can use, like <strong>release</strong> to generate a bundled zip file, or <strong>watch</strong> if you're in development mode.
</p>
