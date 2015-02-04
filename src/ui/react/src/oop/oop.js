'use strict';

var Lang = require('./lang.js');

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
            Lang.mix(rp, px);
        }

        // add object overrides
        if (sx) {
            Lang.mix(r, sx);
        }

        return r;
    }
};

module.exports = OOP;