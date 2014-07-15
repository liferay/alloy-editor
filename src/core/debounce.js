;(function() {
    'use strict';

    CKEDITOR.tools.debounce = function(callback, timeout, context, args) {
        var callFn,
            debounceHandle;

        callFn = function() {
            var callContext,
                calArgs;

            callContext = context || this;
            calArgs = args || arguments;

            clearTimeout(debounceHandle);

            debounceHandle = setTimeout(function() {
                callback.apply(callContext, calArgs);
            }, timeout);
        };

        callFn.cancel = function() {
            clearTimeout(debounceHandle);
        };

        return callFn;
    };
}());