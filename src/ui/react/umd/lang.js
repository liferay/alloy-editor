(function (global, factory) {
    'use strict';

    var built = factory(global);

    /* istanbul ignore else */
    if (typeof module === 'object' && module) {
        module.exports = built;
    }

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }

    global.Lang = built;
}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this, function (global) {

    'use strict';

var Lang = {
    isArray: function(param) {
        return Object.prototype.toString.call(param) == '[object Array]';
    },

    isFunction: function(param) {
        return typeof(param) === 'function';
    },

    isNumber: function(param) {
        return typeof param === 'number' && isFinite(param);
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

    return Lang;
}));