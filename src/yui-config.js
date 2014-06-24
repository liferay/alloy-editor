if (typeof YUI_config == 'undefined') {
    var YUI_config = {
        groups: {}
    };
}
else {
    YUI_config.groups = YUI_config.groups || {};
}

YUI_config.groups.LREditor = {
    base: '/dist/',
    combine: false,
    comboBase: '',
    modules: {
        'button-base': {
            path: 'buttons/button-base.js',
            requires: ['base-build', 'plugin', 'button']
        },

        'button-strong': {
            path: 'buttons/button-strong.js',
            requires: ['button-base']
        },

        'button-em': {
            path: 'buttons/button-em.js',
            requires: ['button-base']
        },

        'button-a': {
            path: 'buttons/button-a.js',
            requires: ['button-base', 'event-valuechange']
        },

        'button-h1': {
            path: 'buttons/button-h1.js',
            requires: ['button-base']
        },

        'button-h2': {
            path: 'buttons/button-h2.js',
            requires: ['button-base']
        },

        'button-u': {
            path: 'buttons/button-underline.js',
            requires: ['button-base']
        },

        'button-image': {
            path: 'buttons/button-image.js',
            requires: ['button-base']
        },

        'button-code': {
            path: 'buttons/button-code.js',
            requires: ['button-base']
        },

        'button-twitter': {
            path: 'buttons/button-twitter.js',
            requires: ['button-base']
        },

        'button-left': {
            path: 'buttons/button-left.js',
            requires: ['button-base']
        },

        'button-right': {
            path: 'buttons/button-right.js',
            requires: ['button-base']
        },

        'toolbar-base': {
            path: 'toolbars/toolbar-base.js',
            requires: ['plugin', 'node-base']
        },

        'toolbar-add': {
            path: 'toolbars/toolbar-add.js',
            requires: ['overlay', 'widget-base', 'widget-position', 'widget-autohide', 'toolbar-base']
        },

        'toolbar-styles': {
            path: 'toolbars/toolbar-styles.js',
            requires: ['widget-base', 'widget-position', 'widget-autohide', 'toolbar-base']
        },

        'toolbar-image': {
            path: 'toolbars/toolbar-image.js',
            requires: ['dom-screen', 'widget-base', 'widget-position', 'widget-autohide', 'toolbar-base']
        }
    },
    root: '/dist/'
};