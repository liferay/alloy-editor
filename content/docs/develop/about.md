---
layout: develop
title: About
description: Our goal while creating the AlloyEditor was to fully separate the core from the UI, while making it easy for people to add new functionality (buttons, toolbars, UI) based on different frameworks or vanilla JavaScript.
order: 1
---

## The Idea

Our goal while creating AlloyEditor was to fully separate the core from the UI, while making it easy for people to add new functionality (buttons, toolbars, UI) based on different frameworks or vanilla JavaScript.

## The Architecture

We had some initial hurdles to overcome. Browsers generate very inconsistent HTML that is often buggy. Creating an editor that is cross-browser compatible is a challenge. Fortunately, CKEditor solves these issues, so it was the natural choice to use its core as the foundation for AlloyEditor. It's mature, well documented, and configurable.

While we use CKEditor's core for AlloyEditor, the whole UI has been discarded, and the version of CKEditor used in AlloyEditor has been reduced to half the size of the version OOTB.

## Plugins and UI Core

On top of what CKEditor provides, new plugins and modules were created, which form the core of AlloyEditor.
The main plugin provides information about the current selection, its regions, direction, etc. It displays the toolbars just above or below the current selection. The remaining plugins handle functionality such as drag and drop for images and common API for creating, editing, removing links, etc.

Although AlloyEditor uses the CKEditor core, its dependency is quite small. If there is a better base or we reach the point when creation of a new core would be easier, nothing prevents us from replacing the CKEditor core with our own. 

## User Interface

The UI has been designed with this functionality in mind:

- Toolbars should allow adding, removing, and reordering of buttons.
- The developer should be able to add new Toolbars to the editor.
- It should be easy to create a new UI. The default one uses React. However, if a developer wants to use another Framework, or to create UI using vanilla JavaScript and CSS, that should be possible.

<p class="small text-center mt-5">
    Currently, AlloyEditor supports only one UI: React. Please feel free to contact us if you want to contribute another UI.
</p>