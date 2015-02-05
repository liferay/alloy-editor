(function() {
    'use strict';

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

    global.OOP.extend(Base, global.Attribute, {
        /**
         * Calls the `initializer` method of each class which extends Base starting from the parent to the child
         * Will pass the configuration object to each initializer method.
         *
         * @param {Object} config Configuration object
         */
        init: function(config) {
            this._callChain('initializer', config);
        },

        /**
         * Calls the `destructor` method of each class which extends Base starting from the parent to the child
         * @return {[type]} [description]
         */
        destroy: function() {
            this._callChain('destructor');
        },

        /**
         * Calls a method of each class, which is being present in the hierarchy starting from parent to the child.
         *
         * @protected
         * @param {String} wat  The method, which should be invoked
         * @param {Object|Array} args The arguments with which the method should be invoked
         */
        _callChain: function(wat, args) {
            var arr = [];

            var ctor = this.constructor;

            while(ctor) {
                if (global.Lang.isFunction(ctor.prototype[wat])) {
                    arr.push({
                        context: ctor,
                        toCall: ctor.prototype[wat]
                    });
                }

                ctor = ctor.superclass ? ctor.superclass.constructor : null;
            }

            arr = arr.reverse();

            args = global.Lang.isArray(args) ? args : [args];

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];

                item.toCall.apply(item.context, args);
            }
        }
    });

    global.Base = Base;
}());
