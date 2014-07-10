Alloy Editor
==================

## What is that?
Alloy Editor is a WYSIWYG editor, based on CKEditor, with completely rewritten UI.

## How to build it

1. Fork the repository, so you can send then patches
2. Navigate to the directory you forked/cloned the repo.
2. Install NodeJS (http://nodejs.org/)
3. Run 
````bash [sudo] npm install -g gulp" ```
4. Run ````bash "npm install" ````
5. Run ````bash "gulp" ````

## How to run the demo

1. Build it following the steps above.
2. Download some simple web server. I like very much "mongoose" (https://code.google.com/p/mongoose/)
3. If you decided to go with mongoose, then go to project folder and execute:
````bash "mongoose -document_root dist/alloy-editor-0.1.0" ````, where 0.1.0 is the current version of the editor. Don't worry, "dist" folder will contain only one folder, so you don't have to remember this 0.1.0

## What is wrong with the UI of CKEditor?

It is just old school. The toolbar appears on top, in case of inline editing it appears on top or on bottom. However, any modern editor UI places the toolbar just above the selection.

## Why Alloy Editor provides better UI?

It supports multiple toolbars, and super easy toolbar configuration. Adding buttons is also very easy. The core is fully separated from the UI, so you can add your own UI if you want. The default UI is built using YUI3, but you can create one using whatever Framework you want.

## Toolbar configuration
[Todo: write documentation here]

## How to create my own button?
[Todo: write documentation here]

## How to create my own toolbar?
[Todo: write documentation here]

### License
MIT License
