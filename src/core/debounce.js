(function() {
    'use strict';

    /**
     * Debounce util function. If a function execution is expensive, it might be debounced. This means
     * that it will be executed after some amount of time after its last call. For example, if we attach a
     * a function on scroll event, it might be called hundreds times per second. In this case it may be
     * debounced with, let's say 100ms. The real execution of this function will happen 100ms after last
     * scroll event.
     *
     * @memberof CKEDITOR.tools
     * @method debounce
     * @param {Array} args An array of arguments which the callback will receive.
     * @param {Function} callback The callback which has to be called after given timeout.
     * @param {Number} timeout Timeout in milliseconds after which the callback will be called.
     * @param {Object} context The context in which the callback will be called. This argument is optional.
     * @static
     */
    CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || function(callback, timeout, context, args) {
        var debounceHandle;

        var callFn = function() {
            var callContext = context || this;

            clearTimeout(debounceHandle);

            var result = [];

            for (var len = arguments.length, startIndex = 0; startIndex < len; ++startIndex) {
                result.push(arguments[startIndex]);
            }

            var callArgs = result.concat(args || []);

            debounceHandle = setTimeout(function() {
                callback.apply(callContext, callArgs);
            }, timeout);
        };

        callFn.detach = function() {
            clearTimeout(debounceHandle);
        };

        return callFn;
    };
}());