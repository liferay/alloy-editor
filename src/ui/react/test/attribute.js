(function() {
    'use strict';

    var assert = chai.assert;

    describe('Attribute', function() {
        this.timeout(35000);

        it('should retrieve a default value from an attribute', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz();
            assert.strictEqual('val1', inst.get('attr1'));
        });

        it('should change the value of an attribute via constructor', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'new val'
            });
            assert.strictEqual('new val', inst.get('attr1'));
        });

        it('should change the value of an attribute via set', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz();

            inst.set('attr1', 'new val');

            assert.strictEqual('new val', inst.get('attr1'));
        });

        it('should invoke the getter of an attribute', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    getter: function(val) {
                        return val + '-test1';
                    },
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz();

            assert.strictEqual('val1-test1', inst.get('attr1'));
        });

        it('should invoke the setter of an attribute', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            var setter = sinon.spy();

            Clazz.ATTRS = {
                attr1: {
                    setter: setter
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val1'
            });

            var val = inst.get('attr1');

            assert.ok(setter.calledOnce);
        });

        it('should invoke the setter of an attribute when there is default value', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            var setter = sinon.spy();

            Clazz.ATTRS = {
                attr1: {
                    setter: setter,
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz();

            inst.get('attr1');
            assert.ok(setter.calledOnce);
        });

        it('should not change the value of a read only attribute', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    readOnly: true,
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            assert.strictEqual('val1', inst.get('attr1'));
        });

        it('should not change the value of a read only attribute when there is no default value', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    readOnly: true
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            assert.isUndefined(inst.get('attr1'));
        });

        it('should not change the value of a read only attribute when writeOnce is set', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    readOnly: true,
                    writeOnce: true
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            assert.isUndefined(inst.get('attr1'));
        });

        it('should set the value only once if it is set with writeOnce', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    writeOnce: true,
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            inst.set('attr1', 'val3');

            assert.strictEqual('val1', inst.get('attr1'));
        });

        it('should set the value only once if it is set with writeOnce via config', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    writeOnce: true
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            inst.set('attr1', 'val3');

            assert.strictEqual('val2', inst.get('attr1'));
        });

        it('should set the value only once if it is set with writeOnce via set', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    writeOnce: true
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz();

            inst.set('attr1', 'val3');
            assert.strictEqual('val3', inst.get('attr1'));

            inst.set('attr1', 'val4');
            assert.strictEqual('val3', inst.get('attr1'));
        });

        it('should not set value if validator returns false', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    validator: function(val) {
                        return false;
                    },
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            assert.strictEqual('val1', inst.get('attr1'));
        });

        it('should set value if validator returns true', function() {
            var Clazz = function(config) {
                Clazz.superclass.constructor.call(this, config);
            };

            Clazz.ATTRS = {
                attr1: {
                    validator: function(val) {
                        return true;
                    },
                    value: 'val1'
                }
            };

            Clazz = AlloyEditor.OOP.extend(Clazz, AlloyEditor.Attribute);

            var inst = new Clazz({
                attr1: 'val2'
            });

            assert.strictEqual('val2', inst.get('attr1'));
        });

        it('should not share values from two objects', function() {
            var Clazz1 = function(config) {
                Clazz1.superclass.constructor.call(this, config);
            };

            Clazz1.ATTRS = {
                attr1: {
                    value: 'val1'
                }
            };

            var Clazz2 = function(config) {
                Clazz2.superclass.constructor.call(this, config);
            };

            Clazz2.ATTRS = {
                attr1: {
                    value: 'val2'
                }
            };

            Clazz1 = AlloyEditor.OOP.extend(Clazz1, AlloyEditor.Attribute);
            Clazz2 = AlloyEditor.OOP.extend(Clazz2, AlloyEditor.Attribute);

            var inst1 = new Clazz1({
                attr1: 'val1.1'
            });

            var inst2 = new Clazz1({
                attr1: 'val2.2'
            });

            assert.strictEqual('val1.1', inst1.get('attr1'));
            assert.strictEqual('val2.2', inst2.get('attr1'));
        });
    });
}());