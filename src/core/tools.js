(function() {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Returns a new object containing all of the properties of all the supplied
     * objects. The properties from later objects will overwrite those in earlier
     * objects.
     *
     * Passing in a single object will create a shallow copy of it.
     *
     * @method merge
     * @param {Object} objects* One or more objects to merge.
     * @return {Object} A new merged object.
     */
    CKEDITOR.tools.merge = CKEDITOR.tools.merge || function() {
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