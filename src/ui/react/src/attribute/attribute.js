'use strict';

function Attribute(config) {
    this._config = config;
}

Attribute.prototype = {
    constructor: Attribute,

    get: function(attr) {
        var result = null;

        if (this.ATTRS) {
            var currentAttr = this.ATTRS[attr];

            if (currentAttr) {
                if (currentAttr.getter) {
                    result = this._callStringOrFunction(currentAttr.getter);
                } else {
                    result = currentAttr.value;
                }
            }
        }

        return result;
    },

    set: function(attr, value) {
        this.ATTRS = this.ATTRS || {};

        var currentAttr = this.ATTRS[attr] || {};

        if (!currentAttr.readOnly || !currentAttr.writeOnce || !currentAttr.__writtenOnce__) {
            if (!currentAttr.validator || currentAttr._callStringOrFunction(currentAttr.validator, value)) {
                if (currentAttr.valueFn) {
                    this._callStringOrFunction(currentAttr.valueFn, value);
                }
                else {
                    currentAttr.value = value;
                }
            }

            if (currentAttr.writeOnce) {
                currentAttr.__writtenOnce__ = true;
            }
        }
    },

    _callStringOrFunction: function(stringOrFunction, args) {
        var result = null;

        if (Object.prototype.toString.call(args) !== '[object Array]') {
            args = [args];
        }

        if (typeof stringOrFunction == 'string') {
            result = this[stringOrFunction].apply(this, args);
        } else {
            result = stringOrFunction.apply(this, args);
        }

        return result;
    }
};