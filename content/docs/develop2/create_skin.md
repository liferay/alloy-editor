---
layout: develop
title: Create Skins
description: AlloyEditor bundles a couple of gorgeus skins that you can use out of the box. However, if you need a better integration with your app's look and feel, you can easily create your own skin.
order: 5
---

###### AlloyEditor bundles a couple of gorgeus skins that you can use out of the box. However, if you need a better integration with your app's look and feel, you can easily create your own skin.

<article id="article1">

## Get ready to build AlloyEditor

<p>Follow the instructions in our <a href="/docs/use/how_to_build_it.html">How to build it</a> guide to know how to change and build AlloyEditor.</p>

</article>

<article id="article2">

## Create skin folders

<p>Create a new directory under <code>src/ui/react/assets/icons/</code> with the name of your skin <small>(e.g <code>zebra</code>)</small>. This directory will contain all the required icons of your skin.</p>

<p>Create a new directory under <code>src/ui/react/assets/sass/skin</code> with the name of your skin <small>(e.g <code>zebra</code>)</small>. This directory will contain the styling of the skin.</p>


> Note: You can reuse our own <a href="/docs/use/skins.html">Skin Architecture</a> to simplify the process of creating your own skin!

</article>

<article id="article3">

## Create your Skin

<p>Place all the icons you need inside an <code>svg</code> folder in your skin's icon folder. These icons will be merged with the default ones, and the resulting set will be used to generate your skin icon font</p>

<p>Create a file called <code>main.scss</code> inside your skin folder. This will be the entry point of your skin and should contain all the styling of your look and feel.</p>

</article>

<article id="article4">

## Build the editor

<span class="code-header">Your skin will be automatically picked up when building AlloyEditor:</span>

```text/x-sh
gulp [build]
```

</article>

<article id="article5">

## Use your Skin

<span class="code-header">Include your skin to the page instead any of the default ones:</span>

```text/html
<link href="alloy-editor/assets/alloy-editor-zebra-min.css" rel="stylesheet">
```

<p>That is everything! Now AlloyEditor will appear with a new beautiful look and feel!</p>

</article>