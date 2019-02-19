---
title: Skins
description: Skins in AlloyEditor are a very powerful feature that allows you to seamlessly integrate the editor inside your app.
order: 9
---

###### Skins in AlloyEditor are a very powerful feature that allows you to seamlessly integrate the editor inside your app.

<article id="article1">

## Skin Architecture

AlloyEditor skins are organized according to the following principles:

<strong>Variables</strong>

Style values are parameterized as much as possible. This allows skins to fully extend others just by changing a small set of variable values.

<strong>Components</strong>

A skin is created by combining one or more components together. Different skins may use different components, so irrelevant styling can be easily stripped out.

<strong>Structure vs Skin</strong>

All styling is separated into structure and skin. Structure represents everything that affects the sizing and position of the elements. Meanwhile, skin represents all the purely cosmetic changes.

</article>

<article id="article2">

## Skins Overview

At this moment, you can use any of the following skins out of the box:

<strong>Ocean (default)</strong>

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/skin_ocean.png"/>
</div>

<strong>Atlas</strong>

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/skin_atlas.png"/>
</div>

```text/html
  <link href="alloy-editor/assets/alloy-editor-atlas-min.css" rel="stylesheet">
```

<strong>Moono</strong>

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/skin_moono.png"/>
</div>

```text/html
  <link href="alloy-editor/assets/alloy-editor-moono-min.css" rel="stylesheet">
```

</article>