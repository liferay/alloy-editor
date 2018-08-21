(function() {
    'use strict';

    /**
     * Quick and dirty impl of Base class.
     *
     * @class Base
     * @constructor
     */
    function Base(config) {
        Base.superclass.constructor.call(this, config);

        this.init(config);
    }

    AlloyEditor.OOP.extend(Base, AlloyEditor.Attribute, {
        /**
         * Calls the `initializer` method of each class which extends Base starting from the parent to the child.
         * Will pass the configuration object to each initializer method.
         *
         * @instance
         * @memberof Base
         * @method init
         * @param {Object} config Configuration object
         */
        init: function(config) {
            this._callChain('initializer', config);
        },

        /**
         * Calls the `destructor` method of each class which extends Base starting from the parent to the child.
         *
         * @instance
         * @memberof Base
         * @method destroy
         */
        destroy: function() {
            this._callChain('destructor');
        },

        /**
         * Calls a method of each class, which is being present in the hierarchy starting from parent to the child.
         *
         * @instance
         * @memberof Base
         * @method _callChain
         * @param {Object|Array} args The arguments with which the method should be invoked
         * @param {String} wat  The method, which should be invoked
         * @protected
         */
        _callChain: function(wat, args) {
            var arr = [];

            var ctor = this.constructor;

            while (ctor) {
                if (AlloyEditor.Lang.isFunction(ctor.prototype[wat])) {
                    arr.push(ctor.prototype[wat]);
                }

                ctor = ctor.superclass ? ctor.superclass.constructor : null;
            }

            arr = arr.reverse();

            args = AlloyEditor.Lang.isArray(args) ? args : [args];

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];

                item.apply(this, args);
            }
        }
    });

    AlloyEditor.Base = Base;
}());
