---
layout: develop
title: Create entirely new UI
description: Is React not your thing? Perhaps you prefer JQuery. Are you a JavaScript ninja and prefer writing vanilla JS instead? Welcome on board. You'll see how straightforward it is to create a whole new UI for AlloyEditor.
order: 7
---

###### Is React not your thing? Perhaps you prefer JQuery. Are you a JavaScript ninja and prefer writing vanilla JS instead? Welcome on board. You'll see how straightforward it is to create a whole new UI for AlloyEditor.

<article id="article1">

## Create UI folder

Follow the instructions in our <a href="guids/how_to_build_it">How to build it</a> Guide to learn how to modify and build AlloyEditor.

Follow these steps to create your UI:

</article>

<article id="article2">

## Create UI folder

Create a new directory under <code>src/ui</code> with the name of your UI <small>(e.g jquery)</small>

</article>

<article id="article3">

## Create Build

Create a subfolder called <code>gulp-tasks</code> and a <code>build.js</code> file with your custom build steps. You can check out the [Gulp Project](http://gulpjs.com/) or some of the existing tasks for extra insight into the build system.

</article>

<article id="article4">

## Build your UI

Build AlloyEditor with your brand new UI (jquery in the example) by running the command below:

```text/x-sh
gulp --ui jquery
```

There you have it. How will you structure the directories? Which modules will you use? Will you load Buttons and Toolbars on demand? What gulp tasks will you add? These questions are entirely up to you. The good news is that you won't start from scratch entirely. You will still be able to use the core of AlloyEditor, as well as the API from CKEditor.

Once you are ready with the UI, please send us a pull request and we will merge it!

</article>