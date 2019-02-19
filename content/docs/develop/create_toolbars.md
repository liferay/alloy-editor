---
layout: develop
title: Create Toolbars
description: Adding a new toolbar is also as straightforward as adding a button.
order: 6
---

###### Adding a new toolbar is also as straightforward as adding a button.

<article id="article1">

## Creating a Toolbar

```javascript
// Use the built-in version of React if your site does not use React
var React = AlloyEditor.React;

var ToolbarVersions = React.createClass({
    mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

    statics: {
        key: 'versions'
    },

    componentDidMount: function () {
        this._updatePosition();
    },

    componentDidUpdate: function (prevProps, prevState) {
        this._updatePosition();
    },

    getDefaultProps: function() {
        return {
            circular: true,
            descendants: '.ae-button, .ae-toolbar-element',
            keys: {
                next: [38, 39],
                prev: [37, 40]
            }
        };
    },

    /**
     * Returns the class name of the toolbar in case of both exclusive and normal mode.
     */
    _getToolbarClassName: function() {
        var cssClass = 'ae-toolbar-versions';

        if (this.props.renderExclusive) {
            cssClass = 'ae-toolbar ' + this.getArrowBoxClasses();
        }

        return cssClass;
    },

    /**
     * Calculates and sets the position of the toolbar in exclusive or normal mode.
     */
    _updatePosition: function() {
        var region;

        if (this.props.selectionData) {
            region = this.props.selectionData.region;
        }

        if (region) {
            var domNode = React.findDOMNode(this);
            var domElement = new CKEDITOR.dom.element(domNode);

            var startRect = region.startRect || region;
            var right = this.props.editor.get('nativeEditor').editable().getClientRect().right;

            domNode.style.right = right + domNode.offsetWidth + this.props.gutterExclusive.left + 'px';
            domNode.style.top = region.top - domNode.offsetHeight/2 + startRect.height/2 + 'px';
            domNode.style.opacity = 1;

            domElement.removeClass('ae-arrow-box');

            this.cancelAnimation();
        }
    },

    /**
     * Lifecycle. Renders the buttons for managing version changes.
     */
    render: function() {
        var buttons = this.getToolbarButtons(this.props.config.buttons);
        var className = this._getToolbarClassName();

        return (
            <div className={className} data-tabindex={this.props.config.tabIndex || 0} onFocus={this.focus} onKeyDown={this.handleKey} tabIndex="-1">
                <div className="ae-container">
                    {buttons}
                </div>
            </div>
        );
    }
});

AlloyEditor.Toolbars[ToolbarVersions.key] = AlloyEditor.ToolbarVersions = ToolbarVersions;
```

</article>

<article id="article2">

## Using a Toolbar

After creating your toolbar, you have to add it to the configuration of the editor where you want to use it.

```javascript
var toolbars = {
    add: {
        buttons: ['image', 'camera', 'hline', 'table'],
        tabIndex: 2
    },
    versions: {
        buttons: ['annotate', 'comment', 'acceptChanges', 'rejectChanges'],
        tabIndex: 1
    }
}
```

In this example, <em>annotate</em>, <em>comment</em>, <em>acceptChanges</em> and <em>rejectChanges</em> will be the buttons that will be loaded on the toolbar, and that will help us handle document version changes. Read our <a href="/docs/develop/create/create_buttons.html">Create Buttons</a> Guide to know how to do this!

</article>


