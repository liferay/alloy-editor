(function () {
    'use strict';

    var Lang = {
        isArray: function(value) {
            return Object.prototype.toString.call(value) == '[object Array]';
        },

        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        isFunction: function(value) {
            return typeof(value) === 'function';
        },

        isNull: function(value) {
            return value === null;
        },

        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        isObject: function(value) {
            var valueType = typeof value;

            return (value && (valueType === 'object' || Lang.isFunction(value)));
        },

        isString: function(value) {
            return typeof value === 'string';
        },

        mix: function(receiver, supplier) {
            for (var key in supplier) {
                receiver[key] = supplier[key];
            }
        },

        toInt: function(value) {
            return parseInt(value, 10);
        }
    };

    global.Lang = Lang;
}());
