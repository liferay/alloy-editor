'use strict';

var Lang = {
    isString: function(object) {
        return typeof object === 'string';
    },

    isNumber: function(object) {
        return typeof object === 'number' && isFinite(object);
    },

    mix: function(receiver, supplier) {
        for (var key in supplier) {
            receiver[key] = supplier[key];
        }
    }
};

var OOP = {
    // unceremoniously lifted from YUI
    extend: function(r, s, px, sx) {
        if (!s || !r) {
            throw 'extend failed, verify dependencies';
        }

        var sp = s.prototype, rp = sp;
        r.prototype = rp;

        rp.constructor = r;
        r.superclass = sp;

        // assign constructor property
        if (s != Object && sp.constructor == Object.prototype.constructor) {
            sp.constructor = s;
        }

        // add prototype overrides
        if (px) {
            OOP.mix(rp, px);
        }

        // add object overrides
        if (sx) {
            OOP.mix(r, sx);
        }

        return r;
    }
};