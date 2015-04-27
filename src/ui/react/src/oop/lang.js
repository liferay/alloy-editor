(function () {
    'use strict';

    /**
     * Provides core language utilities.
     *
     * @class Lang
     */
    var Lang = {
        /**
         * Check if the passed value is an array.
         *
         * @static
         * @method isArray
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an array, false otherwise.
         */
        isArray: function(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },

        /**
         * Check if the passed value is boolean.
         *
         * @static
         * @method isBoolean
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is boolean, false otherwise.
         */
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        /**
         * Check if the passed value is a function.
         *
         * @static
         * @method isFunction
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a function, false otherwise.
         */
        isFunction: function(value) {
            return typeof(value) === 'function';
        },

        /**
         * Check if the passed value is NULL.
         *
         * @static
         * @method isNull
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is NULL, false otherwise.
         */
        isNull: function(value) {
            return value === null;
        },

        /**
         * Check if the passed value is number.
         *
         * @static
         * @method isNumber
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is number, false otherwise.
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Check if the passed value is an object
         *
         * @static
         * @method isObject
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an object, false otherwise.
         */
        isObject: function(value) {
            var valueType = typeof value;

            return (value && (valueType === 'object' || Lang.isFunction(value)));
        },

        /**
         * Check if the passed value is a string.
         *
         * @static
         * @method isString
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a string, false otherwise.
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Adds all properties from the supplier to the receiver.
         * The function will add all properties, not only these owned by the supplier.
         *
         * @static
         * @method mix
         * @param {Object} receiver The object which will receive properties.
         * @param {Object} supplier The object which provides properties.
         * @return {Object} The modified receiver.
         */
        mix: function(receiver, supplier) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;

            for (var key in supplier) {
                if (hasOwnProperty.call(supplier, key)) {
                    receiver[key] = supplier[key];
                }
            }
        },

        /**
         * Converts value to Integer.
         *
         * @static
         * @method toInt
         * @param {Any} value The value which have to be converted to Integer.
         * @return {Integer} The converted value.
         */
        toInt: function(value) {
            return parseInt(value, 10);
        }
    };

    AlloyEditor.Lang = Lang;
}());
