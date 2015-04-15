(function() {
    'use strict';

    var assert = chai.assert;

    describe('OOP', function() {
        this.timeout(35000);

        it('should extend a class from another class', function() {
            var Parent = function() {};

            Parent.prototype.method1 = function() {
                return 1;
            };

            var Child = function(config) {
                Child.superclass.constructor.call(this, config);
            };

            Child = AlloyEditor.OOP.extend(Child, Parent);

            var child = new Child();

            assert.strictEqual(1, child.method1());
        });

        it('should extend a class from another class with proto overwrites and statics', function() {
            var Parent = function() {};

            Parent.prototype.method1 = function(a) {
                return ++a;
            };

            var Child = function(config) {
                Child.superclass.constructor.call(this, config);
            };

            Child = AlloyEditor.OOP.extend(Child, Parent, {
                method1: function() {
                    return 7;
                }
            }, {
                STATIC1: 'static1'
            });

            var child = new Child();

            assert.strictEqual(7, child.method1());
            assert.strictEqual('static1', Child.STATIC1);
        });
    });

    it('should throw exception when no parent or child', function() {
        assert.throws(function () {
            var Parent = function() {};

            AlloyEditor.OOP.extend(null, Parent);
        });
    });
}());