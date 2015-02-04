'use strict';

var Attribute = require('./attribute.js');
var OOP = require('./oop.js');
var Lang = require('./lang.js');

debugger;

/**
 * Quick and dirty impl of Base class
 *
 * @class Base
 * @constructor
 */
function Base(config) {
    Base.superclass.constructor.call(this, config);

    this.init(config);
}

OOP.extend(Base, Attribute, {
    init: function(config) {
        this._callChain('initializer', config);
    },

    destroy: function() {
        this._callChain('destructor');
    },

    _callChain: function(wat, args) {
        var arr = [];

        var ctor = this.constructor;

        while(ctor) {
            if (Lang.isFunction(ctor.prototype[wat])) {
                arr.push({
                    context: ctor,
                    toCall: ctor.prototype[wat]
                });
            }

            ctor = ctor.superclass ? ctor.superclass.constructor : null;
        }

        arr = arr.reverse();

        args = Lang.isArray(args) ? args : [args];

        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];

            item.toCall.apply(item.context, args);
        }
    }
});


module.exports = Base;