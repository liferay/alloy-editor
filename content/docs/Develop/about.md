---
title: About
description: The main idea behind the editor is to fully separate the core from the UI. And not only to separate it, but to give opportunity to people to add very easy new Buttons and Toolbars or to create completely new UI, based on different Framework or vanilla JavaScript.
icon: "code"
order: 1
---

## The Idea

The main idea behind the editor is to fully separate the core from the UI. And not only to separate it, but to give opportunity to people to add very easy new Buttons and Toolbars or to create completely new UI, based on different Framework or vanilla JavaScript.

<div class="mt-5"></div>

## Built on top of CKEditor

AlloyEditor uses CKEditor under the hood to deal with the HTML. Browsers still generate very inconsistent HTML, not to mention how buggy they are. In fact, to create an editor, which is able to handle all browsers, let's say IE9+, Chrome, Firefox and Safari, is very challenging. Fortunately, CKEditor does it well, so it was the natural choice not only because of that, but because it is mature, well documented and configurable.

Not everything from CKEditor is being used. In fact, AlloyEditor uses only the core from it. The whole UI has been discarded and the version of CKEditor which comes in AlloyEditor is twice smaller than the version OOTB.

<div class="mt-5"></div>

## Plugins and UI Core

On top of what CKEditor provides, new plugins and modules were created, which form the core of AlloyEditor.
Among these plugins is a plugin, which adds new functions which provide information about the selection - its regions, direction and so on. This is the key part and that is what allows the Toolbars to display themselves just above or below the selection. Other plugins are related to Drag&Drop of images directly in the editor, or they provide common API for creating, editing and removing links and so on.

There is no much dependency of CKEditor in AlloyEditor. If there is better base, or if we reach the point when creation of new core would be easier but we still will be able to support the majority of the browsers, nothing prevents us of replacing CKEditor core with our own.

<div class="mt-5"></div>

## User Interface

The UI has been thought in the way that it should provide the following functionality:

- Toolbars should allow adding, removing and reordering Buttons.
- The developer should be able to add new Toolbars to the editor.
- It should be easy to create a new UI. The default one uses React. However, if a developer wants to use another Framework or to create UI using vanilla JavaScript and CSS - that should be possible.

<p class="small text-center mt-5">
    Currently AlloyEditor supports only one UI - it uses React. Please feel free to contact us if you want to contribute another UI.
</p>