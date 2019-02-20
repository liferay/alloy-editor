---
layout: develop
title: Create entirely new UI
description: You don't like React? You prefer jQuery? Or you are JavaScript ninja and prefer writing vanilla JS? Welcome on board. You'll see how straightforward it is to create a whole new UI for AlloyEditor.
order: 7
---

###### You don't like React? You prefer jQuery? Or you are JavaScript ninja and prefer writing vanilla JS? Welcome on board. You'll see how straightforward it is to create a whole new UI for AlloyEditor.

<article id="article1">

## Get ready to build AlloyEditor

Follow the instructions in our <a href="guids/how_to_build_it">How to build it</a> Guide to know how to change and build AlloyEditor.

</article>

<article id="article2">

## Create UI folder

Create a new directory under <code>src/ui</code> with the name of your UI <small>(e.g jquery)</small>

</article>

<article id="article3">

## Create Build

Create a subfolder, called <code>gulp-tasks</code> and a <code>build.js</code> file with your custom build steps. You can check out the [Gulp Project](http://gulpjs.com/) or some of the existing tasks for extra insight into the build system.

</article>

<article id="article4">

## Build your UI

<span class="code-header">In order to build AlloyEditor using your brand new UI (jquery), run</span>

```text/x-sh
gulp --ui jquery
```

That is everything. How will you structure the directories, which modules will you use, will you load Buttons and Toolbars on demand, what gulp tasks will you add - these questions are entirely up to you. The good news is that you won't start from scratch entirely. You still will be able to use the core of AlloyEditor, as well as the API from CKEditor.

Once you are ready with the UI, please send us a pull request and we will merge it!

</article>