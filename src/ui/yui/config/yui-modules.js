{
    'alloy-editor': {
        path: 'adapter/yui.js',
        requires: ['base-build', 'node-base']
    },

    'button-base': {
        group: 'AlloyEditor',
        path: 'buttons/button-base.js',
        requires: ['base-build', 'plugin', 'button']
    },

    'button-strong': {
        group: 'AlloyEditor',
        path: 'buttons/button-strong.js',
        requires: ['button-base']
    },

    'button-em': {
        group: 'AlloyEditor',
        path: 'buttons/button-em.js',
        requires: ['button-base']
    },

    'button-strike': {
        group: 'AlloyEditor',
        path: 'buttons/button-strike.js',
        requires: ['button-base']
    },

    'button-subscript': {
        group: 'AlloyEditor',
        path: 'buttons/button-subscript.js',
        requires: ['button-base']
    },

    'button-superscript': {
        group: 'AlloyEditor',
        path: 'buttons/button-superscript.js',
        requires: ['button-base']
    },

    'button-ol': {
        group: 'AlloyEditor',
        path: 'buttons/button-ol.js',
        requires: ['button-base']
    },

    'button-ul': {
        group: 'AlloyEditor',
        path: 'buttons/button-ul.js',
        requires: ['button-base']
    },

    'button-a': {
        group: 'AlloyEditor',
        path: 'buttons/button-a.js',
        requires: ['button-base', 'event-valuechange', 'node-focusmanager']
    },

    'button-h1': {
        group: 'AlloyEditor',
        path: 'buttons/button-h1.js',
        requires: ['button-base']
    },

    'button-h2': {
        group: 'AlloyEditor',
        path: 'buttons/button-h2.js',
        requires: ['button-base']
    },

    'button-u': {
        group: 'AlloyEditor',
        path: 'buttons/button-underline.js',
        requires: ['button-base']
    },

    'button-twitterquote': {
        group: 'AlloyEditor',
        path: 'buttons/button-twitterquote.js',
        requires: ['button-base']
    },

    'button-hline': {
        group: 'AlloyEditor',
        path: 'buttons/button-hline.js',
        requires: ['button-base']
    },

    'button-image': {
        group: 'AlloyEditor',
        path: 'buttons/button-image.js',
        requires: ['button-base', 'node-event-simulate']
    },

    'button-media': {
        group: 'AlloyEditor',
        path: 'buttons/button-media.js',
        requires: ['button-base']
    },

    'button-quote': {
        group: 'AlloyEditor',
        path: 'buttons/button-quote.js',
        requires: ['button-base']
    },

    'button-code': {
        group: 'AlloyEditor',
        path: 'buttons/button-code.js',
        requires: ['button-base']
    },

    'button-twitter': {
        group: 'AlloyEditor',
        path: 'buttons/button-twitter.js',
        requires: ['button-base']
    },

    'button-left': {
        group: 'AlloyEditor',
        path: 'buttons/button-left.js',
        requires: ['button-base']
    },

    'button-right': {
        group: 'AlloyEditor',
        path: 'buttons/button-right.js',
        requires: ['button-base']
    },

    'toolbar-base': {
        group: 'AlloyEditor',
        path: 'toolbars/toolbar-base.js',
        requires: ['plugin', 'node-base', 'transition']
    },

    'toolbar-position': {
        group: 'AlloyEditor',
        path: 'toolbars/toolbar-position.js',
        requires: ['node-base']
    },

    'toolbar-add': {
        group: 'AlloyEditor',
        path: 'toolbars/toolbar-add.js',
        requires: ['widget-base', 'widget-position', 'widget-position-constrain', 'widget-position-align', 'toolbar-base']
    },

    'toolbar-styles': {
        group: 'AlloyEditor',
        path: 'toolbars/toolbar-styles.js',
        requires: ['toolbar-base', 'widget-base', 'widget-position', 'widget-position-constrain']
    },

    'toolbar-image': {
        group: 'AlloyEditor',
        path: 'toolbars/toolbar-image.js',
        requires: ['dom-screen', 'widget-base', 'widget-position', 'widget-position-constrain', 'toolbar-base']
    },

    'selector-patch': {
        condition: {
            trigger: 'selector-native'
        },
        group: 'AlloyEditor',
        path: 'plugins/selector-patch.js'
    }
}