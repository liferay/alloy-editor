(function () {
    'use strict';

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
        extend: function(receiver, supplier, protoProps, staticProps) {
            if (!supplier || !receiver) {
                throw 'extend failed, verify dependencies';
            }

            var supplierProto = supplier.prototype, receiverProto = create(supplierProto);
            receiver.prototype = receiverProto;

            receiverProto.constructor = receiver;
            receiver.superclass = supplierProto;

            // assign constructor property
            if (supplier !== Object && supplierProto.constructor === Object.prototype.constructor) {
                supplierProto.constructor = supplier;
            }

            // add prototype overrides
            if (protoProps) {
                global.Lang.mix(receiverProto, protoProps);
            }

            // add object overrides
            if (staticProps) {
                global.Lang.mix(receiver, staticProps);
            }

            return receiver;
        }
    };

    global.OOP = OOP;
}());