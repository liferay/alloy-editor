(function () {
    'use strict';

    /**
     * Provides OOP utilities.
     *
     * @class OOP
     */
    var OOP = {
        /**
         * Sets the prototype, constructor and superclass properties to support an inheritance strategy
         * that can chain constructors and methods. Static members will not be inherited.
         *
         * @memberof OOP
         * @method extend
         * @param {Function} receiver The class which will extend another class.
         * @param {Function} supplier The class which will provide the properties the child class.
         * @param {Object} protoProps Prototype properties to add/override.
         * @param {Object} staticProps Static properties to add/overwrite.
         * @return {Function} The extended class.
         * @static
         */
        extend: function(receiver, supplier, protoProps, staticProps) {
            if (!supplier || !receiver) {
                throw 'extend failed, verify dependencies';
            }

            var supplierProto = supplier.prototype, receiverProto = Object.create(supplierProto);
            receiver.prototype = receiverProto;

            receiverProto.constructor = receiver;
            receiver.superclass = supplierProto;

            // assign constructor property
            if (supplier !== Object && supplierProto.constructor === Object.prototype.constructor) {
                supplierProto.constructor = supplier;
            }

            // add prototype overrides
            if (protoProps) {
                AlloyEditor.Lang.mix(receiverProto, protoProps);
            }

            // add object overrides
            if (staticProps) {
                AlloyEditor.Lang.mix(receiver, staticProps);
            }

            return receiver;
        }
    };

    AlloyEditor.OOP = OOP;
}());