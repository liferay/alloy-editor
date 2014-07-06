;(function() {
    'use strict';

    /**
     * Add Debounce plugin to CKEditor
     */

    CKEDITOR.plugins.add(
        'debounce',
        {
            init: function(editor) {
                CKEDITOR.tools.debounce = this.debounce;
            },

            debounce: function(callback, timeout, context, args) {
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
            }
        }
    );
}());