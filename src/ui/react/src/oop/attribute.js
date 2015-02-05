(function() {
    'use strict';

    /**
     * Attribute implementation
     *
     * @class Attribute
     * @constructor
    */
    function Attribute(config) {
        this._config = config;
    }

    Attribute.prototype = {
        constructor: Attribute,

        /**
         * Retrieves the value of an attribute
         *
         * @param {String} attr The attribute which value should be retrieved
         * @return {Any} The value of the attribute
         */
        get: function(attr) {
            var result = null;

            if (this.constructor.ATTRS) {
                var currentAttr = this.constructor.ATTRS[attr];

                if (currentAttr) {
                    if (!currentAttr.__initialized__) {
                        this.set(attr, this._config[attr]);
                    }

                    if (global.Lang.isFunction(currentAttr.getter)) {
                        result = this._callStringOrFunction(currentAttr.getter);
                    } else {
                        result = currentAttr.value;
                    }
                }
            }

            return result;
        },

        /**
         * Sets the value of an argument
         *
         * @param {String} attr The argument which value should be set
         * @param {Any} value The value which should be set to the attribute
         */
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

        /**
         * Calls the provided param as function with the supplied arguments.
         * If param provided as string, a corresponding function in this object will
         * be called. If provided param is a function, it will be directly called.
         *
         * @param  {String|Function} stringOrFunction The function which should be called
         * @param  {Any|Array} args The arguments which will be provided to the called function
         * @return {Any} The returned value from the called function
         */
        _callStringOrFunction: function(stringOrFunction, args) {
            var result = null;

            if (!global.Lang.isArray(args)) {
                args = [args];
            }

            if (global.Lang.isString(stringOrFunction) && global.Lang.isFunction(this[stringOrFunction])) {
                result = this[stringOrFunction].apply(this, args);
            } else if (global.Lang.isFunction(stringOrFunction)) {
                result = stringOrFunction.apply(this, args);
            }

            return result;
        }
    };

    global.Attribute = Attribute;
}());