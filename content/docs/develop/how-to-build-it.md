---
title: Build it
description: How to build a version of AlloyEditor.
order: 2
---

## Install NodeJS

Using your browser, navigate to http://nodejs.org and install NodeJS.

<div class="mt-5"></div>

## Install Gulp

Open a terminal on your computer and execute

```bash
[sudo] npm install -g gulp
```

<div class="mt-5"></div>

## Fork AlloyEditor

Use the __Fork__ button in our [Github Repository page](https://github.com/liferay/alloy-editor) to get a copy of alloyEditor.

After that, follow the instructions to clone the project into your computer.

<div class="mt-5"></div>

## Install AlloyEditor dependencies

Navigate to the AlloyEditor project in your computer and execute

```bash
[sudo] npm install
```

<div class="mt-5"></div>

## Build AlloyEditor

Navigate to the AlloyEditor project in your computer and execute

```bash
gulp build
```

<p class="small text-center mt-5">
    There are other gulp tasks you can use like <strong>release</strong> to generate a bundled zip file, or <strong>watch</strong> if you're in development mode
</p>