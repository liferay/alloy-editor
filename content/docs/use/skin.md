---
description: "Skins in AlloyEditor are a very powerful feature that allows you to seamlessly integrate the editor inside your app."
layout: "guide"
title: "Skins"
order: 90
---

###### Skins in AlloyEditor are a very powerful feature that allows you to seamlessly integrate the editor inside your app.

<article id="article1">

## Skin Architecture

<p>
	AlloyEditor skins are organized according to the following principles:
</p>


<p>
	<strong>Variables</strong>
</p>

<p>
	Style values are parameterized as much as possible. This allows skins to fully extend others just by changing a small set of variable values.
</p>

<p>
	<strong>Components</strong>
</p>

<p>
	A skin is created by combining one or more components together. Different skins may use different components, so irrelevant styling can be easily stripped out.
</p>

<p>
	<strong>Structure vs Skin</strong>
</p>

<p>
	All styling is separated into structure and skin. Structure represents everything that affects the sizing and position of the elements. Meanwhile, skin represents all the purely cosmetic changes.
</p>

</article>

<article id="article2">

## Skins Overview

<p>
	At this moment, you can use any of the following skins out of the box:
</p>

<p>
	<strong>Ocean (default)</strong>
</p>

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/skin_ocean.png"/>
</div>

<p>
	<strong>Atlas</strong>
</p>

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/skin_atlas.png"/>
</div>

```text/html
  <link href="alloy-editor/assets/alloy-editor-atlas-min.css" rel="stylesheet">
```

<p>
	<strong>Moono</strong>
</p>

<div class="thumbnail">
  <img class="img img-polaroid" src="/images/guides/skin_moono.png"/>
</div>

```text/html
  <link href="alloy-editor/assets/alloy-editor-moono-min.css" rel="stylesheet">
```


</article>