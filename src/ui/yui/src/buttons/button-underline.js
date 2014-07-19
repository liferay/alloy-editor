YUI.add('button-u', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * Button Underline. A standard AlloyUI/YUI class which allows to apply underline style to
     * editor selection. Extends Y.Plugin.Base and mixes Y.ButtonBase extension.
     *
     * @class Y.ButtonU
     * @constructor
     */
    var Underline = Y.Base.create('underline', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-underline"></i>'
    }, {
        NAME: 'underline',

        NS: 'underline',

        ATTRS: {

            /**
             * @description Specifies the style, which should be applied to the current selection in editor.
             *
             * @attribute element
             * @default 'u'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'u'
            }
        }
    });

    Y.ButtonU = Underline;

}, '', {
    requires: ['button-base']
});