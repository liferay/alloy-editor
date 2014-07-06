;(function() {
    'use strict';

    /**
     * Add UITools plugin to CKEditor
     */

    CKEDITOR.plugins.add(
        'uitools',
        {
            init: function(editor) {
                CKEDITOR.tools.merge = this.merge;
            },

            merge: function () {
                var i = 0,
                    key,
                    len = arguments.length,
                    obj,
                    result = {};

                for (; i < len; ++i) {
                    obj = arguments[i];

                    for (key in obj) {
                        if (hasOwnProperty.call(obj, key)) {
                            result[key] = obj[key];
                        }
                    }
               }

                return result;
            }
        }
    );
}());