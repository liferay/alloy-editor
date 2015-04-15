(function() {
    'use strict';

    /**
     * Attribute implementation.
     *
     * @class Attribute
     * @constructor
    */
    function Attribute(config) {
        this.__config__ = config || {};
        this.__ATTRS__ = {};
    }

    Attribute.prototype = {
        constructor: Attribute,


        get: function(attr) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (!currentAttr) {
                return;
            }

            if (!this._isInitialized(attr)) {
                this._init(attr);
            }

            var curValue = this.__ATTRS__[attr];

            if (currentAttr.getter) {
                curValue = this._callStringOrFunction(currentAttr.getter, curValue);
            }

            return curValue;
        },

        set: function(attr, value) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (!currentAttr) {
                return;
            }

            if (!this._isInitialized(attr)) {
                this._init(attr);
            }

            if (currentAttr.readOnly) {
                return;
            }

            if (currentAttr.writeOnce && this._isInitialized(attr)) {
                return;
            }

            if (currentAttr.validator && !this._callStringOrFunction(currentAttr.validator, value)) {
                return;
            }

            if (currentAttr.setter) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            this.__ATTRS__[attr] = value;
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

            if (!AlloyEditor.Lang.isArray(args)) {
                args = [args];
            }

            if (AlloyEditor.Lang.isString(stringOrFunction) && AlloyEditor.Lang.isFunction(this[stringOrFunction])) {
                result = this[stringOrFunction].apply(this, args);
            } else if (AlloyEditor.Lang.isFunction(stringOrFunction)) {
                result = stringOrFunction.apply(this, args);
            }

            return result;
        },

        _init: function(attr) {
            var value;

            var currentAttr = this.constructor.ATTRS[attr];

            // Get 
            var hasDefaultValue = Object.prototype.hasOwnProperty.call(currentAttr, 'value');
            var hasPassedValueViaConfig = Object.prototype.hasOwnProperty.call(this.__config__, attr);

            // If there is valueFn, set the value to be the result of invocation of this function
            if (currentAttr.valueFn) {
                value = this._callStringOrFunction(currentAttr.valueFn, value);

                this.__ATTRS__[attr] = value;
            }
            // else if the attribute has readOnly flag, set the default value from the attribute,
            // regardless if there is value or not
            else if (currentAttr.readOnly) {
                value = currentAttr.value;
            }
            // else if the attribute has writeOnce value, set it from the passed configuration or from the
            // default value, in this order. Otherwise, return miserable.
            else if (currentAttr.writeOnce) {
                if (hasDefaultValue) {
                    value = currentAttr.value;
                } else if (hasPassedValueViaConfig) {
                    value = this.__config__[attr];
                } else {
                    return;
                }
            }
            // These two cases below are easy - set the value to be from the passed config or from the
            // default value, in this order.
            else if (hasPassedValueViaConfig) {
                value = this.__config__[attr];
            } else if (hasDefaultValue) {
                value = currentAttr.value;
            }

            // If there is validator, check the returned value. If it is false, then set as initial value
            // the default one. However, if there is no default value, just return.
            if (currentAttr.validator && !this._callStringOrFunction(currentAttr.validator, value)) {
                if (hasDefaultValue) {
                    value = currentAttr.value;
                } else {
                    return;
                }
            }

            // If there is setter, pass thought it the value. The value might be one from defaultFn, default value or
            // provided from the config.
            if (currentAttr.setter) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            // Finally, set the value as init value to the storage with values.
            this.__ATTRS__[attr] = value;
        },

        _isInitialized: function(attr) {
            return Object.prototype.hasOwnProperty.call(this.__ATTRS__, attr);
        }
    };

    AlloyEditor.Attribute = Attribute;
}());