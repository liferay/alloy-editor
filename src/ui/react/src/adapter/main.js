(function() {
    'use strict';

    window.AlloyEditor = {
        editable: function(node, config) {
            config = config || {};

            config.srcNode = node;

            return new AlloyEditor.Core(config);
        },

        Buttons: {},

        Toolbars: {}
    };
}());