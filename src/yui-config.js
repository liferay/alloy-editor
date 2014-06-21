var YUI_config = {
    modules: {
    	'button-base': {
            fullpath: '/dist/buttons/button-base.js',
            requires: ['base-build', 'plugin', 'button']
        },

        'button-strong': {
            fullpath: '/dist/buttons/button-strong.js',
            requires: ['button-base']
        },

        'button-em': {
            fullpath: '/dist/buttons/button-em.js',
            requires: ['button-base']
        },

        'button-a': {
            fullpath: '/dist/buttons/button-a.js',
            requires: ['button-base', 'event-valuechange']
        },

        'button-h1': {
            fullpath: '/dist/buttons/button-h1.js',
            requires: ['button-base']
        },

        'button-h2': {
            fullpath: '/dist/buttons/button-h2.js',
            requires: ['button-base']
        },

        'button-u': {
            fullpath: '/dist/buttons/button-underline.js',
            requires: ['button-base']
        },

        'button-image': {
            fullpath: '/dist/buttons/button-image.js',
            requires: ['button-base']
        },

        'button-code': {
            fullpath: '/dist/buttons/button-code.js',
            requires: ['button-base']
        },

        'button-twitter': {
            fullpath: '/dist/buttons/button-twitter.js',
            requires: ['button-base']
        },

        'button-left': {
            fullpath: '/dist/buttons/button-left.js',
            requires: ['button-base']
        },

        'button-right': {
            fullpath: '/dist/buttons/button-right.js',
            requires: ['button-base']
        },

        'toolbar-base': {
            fullpath: '/dist/toolbars/toolbar-base.js',
            requires: ['plugin', 'node-base']
        },

        'toolbar-add': {
            fullpath: '/dist/toolbars/toolbar-add.js',
            requires: ['overlay', 'widget', 'widget-position', 'widget-autohide', 'toolbar-base']
        },

        'toolbar-styles': {
            fullpath: '/dist/toolbars/toolbar-styles.js',
            requires: ['widget', 'widget-position', 'widget-autohide', 'toolbar-base']
        },

        'toolbar-image': {
            fullpath: '/dist/toolbars/toolbar-image.js',
            requires: ['dom-screen', 'widget', 'widget-position', 'widget-autohide', 'toolbar-base']
        }
    }
};