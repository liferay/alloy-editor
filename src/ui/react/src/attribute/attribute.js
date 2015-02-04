'use strict';

var Lang = require('../oop/lang.js');

function Attribute(config) {
    this._config = config;
}

Attribute.prototype = {
    constructor: Attribute,

    get: function(attr) {
        var result = null;

        if (this.constructor.ATTRS) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (currentAttr) {
                if (!currentAttr.__initialized__) {
                    this.set(attr, this._config[attr]);
                }

                if (Lang.isFunction(currentAttr.getter)) {
                    result = this._callStringOrFunction(currentAttr.getter);
                } else {
                    result = currentAttr.value;
                }
            }
        }

        return result;
    },

    set: function(attr, value) {
        var currentAttr;

        if (this.constructor.ATTRS) {
            currentAttr = this.constructor.ATTRS[attr];
        }

        if (!currentAttr) {
            return;
        }

        if (!currentAttr.__initialized__) {
            currentAttr.__initialized__ = true;
        }

        if (currentAttr.readOnly) {
            return;
        }

        if (!currentAttr.writeOnce || !currentAttr.__writtenOnce__) {
            if (!currentAttr.validator || this._callStringOrFunction(currentAttr.validator, value)) {
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

        if (!Lang.isArray(args)) {
            args = [args];
        }

        if (Lang.isString(stringOrFunction) && Lang.isFunction(this[stringOrFunction])) {
            result = this[stringOrFunction].apply(this, args);
        } else if (Lang.isFunction(stringOrFunction)) {
            result = stringOrFunction.apply(this, args);
        }

        return result;
    }
};

module.exports = Attribute;