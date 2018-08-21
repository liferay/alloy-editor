(function() {
    'use strict';

    var assert = chai.assert;

    describe('Lang', function() {
        this.timeout(35000);

        it('should check if a param is an array', function() {
            assert.ok(AlloyEditor.Lang.isArray(['test']));
            assert.notOk(AlloyEditor.Lang.isArray('test'));
        });

        it('should check if a param is boolean', function() {
            var a = true;
            assert.ok(AlloyEditor.Lang.isBoolean(a));
            assert.notOk(AlloyEditor.Lang.isBoolean(0));
        });

        it('should check if a param is isFunction', function() {
            assert.ok(AlloyEditor.Lang.isFunction(function(){}));
            assert.notOk(AlloyEditor.Lang.isFunction(0));
        });

        it('should check if a param is null', function() {
            var a = null;
            assert.ok(AlloyEditor.Lang.isNull(a));
            assert.notOk(AlloyEditor.Lang.isNull(0));
        });

        it('should check if a param is number', function() {
            var a = 1;
            assert.ok(AlloyEditor.Lang.isNumber(a));
            assert.notOk(AlloyEditor.Lang.isNumber(''));
        });

        it('should check if a param is object', function() {
            var a = {};
            assert.ok(AlloyEditor.Lang.isObject(a));
            assert.ok(AlloyEditor.Lang.isObject(function(){}));
            assert.notOk(AlloyEditor.Lang.isObject(null));
        });

        it('should check if a param is string', function() {
            var a = '';
            assert.ok(AlloyEditor.Lang.isString(a));
            assert.notOk(AlloyEditor.Lang.isString(null));
        });

        it('should mix two objects', function() {
            var a = {};
            AlloyEditor.Lang.mix(a, {test: 1});

            assert.strictEqual(1, a.test);
        });

        it('should convert value to integer', function() {
            var a = AlloyEditor.Lang.toInt(1.2333);

            assert.strictEqual(1, a);
        });
    });
}());