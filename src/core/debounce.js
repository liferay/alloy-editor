(function() {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Debounce util function. If a function execution is expensive, it might be debounced. This means
     * that it will be executed after some amount of time after its last call. For example, if we attach a
     * a function on scroll event, it might be called hundreds times per second. In this case it may be
     * debounced with, let's say 100ms. The real execution of this function will happen 100ms after last
     * scroll event.
     *
     * @method debounce
     * @param {Function} callback The callback which has to be called after given timeout.
     * @param {Number} timeout Timeout in milliseconds after which the callback will be called.
     * @param {Object} context The context in which the callback will be called. This argument is optional.
     * @param {Array} args An array of arguments which the callback will receive.
     */
    CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || function(callback, timeout, context, args) {
        var callFn,
            debounceHandle;

        callFn = function() {
            var callArgs,
                callContext,
                len,
                result = [],
                startIndex = 0;

            callContext = context || this;

            for (len = arguments.length; startIndex < len; ++startIndex) {
                result.push(arguments[startIndex]);
            }

            callArgs = result.concat(args || []);

            clearTimeout(debounceHandle);

            debounceHandle = setTimeout(function() {
                callback.apply(callContext, callArgs);
            }, timeout);
        };

        callFn.cancel = function() {
            clearTimeout(debounceHandle);
        };

        return callFn;
    };
}());