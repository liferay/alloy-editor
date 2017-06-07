(function() {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Sends a request using the JSONP technique.
     *
     * @memberof CKEDITOR.tools
     * @method jsonp
     * @param {CKEDITOR.template} urlTemplate The template of the URL to be requested. All properties passed in `urlParams` can be used, plus a `{callback}`, which represent a JSONP callback, must be defined.
     * @param {Function} callback A function to be called in case of success.
     * @param {Function} errorCallback A function to be called in case of failure.
     * @param {Object} urlParams Parameters to be passed to the `urlTemplate`.
     * @return {Object} An object with the following properties:
     *  - id: the transaction ID
     *  - a `cancel()` method
     * @static
     */
    CKEDITOR.tools.jsonp = function(urlTemplate, urlParams, callback, errorCallback) {
        var callbackKey = CKEDITOR.tools.getNextNumber();

        urlParams = urlParams || {};
        urlParams.callback = 'CKEDITOR._.jsonpCallbacks[' + callbackKey + ']';

        if (!CKEDITOR._.jsonpCallbacks) {
            CKEDITOR._.jsonpCallbacks = {};
        }

        CKEDITOR._.jsonpCallbacks[callbackKey] = function(response) {
            setTimeout(function() {
                cleanUp();

                callback(response);
            });
        };

        var scriptElement = new CKEDITOR.dom.element('script');
        scriptElement.setAttribute('src', urlTemplate.output(urlParams));
        scriptElement.on('error', function() {
            cleanUp();

            if (errorCallback) {
                errorCallback();
            }
        });

        function cleanUp() {
            if (scriptElement) {
                scriptElement.remove();
                delete CKEDITOR._.jsonpCallbacks[callbackKey];
                scriptElement = null;
            }
        }

        CKEDITOR.document.getBody().append(scriptElement);

        return {
            cancel: cleanUp,
            id: callbackKey
        };
    };

    /**
     * Returns a new object containing all of the properties of all the supplied
     * objects. The properties from later objects will overwrite those in earlier
     * objects.
     *
     * Passing in a single object will create a shallow copy of it.
     *
     * @memberof CKEDITOR.tools
     * @method merge
     * @param {Object} objects* One or more objects to merge.
     * @return {Object} A new merged object.
     * @static
     */
    CKEDITOR.tools.merge = CKEDITOR.tools.merge || function() {
        var result = {};

        for (var i = 0; i < arguments.length; ++i) {
            var obj = arguments[i];

            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    result[key] = obj[key];
                }
            }
        }

        return result;
    };

    /**
     * Simulates event on a DOM element.
     *
     * @memberof CKEDITOR.tools
     * @method simulate
     * @param {DOMElement} element The element on which the event shoud be simualted.
     * @param {String} event The name of the event which have to be simulated.
     * @static
     */
    CKEDITOR.tools.simulate = function(element, event) {
        var eventInstance = document.createEvent('Events');
        eventInstance.initEvent(event, true, false);
        element.dispatchEvent(eventInstance);
    };
}());