'use strict';

var assert = chai.assert;

describe('Lang', function() {
    this.timeout(35000);

    it('should check if a param is an array', function() {
        assert.ok(global.Lang.isArray(['test']));
        assert.notOk(global.Lang.isArray('test'));
    });

    it('should check if a param is boolean', function() {
        var a = true;
        assert.ok(global.Lang.isBoolean(a));
        assert.notOk(global.Lang.isBoolean(0));
    });

    it('should check if a param is isFunction', function() {
        assert.ok(global.Lang.isFunction(function(){}));
        assert.notOk(global.Lang.isFunction(0));
    });

    it('should check if a param is null', function() {
        var a = null;
        assert.ok(global.Lang.isNull(a));
        assert.notOk(global.Lang.isNull(0));
    });

    it('should check if a param is number', function() {
        var a = 1;
        assert.ok(global.Lang.isNumber(a));
        assert.notOk(global.Lang.isNumber(''));
    });

    it('should check if a param is object', function() {
        var a = {};
        assert.ok(global.Lang.isObject(a));
        assert.ok(global.Lang.isObject(function(){}));
        assert.notOk(global.Lang.isObject(null));
    });

    it('should check if a param is string', function() {
        var a = '';
        assert.ok(global.Lang.isString(a));
        assert.notOk(global.Lang.isString(null));
    });

    it('should mix two objects', function() {
        var a = {};
        global.Lang.mix(a, {test: 1});

        assert.strictEqual(1, a.test);
    });

    it('should convert value to integer', function() {
        var a = global.Lang.toInt(1.2333);

        assert.strictEqual(1, a);
    });
});