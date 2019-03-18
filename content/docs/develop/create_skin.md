---
layout: develop
title: Create Skins
description: AlloyEditor bundles a couple of gorgeous skins that you can use out of the box. However, if you would like to have a skin that reflects your app's look and feel, you can create your own skin.
order: 5
---

###### AlloyEditor bundles a couple of gorgeous skins that you can use out of the box. However, if you would like to have a skin that reflects your app's look and feel, you can create your own skin.

</article>

<article id="article1">

## Create skin folders

Create a new directory under <code>src/ui/react/assets/icons/</code> with the name of your skin <small>(e.g <code>zebra</code>)</small>. This directory will contain all the required icons for your skin.

Create a new directory under <code>src/ui/react/assets/sass/skin</code> with the name of your skin <small>(e.g <code>zebra</code>)</small>. This directory will contain the styling for the skin.

> Note: You can use our <a href="/docs/use/skins.html">Skin Architecture</a> to simplify the process of creating your own skin!

</article>

<article id="article2">

## Create your skin

Place the icons for your skin inside your skin's <code>svg</code> folder. The icons placed in this folder are combined with the existing icons to generate your skin's icon font.

Create a <code>main.scss</code> file inside your skin folder. Add the styles to this file to create the overall look and feel for your skin.

</article>

<article id="article3">

## Build the editor

Follow the instructions in our <a href="/docs/use/how_to_build_it.html">How to build it</a> guide to learn how to modify and build AlloyEditor. Your skin is automatically read when you build AlloyEditor:

```text/x-sh
gulp [build]
```

</article>

<article id="article4">

## Use your skin

Add your skin's CSS file to the page. This overrides the default skins:

```text/html
<link href="alloy-editor/assets/alloy-editor-zebra-min.css" rel="stylesheet">
```

There you have it. AlloyEditor has a new beautiful look and feel!

</article>