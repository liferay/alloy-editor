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

        /**
         * Retrieves the value of an attribute.
         *
         * @instance
         * @memberof Attribute
         * @method get
         * @param {String} attr The attribute which value should be retrieved.
         * @return {Any} The value of the attribute.
         */
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

        /**
         * Sets the value of an attribute.
         *
         * @instance
         * @memberof Attribute
         * @method set
         * @param {String} attr The attribute which value should be set.
         * @param {Any} value The value which should be set to the attribute.
         */
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
         * @instance
         * @memberof Attribute
         * @method _callStringOrFunction
         * @param  {Any|Array} args The arguments which will be provided to the called function
         * @param  {String|Function} stringOrFunction The function which should be called
         * @protected
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

        /**
         * Initializes an attribute. Sets its default value depending on the flags of the
         * attribute and the passed configuration object to the constructor.
         *
         * @instance
         * @memberof Attribute
         * @method _init
         * @param {String} attr The name of the attribute which have to be initialized.
         * @protected
         */
        _init: function(attr) {
            var value;

            var currentAttr = this.constructor.ATTRS[attr];

            // Check if there is default value or passed one via configuration object
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
                if (hasPassedValueViaConfig) {
                    value = this.__config__[attr];
                } else if (hasDefaultValue) {
                    value = currentAttr.value;
                } else {
                    return;
                }
            }
            // These two cases below are easy - set the value to be from the passed config or
            // from the default value, in this order.
            else if (hasPassedValueViaConfig) {
                value = this.__config__[attr];
            } else if (hasDefaultValue) {
                value = currentAttr.value;
            }

            // If there is validator, and user passed config object - check the returned value.
            // If it is false, then set as initial value the default one.
            // However, if there is no default value, just return.
            if (currentAttr.validator && hasPassedValueViaConfig && !this._callStringOrFunction(currentAttr.validator, value)) {
                if (hasDefaultValue) {
                    value = currentAttr.value;
                } else {
                    return;
                }
            }

            // If there is setter and user passed config object - pass the value thought the setter.
            // The value might be one from defaultFn, default value or provided from the config.
            if (currentAttr.setter && hasPassedValueViaConfig) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            // Finally, set the value as initial value to the storage with values.
            this.__ATTRS__[attr] = value;
        },

        /**
         * Checks if an attribute is initialized. An attribute is considered as initialized
         * when there is an own property with this name in the local collection of attribute values
         * for the current instance.
         *
         * @instance
         * @memberof Attribute
         * @method _isInitialized
         * @param {String} attr The attribute which should be checked if it is initialized.
         * @protected
         * @return {Boolean} Returns true if the attribute has been initialized, false otherwise.
         */
        _isInitialized: function(attr) {
            return Object.prototype.hasOwnProperty.call(this.__ATTRS__, attr);
        }
    };

    AlloyEditor.Attribute = Attribute;
}());