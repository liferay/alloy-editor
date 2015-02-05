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

    global.OOP = built;
}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this, function (global) {

    'use strict';

// unceremoniously lifted from YUI
var create = Object.create ? function (obj) {
    return Object.create(obj);
} : (function () {
    function F() {}

    return function (obj) {
        F.prototype = obj;
        return new F();
    };
}());

var OOP = {
    extend: function(r, s, px, sx) {
        if (!s || !r) {
            throw 'extend failed, verify dependencies';
        }

        var sp = s.prototype, rp = create(sp);
        r.prototype = rp;

        rp.constructor = r;
        r.superclass = sp;

        // assign constructor property
        if (s != Object && sp.constructor == Object.prototype.constructor) {
            sp.constructor = s;
        }

        // add prototype overrides
        if (px) {
            global.Lang.mix(rp, px);
        }

        // add object overrides
        if (sx) {
            global.Lang.mix(r, sx);
        }

        return r;
    }
};

    return OOP;
}));