(function () {
    'use strict';

    var Lang = {
        isArray: function(param) {
            return Object.prototype.toString.call(param) == '[object Array]';
        },

        isBoolean: function(param) {
            return typeof param === 'boolean';
        },

        isFunction: function(param) {
            return typeof(param) === 'function';
        },

        isNumber: function(param) {
            return typeof param === 'number' && isFinite(param);
        },

        isObject: function(param) {
            var paramType = typeof param;

            return (param && (paramType === 'object' || Lang.isFunction(param)));
        },

        isString: function(param) {
            return typeof param === 'string';
        },

        mix: function(receiver, supplier) {
            for (var key in supplier) {
                receiver[key] = supplier[key];
            }
        }
    };

    global.Lang = Lang;
}());
