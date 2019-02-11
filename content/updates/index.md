---
title: Updates
description: Check out what's new
mainPage: true
updates:
 -
  version: 1.5.0
  major: true

  features:
  -
    icon: code
    title: Support React 16
    description: AlloyEditor can now be overlayed on top of React 16
    url: https://github.com/liferay/alloy-editor/issues/731
  -
    icon: cog
    title: Bug fixes
    description: Several bug fixes
    url: https://github.com/liferay/alloy-editor/issues?utf8=%E2%9C%93&q=milestone%3A1.5.0
 -
  version: 1.4.1
  major: false

  features:
  -
    icon: code
    title: Bridge Plugins enabled by default
    description: AlloyEditor Bridge plugins that allow you to use CKEditor plugins are now enabled by default
    url: https://github.com/liferay/alloy-editor/issues/731
  -
    icon: cog
    title: Fixed several issues
    description: Fixed some issues related to languages and focus selection
    url: https://github.com/liferay/alloy-editor/issues?utf8=%E2%9C%93&q=milestone%3A1.4.1
 -
  version: 1.4.0
  major: true

  features:
  -
    icon: code
    title: New getButtons API
    description: Added a `getButtons` method to easily discover available buttons!
    url: https://github.com/liferay/alloy-editor/issues/667
  -
    icon: cog
    title: Fixed several bug
    description: Fixed many bug to improve general stability
    url: https://github.com/liferay/alloy-editor/issues?utf8=%E2%9C%93&q=milestone%3A1.4.0
 -
  version: 1.3.1
  major: false

  features:
  -
    icon: cog
    title: Performance in large documents
    description: Fixed a bug degrading performance in large documents
    url: https://github.com/liferay/alloy-editor/issues/654
  -
    icon: cog
    title: Autolink for urls with '-'
    description: Fixed the autolink plugin to work with urls containing a '-' character
    url: https://github.com/liferay/alloy-editor/issues/657
  -
    icon: cog
    title: Imposible to enter URL in IE
    description: Fixed an issue that was preventing to set the URL when editing a link in IE
    url: https://github.com/liferay/alloy-editor/issues/660
 -
  version: 1.3.0
  major: true

  features:
    -
      icon: code
      title: Supports Edge
      description: AlloyEditor now officially supports Microsoft Edge.
    -
      icon: cards2
      title: CKEditor was updated to v4.6.0
      description: CKEditor engine has been updated to v4.6.0.
      url: https://github.com/liferay/alloy-editor/issues/631
    -
      icon: cards2
      title: Additional CKEditor Plugin Support
      description: You can now use CKEditor's plugins using the MenuButton API such as SpellChecker and Language!
      url: /docs/use/use_ckeditor_plugins.html
    -
      icon: plus-squares
      title: Open links in new tab
      description: You can now use Ctrl/Cmd + Click to open links inside AlloyEditor in a new tab!
      url: https://github.com/liferay/alloy-editor/issues/509
    -
      icon: cog
      title: Bug Fixes
      description: Addressed several bug fixes related to image resizing, missing translations, url edition and placeholder state among others.
      url: https://github.com/liferay/alloy-editor/issues?utf8=%E2%9C%93&q=milestone%3A1.3.0
 -
  version: 1.2.5
  major: false

  features:
    -
      icon: code
      title: Configurable resize behaviour
      description: The dragresize plugin can now be configured using the `imageScaleResize` attribute to define how the image attributes should change when resizing it. This will also affect which resize handles are available depending on the configuration.
      url: https://github.com/liferay/alloy-editor/issues/601
    -
      icon: cog
      title: Bug fixes
      description: Fixed a bug with the Placeholder plugin that caused it to show the placeholder helper for a brief period of time even if the editor contained data.
      url: https://github.com/liferay/alloy-editor/issues/603
    -
      icon: code
      title: Configurable LinkEditButton
      description: The `LinkEditButton` accepts now an option (`showTargetSelector`) to configure if the link target selector dropdown should appear or not.
      url: https://github.com/liferay/alloy-editor/issues/608
 -
  version: 1.2.4
  major: false
  features:
   -
    icon: cog
    title: Bugfixes and enhancements
    description: "Various bugfixes and enhancements: Fixed toolbar rendering issues, button style documentation, images resizing in Firefox, passing link targets button config ButtonTargetList."
    url: https://github.com/liferay/alloy-editor/issues?q=milestone%3A1.2.4+label%3Abug
 -
  major: false
  version: 1.2.3

  features:
  -
    icon: cog
    title: Properly release resources
    description: Fixed issue with detaching events registered via CKEditor's API. The issue would cause the following exception on destroying the editor "Uncaught TypeError Cannot read property 'getRanges' of null". Fixed an issue that would cause the image resize markers to be still present even when the editor was destroyed.
    url: https://github.com/liferay/alloy-editor/issues?q=milestone%3A1.2.3+label%3Abug
  -
    icon: code
    title: Fire `beforeImageAdd` event in buttom-image too
    description: ButtonImage will fire `beforeImageAdd` event too
    url: https://github.com/liferay/alloy-editor/issues/534
 -
  major: false
  version: 1.2.2

  features:
  -
    icon: cog
    title: Properly position embedded media toolbar
    description: If page is scrolled, the embedded media toolbar will be positioned improperly. To fix that, scrollTop and scrollLeft properties were involved in toobar's position calculation.
    url: https://github.com/liferay/alloy-editor/issues/526
 -
  major: false
  version: 1.2.1

  features:
  -
    icon: cog
    title: Improve embedding media
    description: Embedding media has been improved and now it allows removal of the widgets using the keyboard. In addition, a new button has been added, which allows trashing embedded content.
    url: https://github.com/liferay/alloy-editor/issues/517
  -
    icon: cards2
    title: CKEditor was updated to v4.5.9
    description: CKEditor was updated to v4.5.9 and a bug, which was preventing the usage of CKEditor buttons in multiple AlloyEditor instances was fixed.
    url: https://github.com/liferay/alloy-editor/issues/515
  -
    icon: plus-squares
    title: Convert mail link
    description: The button for adding link has been improved and now it recognizes mail links. Entering `me@example.com` will be converted to  `mailto:me@example.com`. Thanks to Matthew Leffler for his awesome contribution!
    url: https://github.com/liferay/alloy-editor/issues/522
  -
    icon: code
    title: Adding images fires `beforeImageAdd` event
    description: On adding images via paste or Drag&amp;Drop, before to append the image to the content, a `beforeImageAdd` event will be fired. The developer may subscribe to it and cancel it, this will prevent adding the image to the content.
    url: https://github.com/liferay/alloy-editor/issues/518
 -
  major: true
  version: 1.2.0

  features:
  -
    icon: plus-squares
    title: New buttons and plugins
    description: Added two new buttons - "indent" and "outdent". Added a plugin to create automatically ordered and unordered lists.
    url: https://github.com/liferay/alloy-editor/issues?q=milestone%3A1.2.0+label%3A%22Feature+request%22
  -
    icon: globe
    title: Accessibility and UX improvements
    description: Added support for keyboard navigation in link autocomplete. Table removing icon was changed.
    url: https://github.com/liferay/alloy-editor/issues?q=milestone%3A1.2.0+label%3Aenhancement
 -
  major: true
  version: 1.1.0

  features:
  -
    icon: code
    title: A new way for configuring the buttons
    description: A single button can be configured without the requirement the whole toolbars configuration to be overwritten too. For that purpose, there is a new configuration property, called 'buttonCfg'.
    url: /docs/guides/button_configuration/
  -
    icon: plus-squares
    title: Adding links via AutoComplete
    description: The user is now able to add links using AutoComplete. This feature was contributed by Matthew Leffler.
    url: /docs/features/linkautocomplete/
  -
    icon: cog
    title: Fixed numerous bug
    description: A number of bug have been fixed, most of them related to the usability of the editor.
    url: https://github.com/liferay/alloy-editor/issues?q=milestone%3A1.1.0+label%3Abug
 -
  major: true
  version: 1.0.0

  features:
  -
    icon: code
    title: The API reached a stable version
    description: After almost two years of releasing versions below 1.0, the moment for releasing a stable version of the API has arrived. Since v.1.0.0 the established ways of communicating with CKEditor's engine, emitting events and receiving properties will be locked. Version 1.0 guarantees stability and full backward compatibility in all further 1.x releases.
  -
    icon: plus-squares
    title: A new button for embedding media
    description: AlloyEditor is now able to embed media files such as videos, tweets and presentations and many others. The service is provided by IFramely, which means you will be able to embed content for huge set of domains. Please refer to their page for more information and terms of usage.
    url: https://github.com/liferay/alloy-editor/issues/233
  -
    icon: globe
    title: Cmd-L opens the Link Dialog
    description: Adding a link is now possible directly from the keyboard by pressing Cmd-L (or Ctrl-L in Windows).
    url: https://github.com/liferay/alloy-editor/issues/417
  -
    icon: cog
    title: Fixed numerous bug
    description: A number of bug have been fixed, most of them related to the usability of the editor.
    url: https://github.com/liferay/alloy-editor/issues?q=milestone%3A1.0.0+label%3Abug
 -
  version: 0.7.5

  features:
  -
    icon: cog
    title: Bug Fixes
    description: Properly updated bower package with AlloyEditor version.
    url: https://github.com/liferay/alloy-editor/issues/413
 -
  version: 0.7.4

  features:
  -
    icon: cog
    title: Bug Fixes
    description: Fixed an issue with detecting user language. Replaced `minify-css` package (it has been deprecated) with `cssnano`.
    url: https://github.com/liferay/alloy-editor/issues/410
 -
  version: 0.7.3

  features:
  -
    icon: cog
    title: Bug Fixes
    description: Fixed an issue with requiring AlloyEditor on the server. On the server, when requiring `alloyeditor`, the default script will be now `alloy-editor-no-react.js`.
    url: https://github.com/liferay/alloy-editor/issues/408
  -
    icon: code
    title: Guide
    description: Created a guide, which shows how to create a React component and render the content on the server and to create an instance of AlloyEditor in the browser.
    url: http://alloyeditor.com/guides/react_component
 -
  version: 0.7.2

  features:
  -
    icon: cog
    title: Bug Fixes
    description: If React is not defined on the global space, AlloyEditor will try to require it via the `require` function.
    url: https://github.com/liferay/alloy-editor/issues/406
 -
  version: 0.7.1

  features:
  -
    icon: plus-squares
    title: Link creating button is now able to set link target
    description: When user creates or edits a link, now there is a possibility to set link's target (blank, self, etc)
    url: https://github.com/liferay/alloy-editor/issues/344
  -
    icon: plus-squares
    title: Link creating button advances the cursor after the created link
    description: After creating a link, the cursor will be advanced after the link. This provides better UX.
    url: https://github.com/liferay/alloy-editor/issues/128
  -
    icon: cards2
    title: Updated to CKEditor's engine 4.5.5
    description: CKEDIOR's engine has been updated to 4.5.5, which fixes an issue with destroying CKEDITOR's instance immediately after creation.
    url: https://github.com/liferay/alloy-editor/issues/375
  -
    icon: cog
    title: Bug Fixes
    description: Fixed an issue with destroying the instance of the editor too early, fixed an issue with initializing AlloyEditor's plugins when CKEditor's are present
    url: https://github.com/liferay/alloy-editor/issues/375
  -
    icon: code
    title: New autolinkAdd event
    description: A new event, called autolinkAdd will be fired when AlloyEditor creates a link automatically
    url: https://github.com/liferay/alloy-editor/issues/388
  -
    icon: code
    title: YUI's UI removed
    description: In this version the old YUI UI has been completely removed.
    url: https://github.com/liferay/alloy-editor/issues/247
 -
  major: true
  version: 0.7.0

  features:
   -
    icon: code
    title: Supports React 0.14
    description: AlloyEditor has been updated to support React 0.14 and the separation between React and ReactDOM.
    url: https://github.com/liferay/alloy-editor/issues/365
   -
    icon: folder
    title: Works in GitHub Electron
    description: After heavily discussing all the possibilities to make it working with Electron, we finally did it! Since version 0.7, AlloyEditor loads fine in Electron.
    url: https://github.com/liferay/alloy-editor/issues/350
   -
    icon: folder
    title: Works with Browserify
    description: Another highly requested feature was to make it working with Browserify. This became possible in version 0.7
    url: https://github.com/liferay/alloy-editor/issues/338
   -
    icon: code
    title: New editorUpdate event
    description: AlloyEditor now notifies the outside world about state changes so other non-react apps could be seamlessly integrated.
    url: https://github.com/liferay/alloy-editor/issues/366
   -
    icon: cog
    title: Bug Fixes
    description: Some bugfixes and improvements like centering the toolbar when the selection is an image or a table, hiding the toolbars after destroying and recreating the editor.
    url: https://github.com/liferay/alloy-editor/issues/371
 -
  major: true
  version: 0.6.0

  features:
   -
    icon: plus-squares
    title: Image centering
    description: Adds a new button for centering images. This button was contributed by Evan Francis (thanks!)
    url: https://github.com/liferay/alloy-editor/issues/322
   -
    icon: cog
    title: Bug Fixes
    description: Fixes issues related to keeping the toolbar in the view and handling contenteditable property on destroying the editor. Thanks to Damien Pobel and Matthew Leffler for the contributions!
    url: https://github.com/liferay/alloy-editor/pull/356
 -
  version: 0.5.2

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue with using non-bundled version of React
    url: https://github.com/liferay/alloy-editor/issues/333
 -
  version: 0.5.1

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue with the minimized dist files
    url: https://github.com/liferay/alloy-editor/issues/329
   -
    icon: code
    title: Documentation updates
    description: Properly documents the regexBasePath property in AlloyEditor class
    url: https://github.com/liferay/alloy-editor/issues/331
 -
  major: true
  version: 0.5.0

  features:
   -
    icon: environment-connected
    title: AlloyEditor On The Server
    description: AlloyEditor can now be used safely in Node.js environments
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue regarding errors if the editor has no focus
    url: https://github.com/liferay/alloy-editor/issues/325
 -
  version: 0.4.1

  features:
   -
    icon: folder
    title: Better npm Packaging
    description: Better compliance with npm packaging. Added main attribute
 -
  major: true
  version: 0.4.0

  features:
   -
    icon: cards2
    title: CKEditor Plugin Support
    description: You can now use almost every CKEditor plugin out of the box!
    url: /docs/use/use_ckeditor_plugins.html
   -
    icon: format
    title: Improved Skin Infrastructure
    description: Creates a new skin infrastructure, more extensible and component-based
   -
    icon: format
    title: Atlas Skin
    description: Adds a new Atlas skin
   -
    icon: cog
    title: Bug Fixes
    description: Fixes several issues
   -
    icon: cards2
    title: CKEditor 4.5.1
    description: Updates to the latest CKEditor version
    url: http://ckeditor.com/blog/CKEditor-4.5-Released
 -
  version: 0.3.7

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue relating to the image button
 -
  version: 0.3.6

  features:
   -
    icon: format
    title: Simpler CSS Prefix
    description: Simplifies css alloy-editor prefix to use ae instead
 -
  version: 0.3.5

  features:
   -
    icon: plus-squares
    title: Table Headings
    description: Adds support and a new button to control the heading style inside a table
    url: /docs/features/tableheading.html
   -
    icon: folder
    title: Editor Version
    description: You can now easily check the editor version being used
   -
    icon: cog
    title: Bug Fixes
    description: Fixes issues relating to the UI disappearing in some scenarios
   -
    icon: flag-full
    title: Better Language Support
    description: It is now possible to incrementally update lang files
 -
  version: 0.3.4

  features:
   -
    icon: check-square
    title: Better Test Infrastructure
    description: Improves test infrastructure and adds new tests
   -
    icon: flag-full
    title: Compiled With Babel
    description: AlloyEditor React UI is now compiled using Babel
 -
  version: 0.3.2

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes several issues relating to API and CSS undesired effects
   -
    icon: folder
    title: Updated Dependencies
    description: Updates project dependencies and adds a breaking changes file
   -
    icon: format
    title: Improved Skin Infrastructure
    description: Separates color and font definitions to a different file
 -
  version: 0.3.1

  features:
   -
    icon: folder
    title: Bower Component
    description: AlloyEditor is now published as a Bower Component
 -
  major: true
  version: 0.3.0

  features:
   -
    icon: plus-squares
    title: Paste Images
    description: You can now paste images directly from your clipboard!
   -
    icon: folder
    title: Simpler Distribution Folder
    description: Simplifies the distribution folder structure
 -
  version: 0.2.9

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue where the editor does not set 'contenteditable' properly
 -
  version: 0.2.8

  features:
   -
    icon: geolocation
    title: Internationalization Support
    description: You can now use AlloyEditor in your own language
   -
    icon: globe
    title: Screen Reader Support
    description: Improves support for screen readers
   -
    icon: cog
    title: Bug Fixes
    description: Fixes several issues regarding to inconsistent UI behaviours
 -
  version: 0.2.7

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue regarding to the toolbar position when using Bootstrap
   -
    icon: check-square
    title: Travis & SauceLabs
    description: Updates SauceLabs configuration to properly connect with Travis
 -
  version: 0.2.6

  features:
   -
    icon: format
    title: React UI
    description: Adds a new default UI based on React
   -
    icon: plus-squares
    title: Tables, Styles, Images&hellip;
    description: Introduces many new buttons to add tables, styles, images from camera&hellip;
    url: /
 -
  version: 0.2.5

  features:
   -
    icon: cog
    title: Bug Fixes
    description: Fixes an issue regarding pasting content
 -
  version: 0.2.4

  features:
   -
    icon: code
    title: Image Drop
    description: You can now directly use the generated dom element after dropping an image
   -
    icon: code
    title: Debounce Detach
    description: Renames the cancel method in 'Debounce' to 'detach' instead
   -
    icon: cards2
    title: CKEditor 4.4.5
    description: Updates to the latest CKEditor version
    url: http://ckeditor.com/blog/CKEditor-4.4.5-Released
 -
  version: 0.2.3

  features:
   -
    icon: globe
    title: ARIA and Keyboard Support
    description: Adds basic ARIA and keyboard support for toolbars and buttons
 -
  version: 0.2.2

  features:
   -
    icon: format
    title: Skin support
    description: You can now create and use different skins
   -
    icon: code
    title: Button Configuration
    description: Allows buttons to receive complex configuration objects
   -
    icon: cog
    title: Bug Fixes
    description: Fixes several issues
 -
  version: 0.2.1

  features:
   -
    icon: document
    title: LGPL license
    description: AlloyEditor is now licensed under LGPL instead of MIT
---