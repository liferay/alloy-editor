;(function() {
    'use strict';

    CKEDITOR.tools.merge = function() {
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
    };
}());